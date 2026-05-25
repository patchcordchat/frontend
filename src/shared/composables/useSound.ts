import { SOUND_MAP, type SoundName } from '@/shared/assets/sounds'

export const useSound = () => {
  const play = (name: SoundName, options?: { volume?: number; loop?: boolean }) => {
    const url = SOUND_MAP[name]

    if (!url) {
      console.error(`Sound "${String(name)}" not found in registry.`)
      return
    }

    const audio = new Audio(url)
    audio.volume = options?.volume ?? 0.5
    audio.loop = options?.loop ?? false

    audio.play().catch((err) => {
      if (err.name !== 'NotAllowedError') {
        console.warn('Playback error:', err)
      }
    })

    return audio
  }

  return { play, availableSounds: Object.keys(SOUND_MAP) }
}
