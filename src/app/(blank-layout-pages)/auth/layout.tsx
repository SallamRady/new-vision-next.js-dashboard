import { ChildrenType } from '@/@core/types'
import { withNoAuth } from '@/guards/auth.guard'

type Props = ChildrenType

function AuthLayout({ children }: Props) {
  return children
}
export default withNoAuth(AuthLayout)
