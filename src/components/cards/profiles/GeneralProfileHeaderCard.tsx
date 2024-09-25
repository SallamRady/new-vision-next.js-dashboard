// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function GeneralProfileHeaderCard(props: PropsType) {
  // extract data from props
  const { imageSrc, fullName, tags } = props

  return (
    <Card>
      <CardContent className='flex justify-center flex-col items-center gap-6 md:items-end md:flex-row md:justify-start'>
        <div className='flex rounded-bs-xl  border-be-0 border-backgroundPaper bg-backgroundPaper'>
          {/* profile image */}
          <img height={120} width={120} src={imageSrc} className='rounded' alt='Profile Background' />
        </div>
        <div className='flex is-full flex-wrap justify-start flex-col items-center sm:flex-row sm:justify-between sm:items-end gap-5'>
          <div className='flex flex-col items-center sm:items-start gap-2'>
            {/* full name */}
            <Typography variant='h4'>{fullName}</Typography>
            <div className='flex flex-wrap gap-6 gap-y-3 justify-center sm:justify-normal min-bs-[38px]'>
              {tags?.map((tag, index) => (
                <div key={`tag-${index}-${tag.title}`} className='flex items-center gap-2'>
                  <i className={tag.icon} />
                  <Typography className='font-medium'>{tag.title}</Typography>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export type ProfileHeaderTagType = { icon: string; title: string }

type PropsType = {
  imageSrc: string
  fullName: string
  tags: ProfileHeaderTagType[]
}
