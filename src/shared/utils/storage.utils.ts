import { mediaConfig } from '@/shared/config'

export const StoragePaths = {
  userAvatar: (userId: string, hash: string) => `${mediaConfig.mediaUrl}/avatars/${userId}/${hash}`,

  serverIcon: (serverId: string, hash: string) =>
    `${mediaConfig.mediaUrl}/icons/${serverId}/${hash}`,

  channelIcon: (channelId: string, hash: string) =>
    `${mediaConfig.mediaUrl}/channels/${channelId}/icons/${hash}`,

  defaultUserAvatar: (userId: string) => `${mediaConfig.mediaUrl}/embed/avatars/${userId}.png`,

  attachment: (channelId: string, attachmentId: string, filename: string) =>
    `${mediaConfig.mediaUrl}/attachments/${channelId}/${attachmentId}/${filename}`,
}
