import { createContext, useContext, useReducer } from 'react'

export type StoreContext = ReturnType<typeof useStoreValue>

export type StoreState = typeof initialState

export type StoreAction = {
  type: string
  payload?: any
}

const StoreContext = createContext<StoreContext | undefined>(undefined)
StoreContext.displayName = 'StoreContext'

const initialState = {
  audioLevel: 0,
}

const reducer = (state: StoreState, action: StoreAction) => {
  switch (action.type) {
    case 'FETCH_AUDIO_LEVEL':
      state.audioLevel = parseInt(
        localStorage.getItem('audioLevel') !== null
          ? (localStorage.getItem('audioLevel') as string)
          : '0',
        10,
      )
      return state

    case 'UPDATE_AUDIO_LEVEL':
      localStorage.setItem('audioLevel', action.payload as string)
      state.audioLevel = action.payload
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
