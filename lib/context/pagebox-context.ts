import {createContext} from 'react'

const defaultPaginationContext: PaginationType = {
  hasNextPage: false,
  hasPrevPage: false,
  limit: 1,
  page: 1,
  totalCount: 0,
  totalPage: 1,
}

export const PageBoxContext = createContext<PaginationType>(defaultPaginationContext)

type PaginationType = {
  hasNextPage: boolean
  hasPrevPage: boolean
  limit: number
  page: number
  totalCount: number
  totalPage: number
}
