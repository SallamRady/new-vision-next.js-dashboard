import { useContext, useEffect, useState } from 'react'
import { UsersContext } from '../../../context'
// types
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
import Loader from '@/components/Loader'
import { SelectFieldOptionType } from '@/types/input-controls-types'
import { UserIdentifierEnum, userIdentifiersWays, UserTypeEnum } from './AddUserDialog'
import TextFieldControl from '@/components/forms/text-field/TextFieldControl'
import SelectControlField from '@/components/forms/select-elements/SelectControlField'
import { validationType } from '@/types/validationType'

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

  // ** handle declare and define component helper methods
  useEffect(() => {
    setLoadingEditiedUserData(true)
    // determined user enum.

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
  }, [props.open])

  const handleChange = (key: string, value: string) => {
    setBody(prev => ({ ...prev, [key]: value }))
  }

  const setErrorField = (key: string, value: string) => {
    setFieldsErrorMessages(prev => ({ ...prev, [key]: value }))
  }

  const handleEditAction = () => {}

  if (editedUser == undefined || loadingEditiedUserData) return <Loader />

  console.log('====> ', fieldsErrorMessages['email'], emailsRules)
  // ** return component ui
  return (
    <Stack spacing={3} width={'100%'}>
      {/* user type */}
      <SelectFieldWithValue
        label='نوع المستخدم'
        value={body['user_type_id']}
        handleChange={val => {
          handleChange('user_type_id', val)
        }}
        options={userLookups?.user_types?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
      />
      {/* user tenants */}
      <SelectFieldWithValue
        label='الشركة'
        value={body['tenant_id']}
        handleChange={val => {
          handleChange('tenant_id', val)
        }}
        options={userLookups?.tenants?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
      />
      {/* user name */}
      <TextField
        fullWidth
        id='user-name'
        label='أسم المستخدم'
        value={body['name']}
        size='small'
        onChange={e => {
          let newValue = e.target.value ?? ''
          let val = newValue
            .replace(/[^a-zA-Z\u0600-\u06FF]]/g, '')
            .replace(/[0-9]/g, '')
            .replace(/[+.!@#$%^&*()\-_=/*?|}{[~?//|\\><`]/g, '')
          handleChange('name', val)
          //validation
          if (val.length > 0 && val.split(' ').filter(ele => ele.length).length >= 3) {
            setErrorField('name', '')
          } else if (val.length == 0) {
            setErrorField('name', 'أسم المستخدم مطلوب')
          } else {
            setErrorField('name', 'أسم المستخدم لابد ان يتكون من 3 كلمات')
          }
        }}
        error={fieldsErrorMessages['name']?.length > 0}
        helperText={
          <Typography variant='body2' color={'error'}>
            {fieldsErrorMessages['name'] ?? ''}
          </Typography>
        }
      />
      {/* user country */}
      <SelectFieldWithValue
        label='الجنسية'
        value={body['country_id']}
        handleChange={val => {
          handleChange('country_id', val)
        }}
        options={userLookups?.countries?.map(ele => ({ label: ele.name, value: ele.id + '' })) || []}
      />
      {/* identifier types */}
      <RadioGroup row defaultValue='checked' name='basic-radio' aria-label='basic-radio'>
        {userIdentifiersWays?.map(identifier => (
          <FormControlLabel
            key={identifier.id}
            value={identifier.value}
            disabled={
              identifier.value == UserIdentifierEnum.NationalIdentity
                ? '191' != body['country_id']
                : '191' == body['country_id']
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
          } else {
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
      />
      {/* user email */}
      <TextField
        fullWidth
        id='user-email'
        label={'الأيميل'}
        value={body['email']}
        size='small'
        onChange={e => {
          let newValue = e.target.value

          if (emailsRules == undefined) {
            // there is no email validation rules so use default email validation
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if (newValue.length > 0 && emailRegex.test(newValue)) {
              setErrorField('email', '')
            } else {
              setErrorField('email', 'in valid email')
            }
          } else {
            let error = false
            if (emailsRules.start_with) {
              let arr = emailsRules.start_with?.split(',') ?? []

              for (let idx = 0; idx < arr.length; idx++) {
                if (!newValue.startsWith(arr[idx])) {
                  error = true
                  break
                }
              }
            }
            if (emailsRules.end_with) {
              let arr = emailsRules.end_with?.split(',') ?? []

              for (let idx = 0; idx < arr.length; idx++) {
                if (!newValue.endsWith(arr[idx])) {
                  error = true
                  break
                }
              }
            }
            if (emailsRules.contains) {
              let arr = emailsRules.contains?.split(',') ?? []

              for (let idx = 0; idx < arr.length; idx++) {
                if (!newValue.includes(arr[idx])) {
                  error = true
                  break
                }
              }
            }
            console.log('target point error::', error)

            if (error) setErrorField('email', 'invalid email')
            else setErrorField('email', '')
          }

          handleChange('email', e.target.value)
        }}
        error={fieldsErrorMessages['email']?.length > 0}
        helperText={
          <Typography variant='body2' color={'error'}>
            {fieldsErrorMessages['email'] ?? ''}
          </Typography>
        }
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
              setErrorField('phone', 'رقم الجوال مطلوب')
            } else {
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
        />
        <SelectControlField
          label=''
          defaultValue={body['phone_code']}
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
        />
      </div>

      <Button
        size='small'
        variant='contained'
        onClick={() => {
          handleEditAction()
        }}
      >
        تعديل
      </Button>
    </Stack>
  )
}

const SelectFieldWithValue = ({
  label,
  value,
  options,
  handleChange
}: {
  label: string
  value: string
  options: SelectFieldOptionType[]
  handleChange?: (newValue: string) => void
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
      onChange={e => {
        if (handleChange) handleChange(e.target.value)
      }}
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
  open: Boolean
  OnSuccessDialogAction: () => void
}
