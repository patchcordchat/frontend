const sounds = import.meta.glob('./**/*.{mp3,wav,ogg}', { eager: true, import: 'default' })

export const SOUND_MAP: Record<string, string> = Object.entries(sounds).reduce(
  (acc, [path, url]) => {
    const fileName = path.split('/').pop()?.split('.')[0]

    if (fileName && typeof url === 'string') {
      acc[fileName] = url
    }
    return acc
  },
  {} as Record<string, string>,
)

export type SoundName = keyof typeof SOUND_MAP
