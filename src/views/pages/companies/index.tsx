import { ComponiesCxtProvider } from './context/ComponiesCxt'
import CompaniesEntryPoint from './components/entry-point/CompaniesEntryPoint'
import { CompaniesContextProvider } from './context/Companies'

export default function CompaniesPageContent() {
  return (
    <ComponiesCxtProvider>
      <CompaniesContextProvider>
        <CompaniesEntryPoint />
      </CompaniesContextProvider>
    </ComponiesCxtProvider>
  )
}
