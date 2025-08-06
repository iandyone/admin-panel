import axios from 'axios'

export const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const $axios_server = axios.create({
  baseURL: process.env.API_BASE_PATH,
  headers: {
    'Content-Type': 'application/json',
  },
})
