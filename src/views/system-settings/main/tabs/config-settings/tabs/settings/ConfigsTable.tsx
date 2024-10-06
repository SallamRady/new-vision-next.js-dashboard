import TableContainer from '@mui/material/TableContainer'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import { Button, Checkbox } from '@mui/material'

const data = [
  {
    config_name: 'إعداد 1',
    status: 'نشط',
    service_providers: 'مزود الخدمة A',
    companies: 'الشركة A',
    user_count: 20
  },
  {
    config_name: 'إعداد 2',
    status: 'غير نشط',
    service_providers: 'مزود الخدمة B',
    companies: 'الشركة B',
    user_count: 50
  },
  {
    config_name: 'إعداد 3',
    status: 'نشط',
    service_providers: 'مزود الخدمة C',
    companies: 'الشركة C',
    user_count: 54
  },
  {
    config_name: 'إعداد 4',
    status: 'نشط',
    service_providers: 'مزود الخدمة D',
    companies: 'الشركة D',
    user_count: 19
  },
  {
    config_name: 'إعداد 5',
    status: 'غير نشط',
    service_providers: 'مزود الخدمة E',
    companies: 'الشركة E',
    user_count: 86
  }
]

function ConfigsTable() {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>اعدادات</TableCell>
              <TableCell>اسم الاعداد</TableCell>
              <TableCell>عدد المستخدمين</TableCell>
              <TableCell>الحالة</TableCell>
              <TableCell>مزودين الخدمة</TableCell>
              <TableCell>الشركات المستخدمة</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{row.config_name}</TableCell>
                <TableCell>{row.user_count}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.service_providers}</TableCell>
                <TableCell>{row.companies}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default ConfigsTable
