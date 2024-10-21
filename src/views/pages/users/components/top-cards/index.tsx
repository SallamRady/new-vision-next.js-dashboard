'use client'
import { useContext } from 'react'

import { Stack } from '@mui/material'

import HorizontalWithSubtitle from '@/components/card-statistics/HorizontalWithSubtitle'

import { UsersContext } from '../../context'

export default function UsersTopCards() {
  const { count_active_users, users_count, count_inactive_users, users_count_last_month } = useContext(UsersContext)

  return (
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-around'} flexWrap={'wrap'}>
      <HorizontalWithSubtitle
        title='اجمالي عدد المستخدمين'
        subtitle=''
        stats={users_count ? users_count.toString() : '0'}
        avatarIcon='ri-user-3-line'
        avatarColor='primary'
        trend='positive'

        // trendNumber='18%'
      />
      <HorizontalWithSubtitle
        title='المستخدمين المضافين اخر شهر'
        subtitle=''
        stats={users_count_last_month ? users_count_last_month.toString() : '0'}
        avatarIcon='ri-arrow-right-up-line'
        avatarColor='primary'
        trend='negative'

        // trendNumber='14%'
      />
      <HorizontalWithSubtitle
        title='المستخدمين النشطيين'
        subtitle=''
        stats={count_active_users ? count_active_users.toString() : '0'}
        avatarIcon='ri-checkbox-circle-line'
        avatarColor='primary'
        trend='positive'

        // trendNumber='18%'
      />
      <HorizontalWithSubtitle
        title='المستخدمين المعلقين'
        subtitle=''
        stats={count_inactive_users ? count_inactive_users.toString() : '0'}
        avatarIcon='ri-bar-chart-fill'
        avatarColor='primary'
        trend='negative'

        // trendNumber='14%'
      />
    </Stack>
  )
}
