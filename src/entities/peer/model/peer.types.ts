export interface RemotePeer {
  userId: string
  audioStream?: MediaStream
  videoStream?: MediaStream
  isSpeaking?: boolean
}
