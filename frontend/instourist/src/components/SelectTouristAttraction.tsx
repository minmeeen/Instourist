import { Box, Button, Icon, Typography } from '@mui/material'
import { common } from '@mui/material/colors'
import nature  from '../img/nature.svg'
import React from 'react'

interface SelectTouristAttractionProps {
    darkMode: boolean
}
export default function SelectTouristAttraction(props: SelectTouristAttractionProps ) {
    const {darkMode} = props

    const svgIcon = (
        <Icon>
          <img alt="edit" src={nature} style={{width: "100%", height: "100%"}}/>
        </Icon>
      );
  return (
    // <Box textAlign={'center'}>
    
    <Box sx={{borderRadius: '8px', bgcolor: `${darkMode ? 'rgba(0, 0, 0, 0.65)' : 'rgba(255, 255, 255, 0.65)'} `, boxShadow: '0px 4px 4px 0px rgba(56, 64, 95, 0.25)'}}
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        alignItems={'center'}
        padding={'14px 40px'}
        gap={'8px'}
    >
       <Typography variant='h4' color={darkMode? common.white : '#38405F'}>
    Select a tourist destination
</Typography>
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'} gap={'16px'}>
            <Button variant='outlined' sx={{borderColor: `${darkMode? common.white : '#38405F'}`}}>
                <Typography  color={darkMode? common.white : '#38405F'}>
                    Nature
                </Typography>
                
            </Button>
            <Button variant='outlined' sx={{borderColor: `${darkMode? common.white : '#38405F'}`}} >
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
    // </Box>
    
  )
}
