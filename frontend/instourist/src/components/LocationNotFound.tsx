import { Box, Stack, Typography } from '@mui/material'
import { Error } from '@mui/icons-material'
import { webSiteLabel } from '../constant/websiteLabel'

export default function LocationNotFound() {
  return (
    <Box
      display={'flex'}
      padding={'24px'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      gap={'16px'}
      flexShrink={0}
    >
      <Stack flexDirection={'row'} alignItems={'center'} gap={'8px'}>
        <Error color='primary' />
        <Typography variant='h4'>{webSiteLabel.locationNotFoundTH}</Typography>
      </Stack>

      <Typography variant='h6'>{webSiteLabel.locationNotFoundTH2}</Typography>
    </Box>
  )
}
