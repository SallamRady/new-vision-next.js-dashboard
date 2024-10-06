'use client'

import { useForm } from 'react-hook-form'

import { z } from 'zod'
import type { ZodType } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCallback } from 'react'
import validateText from './validate/text'
import GenerateTextField from './fields/text'
import { Grid, Typography } from '@mui/material'
import GenerateSelectField from './fields/select'
import type { RenderFieldOptions } from './types/AllFields'

const fields: Omit<RenderFieldOptions, 'props'>[] = [
  { type: 'text', name: 'test', label: 'Test Label', validate: { max: 8, min: 1, required: true } },
  { type: 'select', name: 'description', label: 'Test Description', validate: {} },
  { type: 'select', name: 'description2', label: 'Test Description2', validate: {} },
  { type: 'select', name: 'description3', label: 'Test Description3', validate: {} },
  { type: 'text', name: 'test2', label: 'Test Label3', validate: { max: 8, min: 1, required: true } }
]

const schemaObject: Record<string, ZodType> = {}

fields.forEach(field => {
  schemaObject[field.name] = validateText(field.validate)
})

function FormGenerator() {
  const schema = z.object(schemaObject)

  const form = useForm({ resolver: zodResolver(schema) })

  const RenderField = useCallback(
    function ({ type, props }: Pick<RenderFieldOptions, 'type' | 'props'>) {
      switch (type) {
        case 'text':
          return <GenerateTextField key={`${type}-${props.name}`} form={form} label={props.label} name={props.name} />
        case 'select':
          return (
            <GenerateSelectField
              key={`${type}-${props.name}`}
              form={form}
              label={props.label}
              name={props.name}
              options={[]}
            />
          )
      }
    },
    [form]
  )

  const {
    handleSubmit,
    formState: { errors }
  } = form

  const onSubmit = handleSubmit(data => {
    console.log(data)
  })

  return (
    <form onSubmit={onSubmit}>
      <Grid container spacing={4}>
        {fields.map(field => (
          <Grid item xs={12} md={6} key={field.name}>
            <RenderField type={field.type} props={{ form: form, name: field.name, label: field.label }} />
            <Typography color={'error'}>{errors?.[field.name]?.message as any}</Typography>
          </Grid>
        ))}
      </Grid>
      <button type='submit'>Submit</button>
    </form>
  )
}

export default FormGenerator
