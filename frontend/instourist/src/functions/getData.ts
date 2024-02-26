import axios from 'axios'
import { languageDetectedInitData } from '../constant/getDataType'
import { useCallback, useState } from 'react'

export const getData = async (
  url: string,
  setResponseData: React.Dispatch<
    React.SetStateAction<languageDetectedInitData>
  >,
  setResponseStatus: React.Dispatch<React.SetStateAction<number>>,
  setLoadingResponsese: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setLoadingResponsese(true)
  try {
    const response = await axios.get(
      url,
      // forTestUrl,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    setResponseData(response.data)
    setResponseStatus(response.status)
    setLoadingResponsese(false)
  } catch (error) {
    // Handle errors (e.g., display an error message)

    setResponseStatus(400)
    setLoadingResponsese(false)
  }
}

// export const getData = (url: string) => {
//   const [responseData, setResponseData] = useState<languageDetectedInitData>()
//   const [responseStatus, setResponseStatus] = useState<number>(-1)
//   const [loadingData, setLoadingData] = useState<boolean>(false)

//   const fetchingData = useCallback(
//     async (url: string) => {
//       try {
//         const response = await axios.get(url, {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         })

//         setResponseData(response.data)
//         setResponseStatus(response.status)
//       } catch (error) {
//         // Handle errors (e.g., display an error message)

//         setResponseStatus(400)
//       } finally {
//         setLoadingData(false)
//       }
//     },
//     [url]
//   )

//   return [responseData, responseStatus, loadingData, fetchingData]
// }
