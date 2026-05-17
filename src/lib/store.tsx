import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

type State = {
  audio: number
  playerCharacter: PlayerCharacter
  setAudio: (val: number) => void
  setPlayerCharacter: (val: PlayerCharacter) => void
}

export type PlayerCharacter = 'mario' | 'luigi'

export const useStore = create<State>()(
  devtools(
    persist(
      (set) => ({
        audio: 0,
        playerCharacter: 'mario',
        setAudio: (val) => set(() => ({ audio: val })),
        setPlayerCharacter: (val) => set(() => ({ playerCharacter: val })),
      }),
      {
        name: 'app',
      }
    )
  )
)
