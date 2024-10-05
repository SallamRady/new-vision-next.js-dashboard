import GeneralTabsComponent, { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'

export default function CorrespondenceSettingsTabIndex() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 1,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-mail-line text-lg' />
          البريد الألكتروني
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 2,
      label: (
        <div className='flex items-center gap-2 text-lg'>
          <i className='ri-chat-1-line text-lg' />
          الرسائل النصية
        </div>
      ),
      tabContent: <></>
    },
    {
      id: 3,
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
  return <GeneralTabsComponent tabs={tabsData} />
}

type PropsType = {}
