import axios from 'axios'
import { BACKEND_URL } from './config'
import { BackendResponse } from './model'

export const getMessage = async (testValue?: string): Promise<BackendResponse> => {
  const response = await axios.get(`${BACKEND_URL}?test=${testValue || 'Frontend'}`)
  return response.data
}
