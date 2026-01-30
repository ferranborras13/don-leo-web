export interface Message {
  id: string
  role: 'user' | 'leo'
  content: string
  timestamp: Date
}

export interface UploadedImage {
  id: string
  url: string
  file: File
}

export interface RizzMode {
  id: string
  name: string
  variant: 'cream' | 'pink' | 'lavender' | 'mint'
  fullWidth?: boolean
}

export interface RizzResponse {
  id: string
  mode: string
  content: string
}

export interface ChatState {
  messages: Message[]
  sendMessage: (content: string) => void
  isLoading: boolean
}
