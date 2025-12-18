// For more information about this file see https://dove.feathersjs.com/guides/cli/service.class.html#custom-services
import axios from "axios"
import type { Application } from '../../declarations'


type ApiSalesTerritory = {
  salesTerritoryId: string
  isBlockedForRealignmentRun: boolean
  isDefault: boolean
  id: string
  salesTerritoryDisplayId: string
  salesTerritoryName: string
}


type ApiSapAccount = {
  id: string
  displayId: string
  formattedName: string
  ownerFormattedName?: string
  salesTerritories?: ApiSalesTerritory[]
}


// type SapAccountResponse = {
//   id: string
//   accountCode: string
//   accountName: string
//   owner: string
//   territory: string
// }

export class SapAccountsService {
  constructor(private app: Application) { }

  async find(): Promise<any[]> {
    const baseUrl = process.env.BASE_URL_SAP
    const accountsUrl = process.env.URL_ACCOUNT

    let allAccounts: ApiSapAccount[] = []
    const top = 999
    let skip = 0
    let hasMore = true

    try {
      while (hasMore) {
        const results = await axios.get<{ value: ApiSapAccount[] }>(
          `${baseUrl}/${accountsUrl}?$skip=${skip}&$top=${top}`,
          {
            auth: {
              username: process.env.USER || '',
              password: process.env.PASSWORD_SAP || ''
            }
          }
        )

        allAccounts = allAccounts.concat(results.data.value)

        if (results.data.value.length < top) {
          hasMore = false
        } else {
          skip += top
        }
      }

      // const accounts: SapAccountResponse[] = allAccounts.map((item) => ({
      //   id: item.id,
      //   accountCode: item.displayId,
      //   accountName: item.formattedName,
      //   owner: item.ownerFormattedName || 'Unknown',
      //   territory: item.salesTerritories && item.salesTerritories.length > 0
      //     ? item.salesTerritories[0].salesTerritoryName
      //     : 'Unknown'
      // }))

      console.log('Fetched accounts:', allAccounts.length)
      return allAccounts
    } catch (error: any) {
      console.error("Full error:", error.response?.data || error.message)
      throw new Error(`Failed to fetch accounts: ${error.message}`)
    }
  }
}


export const getOptions = (app: Application) => ({ app })
