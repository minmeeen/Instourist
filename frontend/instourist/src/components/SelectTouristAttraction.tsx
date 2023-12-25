import { Box, Button, Typography } from '@mui/material'
import { common } from '@mui/material/colors'
import React from 'react'

interface SelectTouristAttractionProps {
    darkMode: boolean
}
export default function SelectTouristAttraction(props: SelectTouristAttractionProps ) {
    const {darkMode} = props
  return (
    <Box sx={{borderRadius: '16px', bgcolor: `${darkMode ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.65)'} `, boxShadow: '0px 4px 4px 0px rgba(56, 64, 95, 0.25)'}}
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'20px 40px'}
    >
        <Typography variant='h4' color={darkMode? common.white : '#38405F'}>
            Select tourist attraction
        </Typography>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'16px'}>
            <Button variant='outlined' sx={{borderColor: `${darkMode? common.white : '#38405F'}`}}>
                <Typography  color={darkMode? common.white : '#38405F'}>
                    Nature
                </Typography>
                
            </Button>
            <Button variant='outlined' sx={{borderColor: `${darkMode? common.white : '#38405F'}`}}>
            <Typography color={darkMode? common.white : '#38405F'}>
            Art & Culture
                </Typography>
                
            </Button>
            <Button variant='outlined' sx={{borderColor: `${darkMode? common.white : '#38405F'}`}}>
            <Typography color={darkMode? common.white : '#38405F'}>
            Historic
                </Typography>
                
            </Button>
            <Button variant='outlined' sx={{borderColor: `${darkMode? common.white : '#38405F'}`}}>
            <Typography color={darkMode? common.white : '#38405F'}>
            Modern
                </Typography>
               
            </Button>
        </Box>
    </Box>
  )
}
