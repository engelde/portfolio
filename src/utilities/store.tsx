import { createContext, useContext, useReducer } from 'react'

export type StoreContext = ReturnType<typeof useStoreValue>

export type StoreState = typeof initialState

export type StoreAction = {
  type: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any
}

const StoreContext = createContext<StoreContext | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

const initialState = {
  audio: 0,
}

const reducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case 'FETCH_AUDIO':
      state.audio = parseInt(
        localStorage.getItem('audio') !== null ? (localStorage.getItem('audio') as string) : '0',
        10,
      )
      return state

    case 'UPDATE_AUDIO':
      localStorage.setItem('audio', action.payload as string)
      state.audio = action.payload as number
      return state

    default:
      return state
  }
}

const useStoreValue = () => {
  return useReducer(reducer, initialState)
}

export const useStore = () => {
  const value = useContext(StoreContext)
  if (value === undefined) {
    throw new Error('useStore must be used within a StoreProvider')
  }
  return value
}

export function StoreProvider<T>(props: T) {
  const value = useStoreValue()
  return <StoreContext.Provider value={value} {...props} />
}
