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
    action: 'دولوريس.',
    last_update: '2024-07-24 01:13:22',
    user_count: 20,
    permission_count: 1,
    role_manager: 'باميلا جونسون',
    role_name: 'مهندس خدمات المباني'
  },
  {
    action: 'إلينجيندي كولبا أتاك.',
    last_update: '2024-05-09 21:16:19',
    user_count: 50,
    permission_count: 2,
    role_manager: 'ديفيد ريفز',
    role_name: 'مدير الإسكان/موظف'
  },
  {
    action: 'نيسينت كواس أكوساموس.',
    last_update: '2024-04-30 09:09:02',
    user_count: 54,
    permission_count: 6,
    role_manager: 'الدكتور غريغوري بيكر',
    role_name: 'مصمم طباعة'
  },
  {
    action: 'كوي فولوبتاتيبيوس مينما.',
    last_update: '2024-07-04 16:03:49',
    user_count: 19,
    permission_count: 10,
    role_manager: 'براندي شميت',
    role_name: 'مبرمج أنظمة'
  },
  {
    action: 'فولوپتاتي.',
    last_update: '2024-09-30 04:01:35',
    user_count: 86,
    permission_count: 4,
    role_manager: 'هيلي ميتشل',
    role_name: 'أخصائي علم الأمراض'
  }
]

function RolesTable() {
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>م</TableCell>
              <TableCell>اسم الدور</TableCell>
              <TableCell>مدير الدور</TableCell>
              <TableCell>عدد الاذونات</TableCell>
              <TableCell>عدد المستخدمين</TableCell>
              <TableCell>اخر التحديثات</TableCell>
              <TableCell>الاجراء</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>{index}</TableCell>
                <TableCell>{row.role_name}</TableCell>
                <TableCell>{row.role_manager}</TableCell>
                <TableCell>{row.permission_count}</TableCell>
                <TableCell>{row.user_count}</TableCell>
                <TableCell>{row.last_update}</TableCell>
                <TableCell>
                  <Button variant='contained'>اجراء</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default RolesTable
