// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import axios from 'axios';



export interface OpportunitiesServiceOptions {
  app: Application
}
interface Accounts {
  id: string
  name: string
}

interface CreateOpportunityData {
  oppName: string;
  accounts: Accounts[];
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
    const { oppName, accounts, salesCycleCode, salesPhaseCode, lifeCycleStatus, processingTypeCode } = data;
    const results = [];

    for (const account of accounts) {
      const accountName = account.name.substring(0, account.name.lastIndexOf(' '))
      console.log("accountName", accountName)
      const fullOpportunityName = `${accountName}-${oppName}`
      try {
        const response = await axios.post(
          `${baseUrl}/${opportunityUrl}`,
          {
            name: fullOpportunityName,
            account: {
              id: account.id
            },
            
            salesCycle: salesCycleCode,
            salesPhase: salesPhaseCode,
            customStatus: lifeCycleStatus,
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
          account,
          success: true,
          opportunity: response.data
        });

      } catch (error: any) {
        results.push({
          accounts,
          success: false,
          error: error.response?.data || error.message
        });
      }
    }

    return {
      total: accounts.length,
      successful: results.filter(r => r.success).length,
      failed: results.filter(r => !r.success).length,
      results
    };
  }



}

export const getOptions = (app: Application) => {
  return { app }
}
