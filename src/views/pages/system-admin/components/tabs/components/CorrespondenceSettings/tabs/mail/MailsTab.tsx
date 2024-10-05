import { GeneralTabsComponentTabType } from '@/components/tabs/GeneralTabs'
import GeneralVirticalTabsComponent from '@/components/tabs/verticalTabs'
import Image from 'next/image'

//assets
import mailLogo from '@/assets/images/logos/Gmail-Logo.png'
import yahooLogo from '@/assets/images/logos/yahoo-logo.png'
import hotmailLogo from '@/assets/images/logos/hotmail-logo.png'
import { Box } from '@mui/material'
import GmailTab from './components/GmailTab'
import HotmailTab from './components/HotmailTab'
import YahooTab from './components/YahooTab'

export default function MailsTab() {
  // declare and define component state and variables
  const tabsData: GeneralTabsComponentTabType[] = [
    {
      id: 'GT-SA-RS-1',
      label: (
        <div className='flex items-center justify-between text-lg w-full'>
          <Image src={mailLogo.src} width={20} height={20} alt='gmail logo' /> Gmail
        </div>
      ),
      tabContent: <GmailTab />
    },
    {
      id: 'GT-SA-RS-2',
      label: (
        <div className='flex items-center justify-between text-lg w-full'>
          <Image src={yahooLogo.src} width={20} height={20} alt='gmail logo' />
          Yahoo
        </div>
      ),
      tabContent: <YahooTab />
    },
    {
      id: 'GT-SA-RS-3',
      label: (
        <div className='flex items-center justify-between text-lg w-full'>
          <Image src={hotmailLogo.src} width={20} height={20} alt='gmail logo' />
          Hotmail
        </div>
      ),
      tabContent: <HotmailTab />
    }
  ]
  //background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(67, 55, 140, 0.1) 100%);

  return (
    <Box m={4}>
      <GeneralVirticalTabsComponent tabs={tabsData} defaultTabId='GT-SA-RS-1' />
    </Box>
  )
}
