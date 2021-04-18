import useSWR, { mutate, cache } from 'swr'

export function useSWRList(queryList, queryFn) {
  const mutations = queryList.map((queryKey) => () => {
    const cachedResult = cache.get(queryKey)

    if (cachedResult) {
      return {
        data: cachedResult,
        key: queryKey,
      }
    }

    return (
      mutate(queryKey, () => queryFn(queryKey))
      .then((v) => ({
        data: v,
        key: queryKey,
      }))
      // The error has been save in cache base on key
      // so the error was handled individually
      .catch((e) => ({
        error: e,
        key: queryKey,
      }))
    )
  })

  return useSWR(
    queryList,
    () => Promise.all(mutations.map((v) => v()))
  )
}
