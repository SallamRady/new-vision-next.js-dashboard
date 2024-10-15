'use client'

import IssueIcon from '@/components/IssueIcon'
import { Grid, ListItemIcon, ListItemText, MenuItem, MenuList, Paper } from '@mui/material'
import type { MenuItemProps } from '@mui/material'
import { FC, useMemo, useState } from 'react'
import PersonalDetails from './personal-details'
import BankInfo from './bank-info'

const tabs: Record<number, FC | undefined> = {
  0: PersonalDetails,
  1: BankInfo
}

const TabItem = ({
  item,
  children,
  issue,
  setter,
  currentValue,
  ...props
}: MenuItemProps & { item: number; issue?: boolean; setter: (tab: number) => void; currentValue: number }) => {
  return (
    <MenuItem onClick={() => setter(item)} {...props}>
      <ListItemText primaryTypographyProps={{ fontWeight: item === currentValue ? 900 : 400 }} primary={children} />
      {issue && (
        <ListItemIcon>
          <IssueIcon />
        </ListItemIcon>
      )}
    </MenuItem>
  )
}

function PersonalDetailsTabs() {
  const [tab, setTab] = useState(0)
  const renderActiveTab = useMemo(() => {
    const Tab = tabs[tab]
    if (!Tab) return null
    return <Tab />
  }, [tab])

  return (
    <Grid container spacing={4}>
      <Grid item xs={5} md={3} lg={2}>
        <Paper>
          <MenuList
            sx={{
              width: 1,
              '.MuiMenuItem-root': {
                py: 6
              }
            }}
          >
            <TabItem currentValue={tab} setter={setTab} item={0}>
              البيانات الشخصية
            </TabItem>
            <TabItem currentValue={tab} setter={setTab} item={1} issue>
              المعلومات البنكية
            </TabItem>
            <TabItem currentValue={tab} setter={setTab} item={2}>
              معلومات الاتصال
            </TabItem>
          </MenuList>
        </Paper>
      </Grid>
      <Grid item xs={7} md={9} lg={10}>
        {renderActiveTab}
      </Grid>
    </Grid>
  )
}

export default PersonalDetailsTabs
