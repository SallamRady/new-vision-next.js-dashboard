import { useState } from 'react'

import { useRouter } from 'next/navigation'

import {
  Checkbox,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { useMutation } from '@tanstack/react-query'

import axios from 'axios'
import { z } from 'zod'

import LoadingButton from '@mui/lab/LoadingButton'

import { TableSchemaColumnSchema, type TableSchemaColumn } from '@/types/api/table-schema'
import { api } from '@/Constants/api-v2'
import { SuccessMessage } from '@/utils/notificationsMessages'

type Props = {
  open: boolean
  onClose: () => void
  schema: TableSchemaColumn[]
  schemaId: number | string
  onSuccess: () => void
}

export function SetSchemaButton({
  schema,
  schemaId,
  onSuccess
}: {
  schema: TableSchemaColumn[]
  schemaId: number | string
  onSuccess: () => void
}) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <SetSchemaDrawer
        onSuccess={onSuccess}
        open={open}
        onClose={() => setOpen(false)}
        schema={schema}
        schemaId={schemaId}
      />
      <IconButton onClick={() => setOpen(true)}>
        <i className='ri-equalizer-3-fill' />
      </IconButton>
    </>
  )
}

function SetSchemaDrawer({ onClose, open, schema, schemaId, onSuccess }: Props) {
  const [selected, setSelected] = useState<string[]>(
    schema.filter(({ selected }) => Boolean(selected)).map(({ key }) => key) || []
  )

  const router = useRouter()

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const zodSchema = z.array(TableSchemaColumnSchema)
      const schemaColumns: TableSchemaColumn[] = schema.map(s => ({ ...s, selected: selected.includes(s.key) ? 1 : 0 }))
      const parsed = zodSchema.parse(schemaColumns)

      const res = (await axios.post(api`lookup/meta-table/${schemaId}`, { schema: parsed })) as any

      SuccessMessage('تم حفظ اعدادات الجدول بنجاح')
      onSuccess()
      onClose()
      router.refresh()

      return res
    }
  })

  const [search, setSearch] = useState('')

  return (
    <Drawer open={open} variant='temporary' anchor='right' onClose={onClose}>
      <div className='p-6 flex flex-col' style={{ minHeight: '100vh' }}>
        <Typography variant='h4' gutterBottom>
          التنقية
        </Typography>
        <Stack component='form' onSubmit={undefined} sx={{ width: 350, px: 4, flexGrow: 1 }} spacing={4}>
          <TextField value={search} onChange={e => setSearch(e.target.value)} placeholder={'بحث'} />
          <FormControl>
            <FormControlLabel
              label={'اظهار الكل'}
              control={
                <Checkbox
                  checked={selected.length === schema.length}
                  onChange={(e, checked) => {
                    if (checked) setSelected(schema.map(x => x.key))
                    else setSelected([])
                  }}
                />
              }
            />
          </FormControl>
          {['الشركة', 'الحالة']
            .filter(x => x.includes(search))
            .map(label => (
              <FormControl key={[label].join()}>
                <FormControlLabel disabled label={label} control={<Checkbox checked={true} />} />
              </FormControl>
            ))}
          {schema
            .filter(x => x.label.includes(search))
            .map(({ key, label }) => {
              const found = selected.includes(key)

              return (
                <FormControl key={[key, label].join()}>
                  <FormControlLabel
                    label={label}
                    control={
                      <Checkbox
                        checked={found}
                        onChange={() => {
                          if (found) {
                            setSelected(s => s.filter(x => x !== key))
                          } else {
                            setSelected(s => [...s, key])
                          }
                        }}
                      />
                    }
                  />
                </FormControl>
              )
            })}
          <div style={{ flexGrow: 1 }}></div>
          <LoadingButton variant='contained' onClick={() => mutate()} loading={isPending}>
            حفظ
          </LoadingButton>
        </Stack>
      </div>
    </Drawer>
  )
}

export default SetSchemaDrawer
