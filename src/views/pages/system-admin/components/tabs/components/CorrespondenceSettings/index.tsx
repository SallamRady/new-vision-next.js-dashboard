import type { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import GeneralTabsComponent from '@/components/tabs/GeneralTabs'
import MailsTab from './tabs/mail/MailsTab'
import { CorrespondenceSettingsCxtProvider } from './context/CorrespondenceSettingsCxt'

export default function CorrespondenceSettingsTabIndex() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 'GT-SA-RS-1',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-mail-line text-lg' />
          البريد الألكتروني
        </div>
      ),
      tabContent: <MailsTab />
    },
    {
      id: 'GT-SA-RS-2',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-chat-1-line text-lg' />
          الرسائل النصية
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 'GT-SA-RS-3',
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-user-line text-lg' />
          منصات التواصل
        </div>
      ),
      tabContent: <></>
    }
  ]

  // return component ui
  return (
    <CorrespondenceSettingsCxtProvider>
      <GeneralTabsComponent defaultTabId='GT-SA-RS-1' tabs={tabsData} />
    </CorrespondenceSettingsCxtProvider>
  )
}
