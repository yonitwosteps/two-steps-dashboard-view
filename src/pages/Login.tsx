import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, LogIn, UserPlus, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { SecureHttpClient } from '@/utils/httpClient';
import { WEBHOOK_CONFIG } from '@/config/webhooks';
import { LoginSchema, SignupSchema, ForgotPasswordSchema, authRateLimiter } from '@/utils/authValidation';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { login, signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordLoading, setIsForgotPasswordLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [signupErrors, setSignupErrors] = useState<Record<string, string>>({});
  const [forgotPasswordError, setForgotPasswordError] = useState('');
  const { toast } = useToast();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Login form state
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // Updated signup form state to match Supabase fields
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email_address: '',
    password: '',
    phone_number: ''
  });

  // Forgot password state
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLoading(true);
    setLoginError('');

    try {
      // Validate input
      const validatedData = LoginSchema.parse(loginData);
      
      // Check rate limiting
      if (authRateLimiter.isRateLimited(validatedData.email)) {
        const remainingTime = Math.ceil(authRateLimiter.getRemainingTime(validatedData.email) / 60000);
        setLoginError(`Too many failed attempts. Please try again in ${remainingTime} minutes.`);
        setIsLoading(false);
        return;
      }

      const result = await login(validatedData.email, validatedData.password);
      
      if (result.success) {
        toast({
          title: "Login Successful",
          description: "Welcome back! Redirecting to dashboard...",
        });
        navigate('/', { replace: true });
      } else {
        setLoginError(result.error || 'Login failed');
      }
      
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const firstError = error.errors[0];
        setLoginError(firstError.message);
      } else {
        setLoginError('An error occurred during login');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSignupErrors({});

    try {
      // Validate input
      const validatedData = SignupSchema.parse(signupData);
      
      // Create the full name for the existing signup function
      const fullName = `${validatedData.firstName} ${validatedData.lastName}`.trim();
      
      const success = await signup(fullName, validatedData.email_address, validatedData.password, validatedData.phone_number);
      
      if (success) {
        toast({
          title: "Account Created",
          description: "Your account has been created successfully! Please login.",
        });
        
        setIsSignupOpen(false);
        setSignupData({ firstName: '', lastName: '', email_address: '', password: '', phone_number: '' });
      } else {
        toast({
          title: "Signup Failed",
          description: "Failed to create account. Please try again.",
          variant: "destructive",
        });
      }
      
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const errors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          errors[err.path[0]] = err.message;
        });
        setSignupErrors(errors);
      } else {
        toast({
          title: "Signup Failed",
          description: error instanceof Error ? error.message : "An error occurred during signup",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsForgotPasswordLoading(true);
    setForgotPasswordError('');

    try {
      // Validate input
      const validatedData = ForgotPasswordSchema.parse({ email: forgotPasswordEmail });
      
      await SecureHttpClient.post(WEBHOOK_CONFIG.FORGOT_PASSWORD_WEBHOOK, validatedData);
      
      toast({
        title: "Password retrieval Email Sent",
        description: `We've sent password retrieval instructions to ${validatedData.email}. Please check your email (including spam folder) and follow the link to retrieve your password.`,
      });
      
      // Clear form and close dialog on success
      setForgotPasswordEmail('');
      setForgotPasswordError('');
      setIsForgotPasswordOpen(false);
      
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const firstError = error.errors[0];
        setForgotPasswordError(firstError.message);
      } else {
        const errorMessage = error instanceof Error ? error.message : "Network error occurred";
        setForgotPasswordError(`Failed to send retrieval email: ${errorMessage}. Please try again or contact support if the problem persists.`);
      }
    } finally {
      setIsForgotPasswordLoading(false);
    }
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsForgotPasswordOpen(true);
  };

  // Handle dialog close to reset form state
  const handleForgotPasswordDialogChange = (open: boolean) => {
    setIsForgotPasswordOpen(open);
    if (!open) {
      // Reset form when dialog closes
      setForgotPasswordEmail('');
      setForgotPasswordError('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 right-4 lg:right-10 w-48 h-48 lg:w-96 lg:h-96 bg-gradient-to-br from-blue-500/8 via-purple-500/4 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 left-4 lg:left-10 w-40 h-40 lg:w-80 lg:h-80 bg-gradient-to-tr from-purple-500/6 via-blue-500/3 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 lg:w-64 lg:h-64 bg-gradient-to-r from-blue-500/8 to-purple-500/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold font-dm-sans bg-gradient-to-r from-white via-blue-100 to-blue-200 bg-clip-text text-transparent">
            Two Steps
          </h1>
          <p className="text-gray-400 font-inter">Sign in to your account</p>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-900/60 backdrop-blur-xl border border-gray-700/50 shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-white font-dm-sans">Welcome back</CardTitle>
            <CardDescription className="text-gray-400">
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData(prev => ({ ...prev, email: e.target.value }))}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="text-red-400 text-sm mt-1" role="alert">{loginError}</p>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleForgotPasswordClick}
                  className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  aria-label="Open forgot password dialog"
                >
                  Forgot Password?
                </button>
              </div>
            </CardContent>
            
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-medium font-dm-sans transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/25 border-0 rounded-xl py-3"
                aria-label="Sign in to your account"
              >
                <LogIn className="w-4 h-4 mr-2" />
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </CardFooter>
          </form>
        </Card>

        {/* Forgot Password Dialog */}
        <Dialog open={isForgotPasswordOpen} onOpenChange={handleForgotPasswordDialogChange}>
          <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white">
            <DialogHeader>
              <DialogTitle className="text-white font-dm-sans">Forgot Password?</DialogTitle>
              <DialogDescription className="text-gray-400">
                Enter your email address and we'll send you a link to retrieve your password.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="forgot-email" className="text-gray-300">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="name@example.com"
                  value={forgotPasswordEmail}
                  onChange={(e) => {
                    setForgotPasswordEmail(e.target.value);
                    if (forgotPasswordError) {
                      setForgotPasswordError('');
                    }
                  }}
                  className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                  required
                  aria-describedby={forgotPasswordError ? "forgot-password-error" : undefined}
                />
                {forgotPasswordError && (
                  <p id="forgot-password-error" className="text-red-400 text-sm mt-1" role="alert">
                    {forgotPasswordError}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                disabled={isForgotPasswordLoading || !forgotPasswordEmail.trim()}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send password reset email"
              >
                <Lock className="w-4 h-4 mr-2" />
                {isForgotPasswordLoading ? 'Sending Retrieval Email...' : 'Send Retrieval Email'}
              </Button>
            </form>
          </DialogContent>
        </Dialog>

        {/* Signup Section */}
        <div className="text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Dialog open={isSignupOpen} onOpenChange={setIsSignupOpen}>
              <DialogTrigger asChild>
                <button className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign up
                </button>
              </DialogTrigger>
              <DialogContent className="bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 text-white max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-white font-dm-sans">Create Account</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Join Two Steps to start managing your leads effectively.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstName" className="text-gray-300">First Name</Label>
                      <Input
                        id="signup-firstName"
                        type="text"
                        placeholder="First name"
                        value={signupData.firstName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, firstName: e.target.value }))}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                      />
                      {signupErrors.firstName && (
                        <p className="text-red-400 text-sm" role="alert">{signupErrors.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastName" className="text-gray-300">Last Name</Label>
                      <Input
                        id="signup-lastName"
                        type="text"
                        placeholder="Last name"
                        value={signupData.lastName}
                        onChange={(e) => setSignupData(prev => ({ ...prev, lastName: e.target.value }))}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                        required
                      />
                      {signupErrors.lastName && (
                        <p className="text-red-400 text-sm" role="alert">{signupErrors.lastName}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-gray-300">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="name@example.com"
                      value={signupData.email_address}
                      onChange={(e) => setSignupData(prev => ({ ...prev, email_address: e.target.value }))}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                      required
                    />
                    {signupErrors.email_address && (
                      <p className="text-red-400 text-sm" role="alert">{signupErrors.email_address}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      type="tel"
                      placeholder="Your phone number"
                      value={signupData.phone_number}
                      onChange={(e) => setSignupData(prev => ({ ...prev, phone_number: e.target.value }))}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20"
                    />
                    {signupErrors.phone_number && (
                      <p className="text-red-400 text-sm" role="alert">{signupErrors.phone_number}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-gray-300">Password</Label>
                    <div className="relative">
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={signupData.password}
                        onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-blue-500 focus:ring-blue-500/20 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        aria-label={showSignupPassword ? "Hide password" : "Show password"}
                      >
                        {showSignupPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    {signupErrors.password && (
                      <p className="text-red-400 text-sm" role="alert">{signupErrors.password}</p>
                    )}
                    <p className="text-xs text-gray-500">
                      Password must be at least 8 characters with uppercase, lowercase, number, and special character.
                    </p>
                  </div>
                  
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium font-dm-sans transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/25 border-0 rounded-xl py-3"
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
