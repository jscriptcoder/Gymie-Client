import { argv } from 'yargs'

export const { 
  port = 5000, 
  host = '0.0.0.0',
} = argv

export const wsApi = `ws://${host}:${port}`
