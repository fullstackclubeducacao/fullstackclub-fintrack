import { useMutation, useQuery } from '@tanstack/react-query'

import { UserService } from '@/api/services/user'
import { useAuthContext } from '@/contexts/auth'

export const getUserBalanceQueryKey = ({ userId, from, to }) => {
  if (!from || !to) {
    return ['balance', userId]
  }
  return ['balance', userId, from, to]
}

export const useGetUserBalance = ({ from, to }) => {
  const { user } = useAuthContext()
  return useQuery({
    queryKey: getUserBalanceQueryKey({ userId: user.id, from, to }),
    queryFn: () => {
      return UserService.getBalance({ from, to })
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: Boolean(from) && Boolean(to) && Boolean(user.id),
  })
}

export const signupMutationKey = ['signup']

export const useSignup = () => {
  return useMutation({
    mutationKey: signupMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.signup(variables)
      return response
    },
  })
}

export const loginMutationKey = ['login']

export const useLogin = () => {
  return useMutation({
    mutationKey: loginMutationKey,
    mutationFn: async (variables) => {
      const response = await UserService.login(variables)
      return response
    },
  })
}
