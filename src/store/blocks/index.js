import useSWR from 'swr'
import {
  fetch,
} from '../fetchers'

const ROUTE_PATH = '/blocks'

export function fetchBlock(blockId) {
  const { data, mutate, error } = useSWR(
    `${ROUTE_PATH}/${blockId}`,
    fetch,
    {
      initialData: null,
      revalidateOnFocus: false,
      shouldRetryOnError: true,
      errorRetryCount: 2,
    }
  )

  return {
    block: data,
    loading: !data && !error,
    mutate,
    error,
  }
}
