'use client'
import SelectControlField from '@/components/forms/select-elements/SelectControlField'
import {
  Button,
  FormControlLabel,
  FormHelperText,
  InputAdornment,
  Radio,
  RadioGroup,
  Skeleton,
  Stack
} from '@mui/material'
import axiosInstance from '@/libs/axiosConfig'
import { UsersContext } from '../../../context'
import { useContext, useEffect, useState } from 'react'
import { CountryType } from '@/types/system-admin/countries'
import TextFieldControl from '@/components/forms/text-field/TextFieldControl'
import { Api } from '@/Constants/Api'
import { errorMessage, SuccessMessage } from '@/utils/notificationsMessages'
import { UserType } from '@/types/users/users-page-types'

enum UserIdentifierEnum {
  NationalIdentity,
  Passport,
  Iqama,
  BorderNumber
}

enum UserTypeEnum {
  None,
  Admin,
  Employee
}
const userIdentifiersWays = [
  {
    id: 'ui-1',
    label: 'هوية وطنية',
    identifierLabel: 'رقم الهوية الوطنية',
    value: UserIdentifierEnum.NationalIdentity
  },
  { id: 'ui-2', label: 'جواز سفر', identifierLabel: 'رقم جواز سفر', value: UserIdentifierEnum.Passport },
  { id: 'ui-3', label: 'اقامة', identifierLabel: 'رقم الاقامة', value: UserIdentifierEnum.Iqama },
  { id: 'ui-4', label: 'رقم حدود', identifierLabel: 'رقم حدود', value: UserIdentifierEnum.BorderNumber }
]

type BodyType = { [key: string]: string }

const _invalidFields: string[] = ['name', 'country_id', 'identifier', 'email', 'phone']
const _disabledFields: string[] = ['name', 'country_id', 'identifier', 'email', 'phone']

export default function AddUserDialogContent(props: PropsType) {
  // ** handle declare and define component state and variables
  const { userLookups } = useContext(UsersContext)
  const [body, setBody] = useState<BodyType>({})
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEnumType, setUserEnumType] = useState<UserTypeEnum>(UserTypeEnum.None)
  const [identifierLabel, setIdentifierLabel] = useState('رقم الهوية الوطنية')
  const [userCountry, setUserCountry] = useState<CountryType | undefined>(undefined)
  const [companyCountryId, setCompanyCountryId] = useState<number>(191)
  const [identifierType, setIdentifierType] = useState<UserIdentifierEnum>(UserIdentifierEnum.NationalIdentity)
  const [disabledFields, setDisabledFields] = useState<string[]>(_disabledFields)
  const [invalidFields, setInvalidFields] = useState<string[]>(_invalidFields)
  const [nameErrorMessage, setNameErrorMessage] = useState('')

  // ** handle side effects
  useEffect(() => {
    OpenDialog()
  }, [props.open])

  console.log(body)

  // ** handle declare and define component helper methods
  const OpenDialog = () => {
    setBody({})
    setUserEnumType(UserTypeEnum.None)
    setUserCountry(undefined)
    setCompanyCountryId(191)
    setDisabledFields(_disabledFields)
    setInvalidFields(_invalidFields)
  }

  const handleChange = (key: string, value: string) => {
    setBody(prev => ({ ...prev, [key]: value }))
  }

  const canShowInputField = (key: string) => disabledFields.indexOf(key) == -1

  const removeFromInvalidFields = (key: string) => {
    setInvalidFields(prev => prev.filter(field => field != key))
  }

  const addFromInvalidFields = (key: string) => {
    setInvalidFields(prev => prev.filter(field => field != key))
    if (invalidFields.indexOf(key) == -1) {
      setInvalidFields(prev => [...prev, key])
    }
  }

  const handleSaveUser = () => {
    // prepare variables
    setLoading(true)
    const formBody = {
        name: body['name'] ?? null,
        email: body['email'] ?? null,
        user_type_id: body['user_type_id'] ?? null,
        phone: body['phone'] ?? null,
        tenant_id: body['tenant_id'] ?? null,
        country_id: userCountry?.id ?? null,
        passport: UserIdentifierEnum.Passport == identifierType ? (body['identifier'] ?? null) : null,
        identity: UserIdentifierEnum.NationalIdentity == identifierType ? (body['identifier'] ?? null) : null,
        iqama: UserIdentifierEnum.Iqama == identifierType ? (body['identifier'] ?? null) : null,
        border_number: UserIdentifierEnum.BorderNumber == identifierType ? (body['identifier'] ?? null) : null
      },
      url = 'register'
    //send request
    axiosInstance
      .post<{ user: UserType }>(Api(url), formBody)
      .then(response => {
        SuccessMessage('تم أنشاء المستخدم بنجاح')
        props.OnSuccessDialogAction()
      })
      .catch(err => {
        errorMessage(err.response.data.message ?? 'تعذر الحذف')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // ** return component ui
  return (
    <Stack spacing={3} width={'100%'}>
      {/* user type */}
      <SelectControlField
        isRequired={true}
        label='نوع المستخدم'
        options={userLookups?.user_types?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
        handleSelectFieldChange={newValue => {
          if (newValue == '1') {
            //admin
            setUserEnumType(UserTypeEnum.Admin)
            setDisabledFields(prev => prev.filter(ele => ele != 'name'))
            delete body['tenant_id']
          } else {
            //employee
            setDisabledFields(_disabledFields)
            setInvalidFields(_invalidFields)
            setUserEnumType(UserTypeEnum.Employee)
          }

          handleChange('user_type_id', newValue)
        }}
        validationFun={newValue => newValue.length > 0}
        errorMsg='نوع المستخدم مطلوب'
      />
      {/* company */}
      {UserTypeEnum.Employee == userEnumType && (
        <>
          <SelectControlField
            label='اسم الشركة'
            options={userLookups?.tenants?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
            handleSelectFieldChange={newValue => {
              handleChange('tenant_id', newValue)
              setDisabledFields(prev => prev.filter(ele => ele != 'name'))
              const _country_id = userLookups?.tenants?.find(ele => ele.id == +newValue)?.country_id
              setCompanyCountryId(_country_id ?? -1)
            }}
            validationFun={newValue => newValue.length > 0}
            errorMsg='اسم الشركة مطلوب'
          />
          {companyCountryId == -1 && <FormHelperText className='text-error'>دولة الشركة غير محددة</FormHelperText>}
        </>
      )}
      {/* branch */}
      {/* <SelectControlField
        label='الفرع'
        options={[]}
        handleSelectFieldChange={newValue => {
          handleChange('tenant_id', newValue)
        }}
        validationFun={newValue => newValue.length > 0}
        errorMsg='الفرع مطلوب'
      /> */}
      {/* user name */}
      {canShowInputField('name') && (
        <TextFieldControl
          isRequired={true}
          label='اسم المستخدم'
          type='text'
          value={userName}
          handleChange={newValue => {
            let val = newValue
              .replace(/[^a-zA-Z\u0600-\u06FF]]/g, '')
              .replace(/[0-9]/g, '')
              .replace(/[+.!@#$%^&*()\-_=/*?|}{[~?//|\\><`]/g, '')
            handleChange('name', val)
            setUserName(val)
            setDisabledFields(prev => prev.filter(ele => ele != 'country_id'))
          }}
          validationFun={newValue => {
            if (newValue.length > 0 && newValue.split(' ').filter(ele => ele.length).length >= 3) {
              removeFromInvalidFields('name')
              setNameErrorMessage('')
              return true
            } else if (newValue.length == 0) {
              addFromInvalidFields('name')
              setNameErrorMessage('أسم المستخدم مطلوب')
              return false
            } else {
              addFromInvalidFields('name')
              setNameErrorMessage('أسم المستخدم لابد ان يتكون من 3 كلمات')
              return false
            }
          }}
          errorMsg={nameErrorMessage}
        />
      )}

      {/* nationality */}
      {canShowInputField('country_id') && (
        <SelectControlField
          label='الجنسية'
          // defaultValue='191'
          options={userLookups?.countries?.map(ele => ({ label: ele.name_ar, value: ele.id + '' })) || []}
          handleSelectFieldChange={newValue => {
            setUserCountry(userLookups?.countries?.find(ele => ele.id == +newValue))
            handleChange('country_id', newValue)
            setDisabledFields(prev => prev.filter(ele => ele != 'identifier'))

            if (newValue == companyCountryId + '') setIdentifierType(UserIdentifierEnum.NationalIdentity)
            else setIdentifierType(UserIdentifierEnum.Passport)
          }}
          validationFun={newValue => {
            if (newValue.length > 0) {
              removeFromInvalidFields('country_id')
              return true
            }
            addFromInvalidFields('country_id')
            return false
          }}
          errorMsg='الجنسية مطلوبة'
        />
      )}

      {/* identity type && identity data  */}
      {canShowInputField('identifier') && (
        <>
          {/* identity type */}
          <RadioGroup row defaultValue='checked' name='basic-radio' aria-label='basic-radio'>
            {userIdentifiersWays?.map(identifier => (
              <FormControlLabel
                key={identifier.id}
                value={identifier.value}
                disabled={
                  identifier.value == UserIdentifierEnum.NationalIdentity
                    ? companyCountryId != userCountry?.id
                    : companyCountryId == userCountry?.id
                }
                control={
                  <Radio
                    checked={identifierType == identifier.value}
                    onChange={(e, checked) => {
                      if (checked) {
                        setIdentifierType(identifier.value)
                        setIdentifierLabel(identifier.identifierLabel)
                      }
                    }}
                  />
                }
                label={identifier.label}
              />
            ))}
          </RadioGroup>
          {/* identity data */}
          <TextFieldControl
            isRequired={true}
            label={identifierLabel}
            placeholder={`ادخل ${identifierLabel}`}
            type='text'
            handleChange={newValue => {
              handleChange('identifier', newValue)
              setDisabledFields(prev => prev.filter(ele => ele != 'email'))
            }}
            validationFun={newValue => {
              if (newValue.length > 0) {
                removeFromInvalidFields('identifier')
                return true
              }
              addFromInvalidFields('identifier')
              return false
            }}
            errorMsg={`${identifierLabel} مطلوب`}
          />
        </>
      )}
      {/* email */}
      {canShowInputField('email') && (
        <TextFieldControl
          isRequired={true}
          label={'البريد الالكتروني'}
          type='email'
          handleChange={newValue => {
            handleChange('email', newValue)
            setDisabledFields(prev => prev.filter(ele => ele != 'phone'))
          }}
          validationFun={newValue => {
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (newValue.length > 0 && emailRegex.test(newValue)) {
              removeFromInvalidFields('email')
              return true
            }
            addFromInvalidFields('email')
            return false
          }}
          errorMsg={'البريد الالكتروني غير صالح'}
        />
      )}
      {/* phone */}
      {canShowInputField('phone') && (
        <TextFieldControl
          isRequired={true}
          label={'رقم الجوال'}
          type='number'
          handleChange={newValue => {
            handleChange('phone', newValue)
          }}
          validationFun={newValue => {
            if (newValue.length > 0) {
              removeFromInvalidFields('phone')
              return true
            }
            addFromInvalidFields('phone')
            return false
          }}
          errorMsg={'رقم الجوال مطلوب'}
          inputProps={{
            endAdornment: <InputAdornment position='end'>{userCountry?.phonecode ?? '966'}+</InputAdornment>
          }}
        />
      )}
      {/* show skeletons for user experience */}
      <Stack spacing={1}>
        {disabledFields.map(field => (
          <Skeleton key={`field-${field}`} variant='text' sx={{ fontSize: '1.5rem' }} />
        ))}
      </Stack>

      <Button
        size='small'
        variant='contained'
        onClick={() => {
          handleSaveUser()
        }}
        disabled={disabledFields.length > 0 || invalidFields.length > 0}
      >
        حفظ
      </Button>
    </Stack>
  )
}

type PropsType = {
  open: Boolean
  OnSuccessDialogAction: () => void
}
