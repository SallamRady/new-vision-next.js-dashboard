import { boolean } from 'zod'
import { CountryType } from '../system-admin/countries'
import { PackageType } from './package'
import { Media } from '../api/common/Media'
import { Tenant } from '../api/common/Tenant'

export type CompanyTableRowType = {
  id: number
  title: string
  email: string
  phone: string
  package: string
  endDate: string
  companyType: string
  activationStatus: boolean
  avatar?: string
  actions?: string
}

export type CompaniesLookUpsType = {
  tenant_types: TenantType[]
  countries: CountryType[]
  packages: PackageType[]
}

export type TenantType = Tenant

export type RegistrationType = {
  id: number
  name: string
  type: string
  pivot: {
    tenant_type_id: number
    registration_type_id: number
  }
  tenant_form: TenantFormType[]
}

export type TenantFormType = {
  id: number
  name: string
  iterateable: number
  created_at: string
  updated_at: string
  name_en: string
  pivot: {
    registration_type_id: number
    tenant_form_id: number
    form: DynamicFormField[]
  }
}

export type DynamicFormField = {
  key: string
  type: string
  label: string
}

export type TenantTypeFieldType = {
  id: number
  name: string
  facilities: string
  created_at: string
  updated_at: string
  pivot: {
    tenant_type_id: number
    tenant_field_id: number
  }
}
