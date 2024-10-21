'use client'
import { useContext, useEffect, useState } from 'react'

import { Button, FormControlLabel, FormHelperText, Radio, RadioGroup, Skeleton, Stack, Typography } from '@mui/material'

import SelectControlField from '@/components/forms/select-elements/SelectControlField'
import axiosInstance from '@/libs/axiosConfig'
import { UsersContext } from '../../../context'

import type { CountryType } from '@/types/system-admin/countries'
import TextFieldControl from '@/components/forms/text-field/TextFieldControl'
import type { UserType } from '@/types/users/users-page-types'
import type { validationType } from '@/types/validationType'
import { api } from '@/Constants/Api'
import ScreenCenterDialog from '@/components/dialogs/screen-center-dialog'

export enum UserIdentifierEnum {
  NationalIdentity,
  Passport,
  Iqama,
  BorderNumber
}

export enum UserTypeEnum {
  None,
  Admin,
  Employee,
  Client,
  Freelance
}
export const userIdentifiersWays = [
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
  const [body, setBody] = useState<BodyType>({})
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState('')
  const { userLookups, validationsRules } = useContext(UsersContext)
  const [userEnumType, setUserEnumType] = useState<UserTypeEnum>(UserTypeEnum.None)
  const [identifierLabel, setIdentifierLabel] = useState('رقم الهوية الوطنية')
  const [userCountry, setUserCountry] = useState<CountryType | undefined>(undefined)
  const [companyCountryId, setCompanyCountryId] = useState<number>(191)
  const [disabledFields, setDisabledFields] = useState<string[]>(_disabledFields)
  const [invalidFields, setInvalidFields] = useState<string[]>(_invalidFields)
  const [nameErrorMessage, setNameErrorMessage] = useState('')
  const emailsRules: validationType | undefined = validationsRules?.find(ele => ele.type == 'email')
  const [identifierType, setIdentifierType] = useState<UserIdentifierEnum>(UserIdentifierEnum.NationalIdentity)
  const [openFeedBackDialog, setOpenFeedBackDialog] = useState(false)
  const [feedBackMessageTitle, setFeedBackMessageTitle] = useState<React.ReactNode>(<></>)
  const [feedBackMessageContent, setFeedBackMessageContent] = useState<React.ReactNode>(<></>)

  // ** handle side effects
  useEffect(() => {
    OpenDialog()
  }, [props.open])

  // ** handle declare and define component helper methods
  const OpenDialog = () => {
    setBody({ phone_code: '191' })
    setUserName('')
    setIdentifierType(UserIdentifierEnum.NationalIdentity)
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
      phone_code: body['phone_code'] ?? null,
      passport: UserIdentifierEnum.Passport == identifierType ? (body['identifier'] ?? null) : null,
      identity: UserIdentifierEnum.NationalIdentity == identifierType ? (body['identifier'] ?? null) : null,
      iqama: UserIdentifierEnum.Iqama == identifierType ? (body['identifier'] ?? null) : null,
      border_number: UserIdentifierEnum.BorderNumber == identifierType ? (body['identifier'] ?? null) : null
    }

    //send request
    axiosInstance
      .post<{ user: UserType }>(api`register`, formBody)
      .then(response => {
        props.OnSuccessDialogAction()
        setFeedBackMessageTitle(
          <Typography variant='body2' fontWeight={800} fontSize={22} my={4} textAlign={'center'}>
            تم تأكيد اضافة مستخدم بالرقم
          </Typography>
        )
        setFeedBackMessageContent(
          <Stack width={'300px'} height={'50px'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='body2' textAlign={'center'} fontSize={20} fontWeight={800}>
              {response?.data?.user?.id}
            </Typography>
          </Stack>
        )
      })
      .then(() => {
        setOpenFeedBackDialog(true)
      })
      .catch(err => {
        setFeedBackMessageTitle(
          <Stack
            width={'100%'}
            justifyContent={'start'}
            alignItems={'center'}
            direction={'row'}
            mx={4}
            px={2}
            spacing={2}
          >
            <i className='ri-error-warning-fill text-error' style={{ fontSize: '40px' }}></i>
            <Typography variant='body2' fontSize={30} fontWeight={800} color={'error'}>
              خطا !
            </Typography>
          </Stack>
        )
        setFeedBackMessageContent(
          <Stack width={'300px'} height={'50px'} justifyContent={'center'} alignItems={'center'}>
            <Typography variant='body2' textAlign={'center'} fontSize={20} fontWeight={600}>
              {err?.response?.data?.message}
            </Typography>
          </Stack>
        )
        setOpenFeedBackDialog(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  // ** return component ui
  return (
    <>
      <Stack spacing={3} width={'100%'}>
        {/* user type */}
        <SelectControlField
          isRequired={true}
          label='نوع المستخدم'
          options={userLookups?.user_types?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
          handleSelectFieldChange={newValue => {
            switch (newValue.toString()) {
              case '1': //system-admin
                setUserEnumType(UserTypeEnum.Admin)
                setDisabledFields(prev => prev.filter(ele => ele != 'name'))
                delete body['tenant_id']
                break
              case '2': //company-user
                setUserName('')
                setDisabledFields(_disabledFields)
                setInvalidFields(_invalidFields)
                setUserEnumType(UserTypeEnum.Employee)
                setUserEnumType(UserTypeEnum.Employee)
                break
              case '12': //client
                setDisabledFields(prev => prev.filter(ele => ele != 'name'))
                delete body['tenant_id']
                setUserEnumType(UserTypeEnum.Client)

                if (identifierType == UserIdentifierEnum.BorderNumber || identifierType == UserIdentifierEnum.Iqama) {
                  setIdentifierLabel('رقم الهوية الوطنية')
                  setIdentifierType(UserIdentifierEnum.NationalIdentity)
                  handleChange('identifier', '')
                }

                break
              case '13': //freelance
                setDisabledFields(prev => prev.filter(ele => ele != 'name'))
                delete body['tenant_id']
                setUserEnumType(UserTypeEnum.Freelance)

                if (identifierType == UserIdentifierEnum.BorderNumber || identifierType == UserIdentifierEnum.Iqama) {
                  setIdentifierLabel('رقم الهوية الوطنية')
                  setIdentifierType(UserIdentifierEnum.NationalIdentity)
                  handleChange('identifier', '')
                }

                break
            }

            handleChange('user_type_id', newValue)
          }}
          validationFun={newValue => newValue.length > 0}
          errorMsg='نوع المستخدم مطلوب'
          disabled={loading}
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
              disabled={loading}
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
              const val = newValue
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
            disabled={loading}
          />
        )}

        {/* nationality */}
        {canShowInputField('country_id') && (
          <SelectControlField
            label='الجنسية'
            options={userLookups?.countries?.map(ele => ({ label: ele.name_ar, value: ele.id + '' })) || []}
            handleSelectFieldChange={newValue => {
              setUserCountry(userLookups?.countries?.find(ele => ele.id == +newValue))
              handleChange('country_id', newValue)
              setDisabledFields(prev => prev.filter(ele => ele != 'identifier'))

              if (userEnumType == UserTypeEnum.Admin || userEnumType == UserTypeEnum.Employee) {
                if (newValue == companyCountryId + '') setIdentifierType(UserIdentifierEnum.NationalIdentity)
                else setIdentifierType(UserIdentifierEnum.Passport)
              } else {
                setIdentifierLabel('رقم الهوية الوطنية')
                setIdentifierType(UserIdentifierEnum.NationalIdentity)
              }
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
            disabled={loading}
          />
        )}

        {/* identity type && identity data  */}
        {canShowInputField('identifier') && (
          <>
            {/* identity type */}
            <RadioGroup row defaultValue='checked' name='basic-radio' aria-label='basic-radio'>
              {(userEnumType == UserTypeEnum.Client || userEnumType == UserTypeEnum.Freelance
                ? userIdentifiersWays.slice(0, 2)
                : userIdentifiersWays
              )?.map(identifier => (
                <FormControlLabel
                  key={identifier.id}
                  value={identifier.value}
                  disabled={
                    userEnumType == UserTypeEnum.Client || userEnumType == UserTypeEnum.Freelance
                      ? false
                      : identifier.value == UserIdentifierEnum.NationalIdentity
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
              disabled={loading}
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
              if (emailsRules == undefined) {
                // there is no email validation rules so use default email validation
                const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

                if (newValue.length > 0 && emailRegex.test(newValue)) {
                  removeFromInvalidFields('email')

                  return true
                }

                addFromInvalidFields('email')

                return false
              } else {
                console.log('emailsRules exist :', emailsRules, newValue)

                if (emailsRules.start_with) {
                  const arr = emailsRules.start_with?.split(',') ?? []

                  for (let idx = 0; idx < arr.length; idx++) {
                    if (!newValue.startsWith(arr[idx])) {
                      addFromInvalidFields('email')

                      return false
                    }
                  }
                }

                if (emailsRules.end_with) {
                  const arr = emailsRules.end_with?.split(',') ?? []

                  for (let idx = 0; idx < arr.length; idx++) {
                    if (!newValue.endsWith(arr[idx])) {
                      addFromInvalidFields('email')

                      return false
                    }
                  }
                }

                if (emailsRules.contains) {
                  const arr = emailsRules.contains?.split(',') ?? []

                  for (let idx = 0; idx < arr.length; idx++) {
                    if (!newValue.includes(arr[idx])) {
                      addFromInvalidFields('email')

                      return false
                    }
                  }
                }

                removeFromInvalidFields('email')

                return true
              }
            }}
            errorMsg={'البريد الالكتروني غير صالح'}
          />
        )}
        {/* phone */}
        {canShowInputField('phone') && (
          <div className='flex items-start justify-between'>
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
              disabled={loading}
            />
            <SelectControlField
              label=''
              defaultValue='20'
              isfullWidth={false}
              options={
                userLookups?.countries?.map(ele => ({
                  label: (
                    <div className='flex items-center justify-between w-20'>
                      <img src={ele.flag_url ?? ''} width={'20px'} height={'20'} alt={ele.name_ar} />
                      <p className='text-sm'>{` ${ele.phonecode} + `}</p>
                    </div>
                  ),
                  value: ele.phonecode + ''
                })) || []
              }
              handleSelectFieldChange={newValue => {
                handleChange('phone_code', newValue)
              }}
              disabled={loading}
            />
          </div>
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
          تحقق من البيانات و حفظ
        </Button>
      </Stack>
      <ScreenCenterDialog
        open={openFeedBackDialog}
        setOpen={setOpenFeedBackDialog}
        title={feedBackMessageTitle}
        dialogContent={feedBackMessageContent}
      />
    </>
  )
}

type PropsType = {
  open: boolean
  OnSuccessDialogAction: () => void
}
