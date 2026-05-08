

import axios from 'axios'


const BASE_URL = 'https://symmetrical-carnival-pjr59wqg5545f6pvg-8080.app.github.dev'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

export default api