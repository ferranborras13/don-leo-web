import { Message, RizzResponse } from "@/types"

export const mockMessages: Message[] = [
  {
    id: "1",
    role: "leo",
    content: "Hey! I'm DonLeo, your personal wingman. What can I help you with today?",
    timestamp: new Date(Date.now() - 60000 * 5),
  },
  {
    id: "2",
    role: "user",
    content: "I need help with a reply to this girl I'm talking to...",
    timestamp: new Date(Date.now() - 60000 * 4),
  },
  {
    id: "3",
    role: "leo",
    content: "Of course! Share the conversation screenshot and I'll give you some solid options.",
    timestamp: new Date(Date.now() - 60000 * 3),
  },
]

export const mockRizzResponses: RizzResponse[] = [
  {
    id: "1",
    mode: "Smooth & Direct",
    content: "I've been enjoying our conversations - would you want to grab a drink this weekend?",
  },
  {
    id: "2",
    mode: "Funny & Cheesy",
    content: "Are you a magician? Because whenever I look at your photos, everyone else disappears ✨",
  },
  {
    id: "3",
    mode: "Short & Punchy",
    content: "You've got great taste in music 🎵",
  },
  {
    id: "4",
    mode: "Nerd / Pop Culture",
    content: "That's totally something Ted Lasso would say. Are you secretly a fan too?",
  },
  {
    id: "5",
    mode: "Savage & Witty",
    content: "Bold of you to assume I have plans this weekend. So... what are we doing?",
  },
]

export const mockUserProfile = {
  name: "Alex",
  email: "alex@example.com",
  avatar: "/api/placeholder/100/100",
  subscription: "free",
}

export const wingmanFeatures = [
  {
    id: "analyze",
    title: "I'll translate the subtext",
    description: "Screenshots in. Meaning out. (Yes, even that 'haha'.)",
    variant: "cream" as const,
    icon: "Search",
  },
  {
    id: "replies",
    title: "3 replies. Zero panic.",
    description: "Pick the vibe: smooth, funny, savage... you stay you. From 'left on read' to 'damn.'",
    variant: "pink" as const,
    icon: "MessageSquare",
  },
  {
    id: "rewrite",
    title: "Upgrade your draft",
    description: "Same message, upgraded delivery. No cringe tax.",
    variant: "lavender" as const,
    icon: "Edit",
  },
  {
    id: "thinking",
    title: "What's the play here?",
    description: "I'll map the next move so you don't fumble the moment.",
    variant: "mint" as const,
    icon: "Brain",
  },
]

export const rizzModes = [
  {
    id: "smooth",
    name: "Smooth & Direct",
    variant: "cream" as const,
  },
  {
    id: "funny",
    name: "Funny & Cheesy",
    variant: "pink" as const,
  },
  {
    id: "short",
    name: "Short & Punchy",
    variant: "lavender" as const,
  },
  {
    id: "nerd",
    name: "Nerd / Pop Culture",
    variant: "mint" as const,
  },
  {
    id: "savage",
    name: "Savage & Witty",
    variant: "ice" as const,
    fullWidth: true,
  },
]
