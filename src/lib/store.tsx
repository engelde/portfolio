import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  audio: number
  setAudio: (val: number) => void
}

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        audio: 0,
        setAudio: (val) => set(() => ({ audio: val })),
      }),
      {
        name: 'app',
      }
    )
  )
)
