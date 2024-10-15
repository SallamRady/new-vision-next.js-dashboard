import { ComponiesCxtProvider } from './context/ComponiesCxt'
import CompaniesEntryPoint from './components/entry-point/CompaniesEntryPoint'

export default function CompaniesPageContent() {
  return (
    <ComponiesCxtProvider>
      <CompaniesEntryPoint />
    </ComponiesCxtProvider>
  )
}
