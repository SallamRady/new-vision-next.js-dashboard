'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  return (
    <div
      className={classnames(verticalLayoutClasses.footerContent, 'flex items-center justify-between flex-wrap gap-4')}
    >
      <p>
        <span className='text-textSecondary'>{`© جميع الحقوق محفوظة لشركة `}</span>
        <Link href='/' className='text-primary uppercase'>
          New Vision
        </Link>
      </p>
    </div>
  )
}

export default FooterContent
