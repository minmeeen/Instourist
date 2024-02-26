import { Box, Button, Typography } from '@mui/material'
import React from 'react'

interface customButtonProps {
  defaultIcon?: React.ReactNode
  onClickIcon?: React.ReactNode
  text: string
  isClicked: boolean
  onClick: () => void
  matches?: boolean
}

export default function CustomButton(props: customButtonProps) {
  const { defaultIcon, onClickIcon, text, isClicked, onClick, matches } = props

  return (
    <Button
      variant={isClicked ? 'contained' : 'outlined'}
      sx={{
        borderColor: 'text.primary',
      }}
      onClick={onClick}
    >
      {matches ? (
        <Box display={'flex'} gap={'2px'} alignItems={'row'}>
          {isClicked ? onClickIcon : defaultIcon}
          <Typography color={isClicked ? 'white' : 'text.primary'}>
            {text}
          </Typography>
        </Box>
      ) : (
        <Box display={'flex'} justifyContent={'center'}>
          {isClicked ? onClickIcon : defaultIcon}
        </Box>
      )}
    </Button>
  )
}
