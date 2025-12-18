// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import type { Id, NullableId, Params, ServiceInterface } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import axios from 'axios'




// This is a skeleton for a custom service class. Remove or add the methods you need here
export class SapCategoriesService{
  constructor(app: Application) {}

  async find(_params?: Params): Promise<any[]> {
    const baseUrl = process.env.BASE_URL_SAP
    const categoriesUrl = process.env.URL_CATEGORIES
    try{
      const results = await axios.get(`${baseUrl}/${categoriesUrl}`, 
        { auth: {
          username: process.env.USER || '',
          password: process.env.PASSWORD_SAP || ''
        }}
      )
      console.log(results.data)
      return results.data.value

    }catch(error: any){
      throw new Error(error)
    }
    
  }


}

export const getOptions = (app: Application) => {
  return { app }
}
