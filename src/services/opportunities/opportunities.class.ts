// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import axios from 'axios';



export interface OpportunitiesServiceOptions {
  app: Application
}

interface CreateOpportunityData {
  name: string;
  accountIds: string[];
  // ownerId: string;
  salesCycleCode: string;
  salesPhaseCode: string;
  lifeCycleStatus: string;
  processingTypeCode: string;
}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class OpportunitiesService {
  constructor(app: Application) { }


 async find(params?: Params) {
  const baseUrl = process.env.BASE_URL_SAP;
  const opportunityUrl = process.env.URL_OPPORTUNITY;

  try {
    const response = await axios.get(
      `${baseUrl}/${opportunityUrl}`,
      {
        auth: {
          username: process.env.USER || '',
          password: process.env.PASSWORD_SAP || ''
        }
      }
    );

    console.log('📥 Opportunities from SAP:', response.data);
    return response.data;

  } catch (error: any) {
    console.error('❌ Error:', error.response?.data || error.message);
    throw error;
  }
}
  async create(data: CreateOpportunityData, params?: Params): Promise<any> {



    const baseUrl = process.env.BASE_URL_SAP
    const opportunityUrl = process.env.URL_OPPORTUNITY
    const { name,  accountIds, salesCycleCode, salesPhaseCode, lifeCycleStatus, processingTypeCode } = data;
    const results = [];

    for (const accountId of accountIds) {
      try {
        const response = await axios.post(
          `${baseUrl}/${opportunityUrl}`,
          {
            name: name,
            account: {
              id: accountId  
            },
            // owner: {
            //   id: ownerId
            // },
            salesCycle: salesCycleCode,
            salesPhase: salesPhaseCode,
            status: lifeCycleStatus,
            category: processingTypeCode,
            currencyCode: "USD"
          },
          {
            auth: {
              username: process.env.USER || '',
              password: process.env.PASSWORD_SAP || ''
            }
          }
        );

        results.push({
          accountId, 
          success: true,
          opportunity: response.data
        });

      } catch (error: any) {
        results.push({
          accountId,  
          success: false,  
          error: error.response?.data || error.message
        });
      }
    }

    return {
      total: accountIds.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
  }



}

export const getOptions = (app: Application) => {
  return { app }
}
