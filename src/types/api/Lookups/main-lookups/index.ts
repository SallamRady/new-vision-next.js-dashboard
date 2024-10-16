import { Bank } from '../../common/Bank'
import { Country } from '../../common/Country'
import { Tenant } from '../../common/Tenant'

export interface GetMainLookupsRoot {
  msg: string
  tenants: Tenant[]
  countries: Country[]
  banks: Bank[]
}
