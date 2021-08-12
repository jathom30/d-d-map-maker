import { useReducer, useEffect } from 'react'

type PaginationProps<T> = {
  pageSize: number
} & (
  | { fetchData?: never; sourceData: T[] }
  | {
      sourceData?: never
      fetchData: ({
        page,
        pageSize,
      }: {
        page: number
        pageSize: number
      }) => Promise<{
        data: T[]
        totalItems: number
      }>
    }
)

type State<T> = {
  loading: boolean
  data: T[]
  pageSize: number
  totalItems: number
  totalPages: number
  page: number
  sourceData?: T[]
  fetchData?: ({
    page,
    pageSize,
  }: {
    page: number
    pageSize: number
  }) => Promise<{ data: T[]; totalItems: number }>
}

type Action<T> =
  | { type: 'setPage'; page: number }
  | {
      type: 'setData'
      data: T[]
      totalItems: number
    }
  | { type: 'setPageSize'; pageSize: number; totalPages: number; page: number }
  | { type: 'setLoading'; loading: boolean }

export const usePagination = <T>(initialState: PaginationProps<T>) => {
  const reducer = (state: State<T>, action: Action<T>) => {
    switch (action.type) {
      case 'setPage':
        return { ...state, page: action.page }
      case 'setData':
        return {
          ...state,
          data: action.data,
          totalItems: action.totalItems,
          totalPages: Math.ceil(action.totalItems / state.pageSize),
        }
      case 'setPageSize':
        return {
          ...state,
          pageSize: action.pageSize,
          totalPages: action.totalPages,
          page: action.page,
        }
      case 'setLoading': // loading for ui purposes
        return {
          ...state,
          loading: action.loading,
        }
      default:
        throw new Error(`Invalid pagination action: ${action}`)
    }
  }
  const [
    {
      page,
      totalPages,
      fetchData,
      data,
      loading,
      pageSize,
      totalItems,
      sourceData,
    },
    dispatch,
  ] = useReducer(reducer, {
    ...initialState,
    page: 1,
    data: initialState.sourceData?.slice(0, initialState.pageSize + 1) || [],
    sourceData: initialState.sourceData,
    totalItems: initialState.sourceData ? initialState.sourceData.length : 0,
    loading: false,
    totalPages: 1,
  })

  const isWithinRange = (pgNum: number, pgs: number) => {
    return pgNum >= 1 && pgNum <= pgs
  }

  const setPage = (value: number) => {
    if (isWithinRange(value, totalPages)) {
      dispatch({ type: 'setPage', page: value })
    }
  }

  const setPageSize = (value: number) => {
    const newTotalPages = Math.ceil(totalItems / value)
    dispatch({
      type: 'setPageSize',
      pageSize: value,
      totalPages: newTotalPages,
      page: isWithinRange(page, newTotalPages) ? page : 1,
    })
  }

  useEffect(() => {
    if (fetchData) {
      dispatch({ type: 'setLoading', loading: true })
      fetchData({
        page,
        pageSize,
      }).then((res: { data: T[]; totalItems: number }) => {
        dispatch({
          type: 'setData',
          data: res.data,
          totalItems: res.totalItems,
        })
        dispatch({ type: 'setLoading', loading: false })
      })
    }
    if (sourceData) {
      const start = pageSize * (page - 1)
      const offset = page * pageSize
      dispatch({
        type: 'setData',
        data: sourceData.slice(start, offset),
        totalItems: sourceData.length,
      })
    }
  }, [page, pageSize])

  return {
    page,
    setPage,
    totalPages,
    pageSize,
    setPageSize,
    data,
    loading,
    totalItems,
  }
}
