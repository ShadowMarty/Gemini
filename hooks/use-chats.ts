'use client'

import { create } from 'zustand'
import { Chat } from '@/types/chat'

interface ChatsState {
  chats: Chat[]
  addChat: (chat: Chat) => void
  removeChat: (id: string) => void
  pinChat: (id: string) => void
  unpinChat: (id: string) => void
  archiveChat: (id: string) => void
  unarchiveChat: (id: string) => void
  renameChat: (id: string, newTitle: string) => void
}

export const useChats = create<ChatsState>((set) => ({
  chats: [
    { id: '1', title: 'Dinosaur Essay and Discussion', timestamp: Date.now() - 4000, isPinned: false, isArchived: false },
    { id: '2', title: 'Gemini Introduces Itself', timestamp: Date.now() - 3000, isPinned: false, isArchived: false },
    { id: '3', title: 'Secure Password Hashing in ...', timestamp: Date.now() - 2000, isPinned: false, isArchived: false },
    { id: '4', title: 'A Poem for Mr. Mystery', timestamp: Date.now() - 1000, isPinned: false, isArchived: false },
  ],
  addChat: (chat) => set((state) => ({ chats: [chat, ...state.chats] })),
  removeChat: (id) => set((state) => ({ chats: state.chats.filter((chat) => chat.id !== id) })),
  pinChat: (id) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === id ? { ...chat, isPinned: true } : chat
    ),
  })),
  unpinChat: (id) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === id ? { ...chat, isPinned: false } : chat
    ),
  })),
  archiveChat: (id) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === id ? { ...chat, isArchived: true } : chat
    ),
  })),
  unarchiveChat: (id) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === id ? { ...chat, isArchived: false } : chat
    ),
  })),
  renameChat: (id, newTitle) => set((state) => ({
    chats: state.chats.map((chat) =>
      chat.id === id ? { ...chat, title: newTitle } : chat
    ),
  })),
}))

