import { MenuItem } from '@/@menu/vertical-menu'
import { HorizontalMenuDataType } from '@/types/menuTypes'
import { hasChildren } from '@/utils/checkMenuItemhasChildren'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'

export default function MenuItemWithChildren(props: PropsType) {
  // extract data from props
  const { item } = props

  return (
    <Accordion
      sx={{
        bgcolor: 'none',
        '&.MuiPaper-root': {
          background: 'none',
          boxShadow: '0 0'
        }
      }}
    >
      <AccordionSummary
        id={`${item.label}-header`}
        aria-controls={`${item.label}-content`}
        sx={{
          display: 'flex',
          py: 0,
          px: 2,
          alignItems: 'center'
        }}
      >
        <i className={item.icon} />
        <Typography fontSize={'1rem'}>{item.label}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {hasChildren(item) &&
          item.children?.map((link, index) => (
            <MenuItem key={`${link.href}-${index}`} href={link.href} icon={<i className={link.icon} />}>
              {link.label}
            </MenuItem>
          ))}
      </AccordionDetails>
    </Accordion>
  )
}

type PropsType = {
  item: HorizontalMenuDataType
}
