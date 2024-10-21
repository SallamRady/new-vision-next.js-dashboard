import { useContext, useEffect, useState } from 'react'

import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { UsersContext } from '../../../context'

// types
import Loader from '@/components/Loader'
import type { SelectFieldOptionType } from '@/types/input-controls-types'
import { UserIdentifierEnum, userIdentifiersWays, UserTypeEnum } from './AddUserDialog'
import type { validationType } from '@/types/validationType'
import axiosInstance from '@/libs/axiosConfig'
import { api } from '@/Constants/Api'
import ScreenCenterDialog from '@/components/dialogs/screen-center-dialog'

type BodyType = { [key: string]: string }

export default function EditUserDialog(props: PropsType) {
  // ** handle declare and define component state and variables
  const [body, setBody] = useState<BodyType>({})
  const [loadingEditiedUserData, setLoadingEditiedUserData] = useState(true)
  const [userEnumType, setUserEnumType] = useState<UserTypeEnum>(UserTypeEnum.None)
  const [identifierLabel, setIdentifierLabel] = useState('رقم الهوية الوطنية')
  const { userLookups, validationsRules, editedUser } = useContext(UsersContext)
  const [identifierType, setIdentifierType] = useState<UserIdentifierEnum>(UserIdentifierEnum.NationalIdentity)
  const [invalidFields, setInvalidFields] = useState<string[]>([])
  const [fieldsErrorMessages, setFieldsErrorMessages] = useState<BodyType>({})
  const emailsRules: validationType | undefined = validationsRules?.find(ele => ele.type == 'email')
  const [loading, setLoading] = useState(false)
  const [openFeedBackDialog, setOpenFeedBackDialog] = useState(false)
  const [feedBackMessageTitle, setFeedBackMessageTitle] = useState<React.ReactNode>(<></>)
  const [notFirstChange, setnotFirstChange] = useState(false)

  // ** handle declare and define component helper methods
  useEffect(() => {
    setInvalidFields([])
    setnotFirstChange(false)
    setLoadingEditiedUserData(true)

    // determined user enum.
    switch (editedUser?.user_type_id.toString()) {
      case '1': //system-admin
        setUserEnumType(UserTypeEnum.Admin)
        break
      case '2': //company-user
        setUserEnumType(UserTypeEnum.Employee)
        break
      case '12': //client
        setUserEnumType(UserTypeEnum.Client)
        break
      case '13': //freelance
        setUserEnumType(UserTypeEnum.Freelance)
        break
    }

    // detect user identifier
    let _identifier = ''

    if (editedUser?.border_number) {
      _identifier = editedUser?.border_number
      setIdentifierType(UserIdentifierEnum.BorderNumber)
      setIdentifierLabel('رقم حدود')
    } else if (editedUser?.iqama) {
      _identifier = editedUser?.iqama
      setIdentifierType(UserIdentifierEnum.Iqama)
      setIdentifierLabel('رقم الاقامة')
    } else if (editedUser?.passport) {
      _identifier = editedUser?.passport
      setIdentifierType(UserIdentifierEnum.Passport)
      setIdentifierLabel('رقم جواز سفر')
    } else if (editedUser?.identity) {
      _identifier = editedUser?.identity
      setIdentifierType(UserIdentifierEnum.NationalIdentity)
      setIdentifierLabel('رقم الهوية الوطنية')
    }

    setBody({
      user_type_id: editedUser?.user_type_id + '',
      name: editedUser?.name ?? '',
      country_id: editedUser?.country_id + '',
      tenant_id: editedUser?.tenants?.[0]?.id + '',
      identifier: _identifier,
      email: editedUser?.email ?? '',
      phone: editedUser?.phone ?? '',
      phone_code: editedUser?.phone_code ?? ''
    })
    setLoadingEditiedUserData(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open])

  useEffect(() => {
    if (notFirstChange) {
      const userCountry = userLookups?.countries?.find(ele => ele.id.toString() == body['country_id'])
      const tenant = editedUser?.tenants?.find(ele => ele.id.toString() == body['tenant_id'])

      if (userEnumType == UserTypeEnum.Admin || userEnumType == UserTypeEnum.Employee) {
        if (userCountry?.id == tenant?.country_id) {
          // same country
          if (identifierType != UserIdentifierEnum.NationalIdentity) {
            setIdentifierLabel('رقم الهوية الوطنية')
            setIdentifierType(UserIdentifierEnum.NationalIdentity)
            handleChange('identifier', '')
            AddToInvalidField('identifier')
          }
        } else {
          // diffrent country
          if (identifierType == UserIdentifierEnum.NationalIdentity) {
            handleChange('identifier', '')
            AddToInvalidField('identifier')
            setIdentifierLabel('رقم جواز السفر')
            setIdentifierType(UserIdentifierEnum.Passport)
          }
        }
      } else if (userEnumType == UserTypeEnum.Client || userEnumType == UserTypeEnum.Freelance) {
        if (identifierType != UserIdentifierEnum.NationalIdentity && identifierType != UserIdentifierEnum.Passport) {
          setIdentifierLabel('رقم الهوية الوطنية')
          setIdentifierType(UserIdentifierEnum.NationalIdentity)
          handleChange('identifier', '')
          AddToInvalidField('identifier')
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [body['country_id'], body['tenant_id']])

  const handleChange = (key: string, value: string) => {
    setBody(prev => ({ ...prev, [key]: value }))
  }

  const setErrorField = (key: string, value: string) => {
    setFieldsErrorMessages(prev => ({ ...prev, [key]: value }))
  }

  const AddToInvalidField = (key: string) => {
    if (invalidFields.indexOf(key) == -1) setInvalidFields(prev => [...prev, key])
  }

  const RemoveFromInvalidField = (key: string) => {
    setInvalidFields(prev => prev.filter(ele => ele != key))
  }

  const handleEditAction = () => {
    const url = `user/${editedUser?.id}`

    //prepare form body
    if (UserTypeEnum.Employee || userEnumType == UserTypeEnum.Freelance) {
      delete body['tenant_id']
    }

    const formBody = {
      name: body['name'] ?? null,
      email: body['email'] ?? null,
      user_type_id: body['user_type_id'] ?? null,
      phone: body['phone'] ?? null,
      tenant_id: body['tenant_id'] ?? null,
      country_id: body['country_id'] ?? null,
      phone_code: body['phone_code'] ?? null,
      passport: UserIdentifierEnum.Passport == identifierType ? (body['identifier'] ?? null) : null,
      identity: UserIdentifierEnum.NationalIdentity == identifierType ? (body['identifier'] ?? null) : null,
      iqama: UserIdentifierEnum.Iqama == identifierType ? (body['identifier'] ?? null) : null,
      border_number: UserIdentifierEnum.BorderNumber == identifierType ? (body['identifier'] ?? null) : null
    }

    // end edit request
    axiosInstance
      .post(api`${url}`, formBody)
      .then(() => {
        props.OnSuccessDialogAction()
        setFeedBackMessageTitle(
          <Typography variant='body2' fontWeight={800} fontSize={22} my={4} textAlign={'center'}>
            تم تعديل بيانات ال user بنجاح
          </Typography>
        )
      })
      .then(() => {
        setOpenFeedBackDialog(true)
      })
      .catch(err => {
        setFeedBackMessageTitle(
          <>
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
            <Typography variant='body2' fontSize={19} fontWeight={600}>
              {err?.response?.data?.message ?? 'تعذر التعديل'}
            </Typography>
          </>
        )
        setOpenFeedBackDialog(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  if (editedUser == undefined || loadingEditiedUserData) return <Loader />

  // ** return component ui
  return (
    <>
      <Stack spacing={3} width={'100%'}>
        {/* user type */}
        <SelectFieldWithValue
          label='نوع المستخدم'
          value={body['user_type_id']}
          handleChange={val => {
            switch (val.toString()) {
              case '1': //system-admin
                setUserEnumType(UserTypeEnum.Admin)
                break
              case '2': //company-user
                setUserEnumType(UserTypeEnum.Employee)
                break
              case '12': //client
                setUserEnumType(UserTypeEnum.Client)

                if (identifierType == UserIdentifierEnum.BorderNumber || identifierType == UserIdentifierEnum.Iqama) {
                  setIdentifierLabel('رقم الهوية الوطنية')
                  setIdentifierType(UserIdentifierEnum.NationalIdentity)
                  handleChange('identifier', '')
                  AddToInvalidField('identifier')
                }

                break
              case '13': //freelance
                setUserEnumType(UserTypeEnum.Freelance)

                if (identifierType == UserIdentifierEnum.BorderNumber || identifierType == UserIdentifierEnum.Iqama) {
                  setIdentifierLabel('رقم الهوية الوطنية')
                  setIdentifierType(UserIdentifierEnum.NationalIdentity)
                  handleChange('identifier', '')
                  AddToInvalidField('identifier')
                }

                break
            }

            handleChange('user_type_id', val)
          }}
          options={userLookups?.user_types?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
          disabled={loading}
        />
        {/* user tenants */}
        {(userEnumType == UserTypeEnum.Admin || userEnumType == UserTypeEnum.Employee) && (
          <SelectFieldWithValue
            label='الشركة'
            value={body['tenant_id']}
            handleChange={val => {
              setnotFirstChange(true)
              handleChange('tenant_id', val)
            }}
            disabled={loading || userEnumType == UserTypeEnum.Admin}
            options={editedUser?.tenants?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
          />
        )}

        {/* user name */}
        <TextField
          fullWidth
          id='user-name'
          label='أسم المستخدم'
          value={body['name']}
          size='small'
          onChange={e => {
            const newValue = e.target.value ?? ''

            const val = newValue
              .replace(/[^a-zA-Z\u0600-\u06FF]]/g, '')
              .replace(/[0-9]/g, '')
              .replace(/[+.!@#$%^&*()\-_=/*?|}{[~?//|\\><`]/g, '')

            handleChange('name', val)

            //validation
            if (val.length > 0 && val.split(' ').filter(ele => ele.length).length >= 3) {
              setErrorField('name', '')
              RemoveFromInvalidField('name')
            } else if (val.length == 0) {
              setErrorField('name', 'أسم المستخدم مطلوب')
              AddToInvalidField('name')
            } else {
              AddToInvalidField('name')
              setErrorField('name', 'أسم المستخدم لابد ان يتكون من 3 كلمات')
            }
          }}
          error={fieldsErrorMessages['name']?.length > 0}
          helperText={
            <Typography variant='body2' color={'error'}>
              {fieldsErrorMessages['name'] ?? ''}
            </Typography>
          }
          disabled={loading}
        />
        {/* user country */}
        <SelectFieldWithValue
          label='الجنسية'
          value={body['country_id']}
          handleChange={val => {
            setnotFirstChange(true)
            handleChange('country_id', val)
          }}
          disabled={loading}
          options={userLookups?.countries?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
        />
        {/* identifier types */}
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
                    ? '191' != body['country_id']
                    : '191' == body['country_id']
              }
              control={
                <Radio
                  disabled={loading}
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
        {/* user identifier */}
        <TextField
          fullWidth
          id='user-identifier'
          label={identifierLabel}
          value={body['identifier']}
          size='small'
          onChange={e => {
            if (e.target.value.length == 0) {
              setErrorField('identifier', 'الحقل التعريفي مطلوب')
              AddToInvalidField('identifier')
            } else {
              RemoveFromInvalidField('identifier')
              setErrorField('identifier', '')
            }

            handleChange('identifier', e.target.value)
          }}
          error={fieldsErrorMessages['identifier']?.length > 0}
          helperText={
            <Typography variant='body2' color={'error'}>
              {fieldsErrorMessages['identifier'] ?? ''}
            </Typography>
          }
          disabled={loading}
        />
        {/* user email */}
        <TextField
          fullWidth
          id='user-email'
          label={'الأيميل'}
          value={body['email']}
          size='small'
          onChange={e => {
            const newValue = e.target.value

            if (emailsRules == undefined) {
              // there is no email validation rules so use default email validation
              const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

              if (newValue.length > 0 && emailRegex.test(newValue)) {
                setErrorField('email', '')
                RemoveFromInvalidField('email')
              } else {
                AddToInvalidField('email')
                setErrorField('email', 'in valid email')
              }
            } else {
              let error = false

              if (emailsRules.start_with) {
                const arr = emailsRules.start_with?.split(',') ?? []

                for (let idx = 0; idx < arr.length; idx++) {
                  if (!newValue.startsWith(arr[idx])) {
                    error = true
                    break
                  }
                }
              }

              if (emailsRules.end_with) {
                const arr = emailsRules.end_with?.split(',') ?? []

                for (let idx = 0; idx < arr.length; idx++) {
                  if (!newValue.endsWith(arr[idx])) {
                    error = true
                    break
                  }
                }
              }

              if (emailsRules.contains) {
                const arr = emailsRules.contains?.split(',') ?? []

                for (let idx = 0; idx < arr.length; idx++) {
                  if (!newValue.includes(arr[idx])) {
                    error = true
                    break
                  }
                }
              }

              if (error) {
                AddToInvalidField('email')
                setErrorField('email', 'invalid email')
              } else {
                RemoveFromInvalidField('email')
                setErrorField('email', '')
              }
            }

            handleChange('email', e.target.value)
          }}
          error={fieldsErrorMessages['email']?.length > 0}
          helperText={
            <Typography variant='body2' color={'error'}>
              {fieldsErrorMessages['email'] ?? ''}
            </Typography>
          }
          disabled={loading}
        />
        {/* user phone */}
        <div className='flex items-start justify-between'>
          <TextField
            fullWidth
            id='user-phone'
            label={'رقم الجوال'}
            value={body['phone']}
            type='number'
            size='small'
            onChange={e => {
              if (e.target.value.length == 0) {
                AddToInvalidField('phone')
                setErrorField('phone', 'رقم الجوال مطلوب')
              } else {
                RemoveFromInvalidField('phone')
                setErrorField('phone', '')
              }

              handleChange('phone', e.target.value)
            }}
            error={fieldsErrorMessages['phone']?.length > 0}
            helperText={
              <Typography variant='body2' color={'error'}>
                {fieldsErrorMessages['phone'] ?? ''}
              </Typography>
            }
            disabled={loading}
          />
          <SelectFieldWithValue
            label=''
            value={body['phone_code']}
            handleChange={val => {
              handleChange('phone_code', val)
            }}
            options={
              userLookups?.countries?.map(ele => ({
                label: (
                  <div className='flex items-center justify-between w-20'>
                    <img src={ele.flag_url ?? ''} width={'20px'} height={'20'} alt={ele.name_ar} />
                    <p className='text-sm'>{` ${ele.phonecode} + `}</p>
                  </div>
                ),
                value: ele.phonecode.toString()
              })) || []
            }
            isfullWidth={false}
          />
        </div>

        <Button
          size='small'
          variant='contained'
          disabled={invalidFields.length > 0}
          onClick={() => {
            handleEditAction()
          }}
        >
          تعديل
        </Button>
      </Stack>
      <ScreenCenterDialog
        open={openFeedBackDialog}
        setOpen={setOpenFeedBackDialog}
        title={feedBackMessageTitle}
        dialogContent={''}
      />
    </>
  )
}

export const SelectFieldWithValue = ({
  label,
  value,
  options,
  handleChange,
  isfullWidth = true,
  disabled = false
}: {
  label: string
  value: string
  options: SelectFieldOptionType[]
  handleChange?: (newValue: string) => void
  isfullWidth?: boolean
  disabled?: boolean
}) => (
  <FormControl fullWidth>
    <InputLabel id={`${label}-label`}>{label}</InputLabel>
    <Select
      label={label}
      defaultValue=''
      id={`${label}-outlined`}
      labelId={`${label}`}
      value={value}
      size='small'
      fullWidth={isfullWidth}
      onChange={e => {
        if (handleChange) handleChange(e.target.value)
      }}
      disabled={disabled}
    >
      {options?.map(option => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
)

type PropsType = {
  open: boolean
  OnSuccessDialogAction: () => void
}
