import { useState, useCallback, useMemo } from 'react';

export interface Deal {
  id: string;
  name: string;
  value: number;
  company: string;
  owner: string;
  stage: string;
  age: number;
  lastContact: string;
  nextTask: string;
  probability: number;
  avatar?: string;
  tags: string[];
  priority: 'low' | 'medium' | 'high';
}

export interface Stage {
  id: string;
  name: string;
  probability: number;
  color: string;
  deals: Deal[];
}

export interface Pipeline {
  id: string;
  name: string;
  stages: Stage[];
}

// Mock data - in a real app, this would come from an API
const initialPipelines: Pipeline[] = [
  {
    id: 'sales',
    name: 'Sales Pipeline',
    stages: [
      {
        id: 'prospecting',
        name: 'Prospecting',
        probability: 10,
        color: 'bg-slate-500',
        deals: [
          {
            id: '1',
            name: 'Enterprise Software Deal',
            value: 150000,
            company: 'TechCorp Inc',
            owner: 'Sarah Wilson',
            stage: 'prospecting',
            age: 5,
            lastContact: '2 days ago',
            nextTask: 'Follow-up call',
            probability: 10,
            tags: ['enterprise', 'software'],
            priority: 'high'
          },
          {
            id: '2',
            name: 'Small Business Package',
            value: 25000,
            company: 'Local Bakery',
            owner: 'Mike Johnson',
            stage: 'prospecting',
            age: 12,
            lastContact: '1 week ago',
            nextTask: 'Send proposal',
            probability: 15,
            tags: ['small-business'],
            priority: 'medium'
          }
        ]
      },
      {
        id: 'qualification',
        name: 'Qualification',
        probability: 25,
        color: 'bg-blue-500',
        deals: [
          {
            id: '3',
            name: 'Marketing Automation',
            value: 75000,
            company: 'Growth Agency',
            owner: 'Alex Chen',
            stage: 'qualification',
            age: 8,
            lastContact: '1 day ago',
            nextTask: 'Demo scheduled',
            probability: 30,
            tags: ['marketing', 'automation'],
            priority: 'high'
          }
        ]
      },
      {
        id: 'proposal',
        name: 'Proposal',
        probability: 50,
        color: 'bg-amber-500',
        deals: [
          {
            id: '4',
            name: 'Cloud Migration',
            value: 200000,
            company: 'Finance Corp',
            owner: 'Sarah Wilson',
            stage: 'proposal',
            age: 15,
            lastContact: '3 days ago',
            nextTask: 'Contract review',
            probability: 60,
            tags: ['cloud', 'migration'],
            priority: 'high'
          },
          {
            id: '5',
            name: 'Security Audit',
            value: 50000,
            company: 'Healthcare Plus',
            owner: 'Mike Johnson',
            stage: 'proposal',
            age: 20,
            lastContact: '5 days ago',
            nextTask: 'Pricing discussion',
            probability: 45,
            tags: ['security', 'audit'],
            priority: 'medium'
          }
        ]
      },
      {
        id: 'negotiation',
        name: 'Negotiation',
        probability: 75,
        color: 'bg-orange-500',
        deals: [
          {
            id: '6',
            name: 'E-commerce Platform',
            value: 120000,
            company: 'Retail Giants',
            owner: 'Alex Chen',
            stage: 'negotiation',
            age: 30,
            lastContact: '1 day ago',
            nextTask: 'Final terms',
            probability: 80,
            tags: ['e-commerce', 'platform'],
            priority: 'high'
          }
        ]
      },
      {
        id: 'closed-won',
        name: 'Closed Won',
        probability: 100,
        color: 'bg-emerald-500',
        deals: [
          {
            id: '7',
            name: 'Data Analytics Suite',
            value: 300000,
            company: 'Analytics Pro',
            owner: 'Sarah Wilson',
            stage: 'closed-won',
            age: 45,
            lastContact: 'Today',
            nextTask: 'Implementation kickoff',
            probability: 100,
            tags: ['analytics', 'data'],
            priority: 'high'
          }
        ]
      }
    ]
  }
];

export const useDealsStore = () => {
  const [pipelines, setPipelines] = useState<Pipeline[]>(initialPipelines);
  const [selectedPipelineId, setSelectedPipelineId] = useState<string>('sales');

  const currentPipeline = useMemo(() => 
    pipelines.find(p => p.id === selectedPipelineId),
    [pipelines, selectedPipelineId]
  );

  const moveDeal = useCallback((
    dealId: string,
    sourceStageId: string,
    destStageId: string,
    sourceIndex: number,
    destIndex: number
  ) => {
    setPipelines(prevPipelines => 
      prevPipelines.map(pipeline => {
        if (pipeline.id !== selectedPipelineId) return pipeline;

        const updatedStages = [...pipeline.stages];
        const sourceStage = updatedStages.find(stage => stage.id === sourceStageId);
        const destStage = updatedStages.find(stage => stage.id === destStageId);

        if (!sourceStage || !destStage) return pipeline;

        const [movedDeal] = sourceStage.deals.splice(sourceIndex, 1);
        movedDeal.stage = destStageId;
        movedDeal.probability = destStage.probability;
        destStage.deals.splice(destIndex, 0, movedDeal);

        return { ...pipeline, stages: updatedStages };
      })
    );
  }, [selectedPipelineId]);

  const updateDeal = useCallback((updatedDeal: Deal) => {
    setPipelines(prevPipelines =>
      prevPipelines.map(pipeline => ({
        ...pipeline,
        stages: pipeline.stages.map(stage => ({
          ...stage,
          deals: stage.deals.map(deal => 
            deal.id === updatedDeal.id ? updatedDeal : deal
          )
        }))
      }))
    );
  }, []);

  const addDeal = useCallback((stageId: string, newDeal: Omit<Deal, 'id'>) => {
    const deal: Deal = {
      ...newDeal,
      id: Date.now().toString(), // Simple ID generation - use proper UUID in production
    };

    setPipelines(prevPipelines =>
      prevPipelines.map(pipeline => {
        if (pipeline.id !== selectedPipelineId) return pipeline;
        
        return {
          ...pipeline,
          stages: pipeline.stages.map(stage =>
            stage.id === stageId
              ? { ...stage, deals: [...stage.deals, deal] }
              : stage
          )
        };
      })
    );
  }, [selectedPipelineId]);

  const deleteDeal = useCallback((dealId: string) => {
    setPipelines(prevPipelines =>
      prevPipelines.map(pipeline => ({
        ...pipeline,
        stages: pipeline.stages.map(stage => ({
          ...stage,
          deals: stage.deals.filter(deal => deal.id !== dealId)
        }))
      }))
    );
  }, []);

  const searchDeals = useCallback((searchTerm: string) => {
    if (!currentPipeline || !searchTerm.trim()) return currentPipeline;

    const filteredStages = currentPipeline.stages.map(stage => ({
      ...stage,
      deals: stage.deals.filter(deal =>
        deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deal.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }));

    return { ...currentPipeline, stages: filteredStages };
  }, [currentPipeline]);

  return {
    pipelines,
    currentPipeline,
    selectedPipelineId,
    setSelectedPipelineId,
    moveDeal,
    updateDeal,
    addDeal,
    deleteDeal,
    searchDeals
  };
};