import { Box, Button, Typography, useTheme } from '@mui/material'
import { InstouristLocation } from '../constant/locations'
import findLocationImgSrc from '../functions/findLocationImgSrc'
import { SetStateAction } from 'react'

interface LocationCardProps {
  location: InstouristLocation
  onClickSeeDetail: () => void
  fullSize?: boolean
  setFullSize?: React.Dispatch<SetStateAction<boolean>>
}

export default function LocationCard(props: LocationCardProps) {
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const { location, onClickSeeDetail, fullSize, setFullSize } = props
  return (
    <Box
      display={'flex'}
      width={'100%'}
      minHeight={'200px'}
      alignItems={'center'}
      sx={{
        borderRadius: '16px',
        boxShadow: isDark
          ? '0px 0px 6.3px 0px rgba(255, 255, 255, 0.25)'
          : '0px 0px 6.3px 0px rgba(0, 0, 0, 0.25)',
      }}
      position={'relative'}
      bgcolor={'black'}
    >
      {findLocationImgSrc(location.locationImgName)}
      <Box
        id='card-detail'
        display={'flex'}
        flexDirection={'column'}
        justifyContent={'space-between'}
        alignItems={'flex-start'}
        position={'absolute'}
        width={'90%'}
        height={'90%'}
        alignSelf={'stretch'}
        padding={'4px 10px'}
        textAlign={'left'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          alignItems={'flex-start'}
          alignSelf={'stretch'}
        >
          <Typography variant='h3' color='white'>
            {location.locationEN}
          </Typography>
          <Typography variant='body2' color='white'>
            {location.locationTH}
          </Typography>
        </Box>
        <Button
          variant='outlined'
          sx={{
            textTransform: 'none',
            borderColor: 'white',
          }}
          onClick={() => {
            onClickSeeDetail()
            if (fullSize && setFullSize) {
              setFullSize(!fullSize)
            }
          }}
        >
          <Typography color='white'>See details</Typography>
        </Button>
      </Box>
    </Box>
  )
}
