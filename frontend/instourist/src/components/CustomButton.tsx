import { Button, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { DarkModeContext } from '../App'
import { common } from '@mui/material/colors'

interface customButtonProps {
  startIcon?: React.ReactNode
  text: string
  isClicked: boolean
  onClick: () => void
}

export default function CustomButton(props: customButtonProps) {
  const { startIcon, text, isClicked, onClick } = props

  const darkMode = useContext(DarkModeContext)
  const isDark = darkMode.darkMode

  return (
    <Button
      variant={isClicked ? 'contained' : 'outlined'}
      sx={{
        borderColor: `${isDark ? common.white : '#38405F'}`,
      }}
      onClick={onClick}
    >
      {/* {startIcon} */}
      <Typography color={isDark || isClicked ? common.white : '#38405F'}>
        {text}
      </Typography>
    </Button>
  )
}
