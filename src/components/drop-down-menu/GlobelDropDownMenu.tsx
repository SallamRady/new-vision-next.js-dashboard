'use client'
// React Imports
import React, { useState, type MouseEvent } from 'react'

// MUI Imports
import Menu from '@mui/material/Menu'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'

export default function GlobelDropDownMenu(props: PropsType) {
  // ** declare and define component state abd variables
  const { btnTitle, btnLoadingTitle = 'جاري...', buttons, disabled = false } = props
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  // ** declare and define component helper methods
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleMenuBtnClick = (btn: GenericMenuButton) => {
    setLoading(true)
    handleClose()
    try {
      new Promise(async (resove, reject) => {
        if (btn?.onClick) await btn?.onClick()
        resove('function is executed!')
      }).then(() => {
        setLoading(false)
      })
    } catch (error) {
      setLoading(false)
    }
  }

  // ** return ui
  return (
    <>
      <Button
        endIcon={<i className='ri-arrow-down-s-line'></i>}
        variant='contained'
        aria-controls='basic-menu'
        aria-haspopup='true'
        color={loading ? 'inherit' : 'primary'}
        onClick={handleClick}
        disabled={loading || disabled}
      >
        {loading ? btnLoadingTitle : btnTitle}
      </Button>

      <Menu keepMounted id='basic-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        {buttons?.map(btn => (
          <MenuItem
            key={btn.id}
            onClick={() => {
              handleMenuBtnClick(btn)
            }}
            disabled={Boolean(btn?.disabled)}
          >
            {btn.title}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export type GenericMenuButton = { id: string; title: React.ReactNode; onClick?: () => void; disabled?: boolean }
type PropsType = {
  btnTitle: string
  btnLoadingTitle?: string
  buttons: GenericMenuButton[]
  disabled?: boolean
}
