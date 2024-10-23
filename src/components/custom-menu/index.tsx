import type { ReactNode, MouseEvent } from 'react'
import { useState } from 'react'

import { Menu } from '@mui/material'

type CustomMenuProps = {
  renderAnchor: (props: { onClick: (event: MouseEvent<HTMLElement>) => void; open: boolean }) => ReactNode
  closeOnSelect?: boolean
  children: ReactNode
}

const CustomMenu = ({ renderAnchor, children }: CustomMenuProps) => {
  const [anchorElement, setAnchorElement] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorElement)

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  return (
    <>
      {/* Anchor Element rendered via render function */}
      {renderAnchor({
        onClick: handleClick,
        open
      })}

      {/* MUI Menu */}
      <Menu anchorEl={anchorElement} open={open} onClose={handleClose} onClick={handleClose}>
        {children}
      </Menu>
    </>
  )
}

export default CustomMenu
