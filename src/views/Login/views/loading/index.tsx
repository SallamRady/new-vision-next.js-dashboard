import './index.scss'
import Image from 'next/image'

import img from '@/assets/images/logos/constrix.png'

export default function LoginLoading() {
  return (
    <div className='flex flex-col gap-6'>
      <Image src={img.src} width={90} height={90} alt='loading...' className='animate-scale-Image' />
    </div>
  )
}
