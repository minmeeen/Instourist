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
