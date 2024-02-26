import { Box, Stack, Typography } from '@mui/material'
import { Error } from '@mui/icons-material'

export default function LocationNotFound() {
  return (
    <Box
      display={'flex'}
      width={'490px'}
      height={'100vh'}
      padding={'24px'}
      flexDirection={'column'}
      alignItems={'flex-start'}
      gap={'16px'}
      flexShrink={0}
      bgcolor={'background.default'}
    >
      <Stack flexDirection={'row'} alignItems={'center'} gap={'8px'}>
        <Error color='primary' />
        <Typography variant='h4'>No Location found.</Typography>
      </Stack>

      <Typography variant='h6'>
        Sorry, the location you're looking for is not avaliable or no longer
        existed.
      </Typography>
    </Box>
  )
}
