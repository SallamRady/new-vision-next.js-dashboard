import { Stack } from '@mui/material'
import StatisticsCardsControl from './components/01.StatisticsCardsControl'
import SearchFiltersControl from './components/02.SearchFiltersControl'
import TableColumnsControl from './components/03.TableColumnsControl'

export default function UsersPageSettingsTab() {
  // ** declare and define component state and variables

  // ** declare and define component helper methods

  // ** return component ui
  return (
    <Stack spacing={6}>
      <StatisticsCardsControl />
      <SearchFiltersControl />
      <TableColumnsControl />
    </Stack>
  )
}

type PropsType = {}
