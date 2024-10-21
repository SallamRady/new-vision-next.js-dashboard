import type { Bank } from '../../common/Bank'
import type { Country } from '../../common/Country'
import type { Currency } from '../../common/Currency'
import type { Tenant } from '../../common/Tenant'

export interface GetMainLookupsRoot {
  msg: string
  tenants: Tenant[]
  countries: Country[]
  banks: Bank[]
  currencies: Currency[]
}
