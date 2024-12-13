import { AxiosError, AxiosRequestConfig } from 'axios'
import {
  useMutation,
  useQuery,
  UseQueryOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryResult,
} from '@tanstack/react-query'
import { axiosInstance } from '../lib/axios'

interface UseApiOptions<TData, TVariables = unknown> extends Omit<AxiosRequestConfig, 'data'> {
  queryKey?: string[]
  queryOptions?: Omit<UseQueryOptions<TData, AxiosError>, 'queryKey' | 'queryFn'>
  mutationOptions?: Omit<UseMutationOptions<TData, AxiosError, TVariables>, 'mutationFn'>
}

export function useApi<TData = unknown, TVariables = unknown>(
  options: UseApiOptions<TData, TVariables>
): UseQueryResult<TData, AxiosError> | UseMutationResult<TData, AxiosError, TVariables> {
  const { queryKey, queryOptions, mutationOptions, ...axiosConfig } = options

  const fetchData = async () => {
    const response = await axiosInstance(axiosConfig)
    return response.data
  }

  if (axiosConfig.method?.toLowerCase() === 'get' && queryKey) {
    return useQuery<TData, AxiosError>({
      queryKey,
      queryFn: fetchData,
      ...queryOptions,
    })
  }

  return useMutation<TData, AxiosError, TVariables>({
    mutationFn: async (variables) => {
      const response = await axiosInstance({
        ...axiosConfig,
        data: variables,
      })
      return response.data
    },
    ...mutationOptions,
  })
}
