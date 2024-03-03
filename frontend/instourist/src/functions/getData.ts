import axios, { AxiosRequestConfig } from 'axios'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ROUTE } from '../constant/ROUTE'
import { useNavigate } from 'react-router-dom'

const baseURL = process.env.REACT_APP_BASE_API
interface BaseProps {
  url: string
  autoFetch: boolean
  queryParams?: Record<string, any>
  jwtToken?: string
  autoNavigate?: boolean
}

type GetProps = {
  method: 'GET' | 'HEAD'
  data?: never
}

// eslint-disable-next-line
type Props<T> = BaseProps & GetProps

type FetchReturn<T> = [
  result: null | T,
  loading: boolean,
  refresh: () => void,
  statusCode: number,
]

const useFetch = <T>({
  url,
  method,
  autoFetch,
  queryParams,
  jwtToken,
  data,
  autoNavigate,
}: Props<T>): FetchReturn<T> => {
  const navigate = useNavigate()
  const [result, setResult] = useState<T | null>(null)
  const [loading, setLoading] = useState(false)
  const [statusCode, setStatusCode] = useState(-1)

  const dataRef = useRef(data)
  const queryParamsRef = useRef(queryParams)

  // if (!isDeepEqual(dataRef.current, data)) {
  //   dataRef.current = data
  // }

  // if (!isDeepEqual(queryParamsRef.current, queryParams)) {
  //   queryParamsRef.current = queryParams
  // }

  const fetchData = useCallback(async () => {
    setLoading(true)

    const config: AxiosRequestConfig = {
      url,
      method,
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      data,
      paramsSerializer: { indexes: null },
    }

    if (queryParams) {
      config.params = queryParams
    }

    if (jwtToken) {
      config.headers!.Authorization = `Bearer ${jwtToken}`
    }

    try {
      const response = await axios.request<T>(config)
      setResult(response.data)
      setStatusCode(response.status)
    } catch (error: any) {
      console.error('Error fetching data:', error)
      setResult(null)
      if (error.response) {
        const code = error.response.status
        setStatusCode(error.response.status)
        console.error('Response data:', error.response.data)
        if (autoNavigate === undefined || autoNavigate === true) {
          if (code === 404) {
            window.scrollTo(0, 0)
            navigate(ROUTE.NOT_FOUND)
          }
        }
        if (code === 409) {
          setResult(error.response.data)
        }
      } else {
        setStatusCode(500)
        console.error('Unknown error occurred. Request was not sent.')
      }
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataRef.current, jwtToken, method, url, queryParamsRef.current])

  const refresh = () => {
    fetchData()
  }

  useEffect(() => {
    if (autoFetch) fetchData()
  }, [autoFetch, fetchData])

  return [result, loading, refresh, statusCode]
}

export function useGet<T>({
  url,
  autoFetch,
  queryParams,
  jwtToken,
  autoNavigate,
}: BaseProps): FetchReturn<T> {
  return useFetch({
    url,
    method: 'GET',
    autoFetch,
    queryParams,
    jwtToken,
    autoNavigate,
  })
}
