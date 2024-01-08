import { Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { common } from '@mui/material/colors'
import { theme } from '../constant/theme'

interface customButtonProps {
  startIcon?: React.ReactNode
  text: string
  isClicked: boolean
  onClick: () => void
}

export default function CustomButton(props: customButtonProps) {
  const { startIcon, text, isClicked, onClick } = props

  return (
    <Button
      variant={isClicked ? 'contained' : 'outlined'}
      sx={{
        borderColor: 'text.primary',
      }}
      onClick={onClick}
    >
      {/* {startIcon} */}
      <Typography color={isClicked ? 'white' : 'text.primary'}>
        {text}
      </Typography>
    </Button>
  )
}
