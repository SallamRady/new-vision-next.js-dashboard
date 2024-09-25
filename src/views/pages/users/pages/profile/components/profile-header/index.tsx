import GeneralProfileHeaderCard, { ProfileHeaderTagType } from '@/components/cards/profiles/GeneralProfileHeaderCard'

const dummyTags: ProfileHeaderTagType[] = [
  { icon: 'ri-palette-line', title: 'مهندس برمجة' },
  { icon: 'ri-map-pin-line', title: 'جدة' },
  { icon: 'ri-calendar-line', title: 'April 2021' }
]

export default function UserProfileHeaderCard() {
  return <GeneralProfileHeaderCard imageSrc='/images/avatars/1.png' fullName='Sallam Rady Ramadan' tags={dummyTags} />
}
