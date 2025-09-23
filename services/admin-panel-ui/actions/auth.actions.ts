import { $axios_server } from '@/configs'
import { API_PATH } from '@/constants'

export const signInAction = async (email: string, password: string) => {
  const response = await $axios_server.post(API_PATH.SIGN_IN, { email, password }, {
    validateStatus: () => true,
  })

  return response.data
}
