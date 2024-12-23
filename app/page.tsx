'use client'

import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Heart, HelpCircle, Clock, Settings, MapPin, Plus, MoreHorizontal } from 'lucide-react'
import { ChatInput } from '@/components/chat-input'
import { ModelSelector } from '@/components/model-selector'
import { ChatListItem } from '@/components/chat-list-item'
import { ChatContainer } from '@/components/chat-container'
import { useSidebar } from '@/hooks/use-sidebar'
import { useChats } from '@/hooks/use-chats'
import { useLocation, useInitializeLocation } from '@/hooks/use-location'
import { cn, getGreeting } from '@/lib/utils'
import { Message } from '@/types/message'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ScrollArea } from "@/components/ui/scroll-area"
import SettingsMenu from '@/components/settings-menu'

// Create a store for glow effect settings
import { create } from 'zustand'

interface GlowEffectState {
  enabled: boolean
  color: string
  gradient?: string
  brightness: number
  speed: number
  radius: number
  updateSettings: (settings: Partial<Omit<GlowEffectState, 'updateSettings'>>) => void
}

const useGlowEffect = create<GlowEffectState>((set) => ({
  enabled: false,
  color: '#FF4500',
  brightness: 1,
  speed: 3,
  radius: 20,
  updateSettings: (settings) => set((state) => ({ ...state, ...settings })),
}))

const MENU_ITEMS = [
  { icon: Heart, label: 'Gem manager' },
  { icon: HelpCircle, label: 'Help' },
  { icon: Clock, label: 'Activity' },
  { icon: Settings, label: 'Settings' }
]

export default function Page() {
  const { isCollapsed, toggle } = useSidebar()
  const { chats, addChat } = useChats()
  const { location, isLoading: isLocationLoading } = useLocation()
  const [greeting, setGreeting] = useState(getGreeting())
  const [visibleChats, setVisibleChats] = useState(6)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const glowEffect = useGlowEffect()
  const [messages, setMessages] = useState<Message[]>([])
  const [isStreaming, setIsStreaming] = useState(false)

  useInitializeLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setGreeting(getGreeting())
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  const loadMoreChats = () => {
    setVisibleChats(prevVisible => Math.min(prevVisible + 20, chats.length))
  }

  const simulateStreamingResponse = async (prompt: string) => {
    // Add user message immediately
    const userMessage: Message = {
      id: Date.now().toString(),
      content: prompt,
      role: 'user',
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMessage])

    // Start streaming
    setIsStreaming(true)

    // Create AI message
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: '',
      role: 'assistant',
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, aiMessage])

    // Simulate streaming with the example response
    const response = `A Walk Through Time: The Fascinating World of Dinosaurs

Introduction

Dinosaurs, the colossal reptiles that once roamed the Earth, continue to captivate our imaginations. These prehistoric creatures, which existed millions of years ago, have left behind a legacy of wonder and mystery. From the towering sauropods to the ferocious tyrannosaurus, dinosaurs offer a glimpse into a world vastly different from our own.

The Reign of the Dinosaurs

The dinosaur era, spanning from the Triassic period (252 to 201 million years ago) to the Cretaceous period (145 to 66 million years ago), witnessed an extraordinary diversity of life. These creatures evolved into a wide range of shapes and sizes, adapting to various environments and ecological niches.

Major Dinosaur Groups

1. Theropods: Including the famous Tyrannosaurus Rex and Velociraptor, these were mostly carnivorous bipedal dinosaurs.
2. Sauropods: Long-necked herbivores like Brachiosaurus and Diplodocus, known for their massive size.
3. Ornithischians: Plant-eaters like Stegosaurus and Triceratops, with diverse defensive adaptations.

The End of an Era

The extinction of dinosaurs, approximately 66 million years ago, marked one of the most significant events in Earth's history. While many theories exist, the prevailing explanation involves a massive asteroid impact, which led to catastrophic global changes.

Legacy and Modern Science

Today, paleontologists continue to make remarkable discoveries, using advanced technology to uncover new species and better understand dinosaur biology, behavior, and evolution. These findings help us piece together the story of life on Earth and remind us of our planet's incredible history.`

    const words = response.split(' ')
    for (let i = 0; i < words.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 30)) // Adjust speed as needed
      setMessages(prev => {
        const newMessages = [...prev]
        const lastMessage = newMessages[newMessages.length - 1]
        if (lastMessage && lastMessage.role === 'assistant') {
          lastMessage.content = words.slice(0, i + 1).join(' ')
        }
        return newMessages
      })
    }

    setIsStreaming(false)
  }

  const handleSubmit = async (content: string) => {
    await simulateStreamingResponse(content)
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#1E1F20] text-white overflow-hidden">
      {/* Sidebar */}
      <aside className={cn(
        "bg-[#27282A] flex flex-col transition-all duration-300 ease-in-out overflow-hidden sidebar-transition",
        isCollapsed ? "w-[60px]" : "w-[300px]",
        "md:h-screen"
      )}>
        <div className={cn(
          "flex flex-col h-full transition-opacity duration-300",
          isCollapsed ? "opacity-100" : "opacity-100"
        )}>
          {/* Header */}
          <div className={cn(
            "p-4 flex items-center",
            !isCollapsed && "gap-4"
          )}>
            <TooltipProvider delayDuration={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="w-8 h-8 p-0 hover:bg-[#383838] transition-colors duration-200 flex items-center justify-center" 
                    onClick={toggle}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3 12h18M3 6h18M3 18h18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  side="right"
                  sideOffset={8}
                  className="bg-[#F9FAFB] text-[#1F2937] border-none shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                >
                  <p>Toggle sidebar</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            {!isCollapsed && <ModelSelector />}
          </div>

          {/* New Chat Button */}
          <div className="px-3 py-2">
            <TooltipProvider delayDuration={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    className={cn(
                      "bg-[#383838] hover:bg-[#404040] text-white transition-colors duration-200",
                      isCollapsed ? "w-full h-8 p-0 flex items-center justify-center" : "w-full justify-start gap-2 px-4 py-2"
                    )}
                    onClick={() => addChat({
                      id: Date.now().toString(),
                      title: 'New Chat',
                      timestamp: Date.now()
                    })}
                  >
                    <Plus className="w-5 h-5 shrink-0" />
                    {!isCollapsed && "New chat"}
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  side="right"
                  sideOffset={8}
                  className="bg-[#F9FAFB] text-[#1F2937] border-none shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                >
                  <p>Start new chat</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          {/* Chat List */}
          <ScrollArea className="flex-1 custom-scrollbar">
            {/* Pinned Chats */}
            {chats.some(chat => chat.isPinned) && (
              <div className="px-3 py-2">
                {!isCollapsed && (
                  <h2 className="px-3 text-sm font-medium text-gray-400">Pinned</h2>
                )}
                <div className="mt-2 space-y-1">
                  {chats.filter(chat => chat.isPinned).map((chat) => (
                    <ChatListItem
                      key={chat.id}
                      id={chat.id}
                      title={chat.title}
                      isCollapsed={isCollapsed}
                      isPinned={chat.isPinned}
                      isArchived={chat.isArchived}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Recent Chats */}
            <div className="px-3 py-2">
              {!isCollapsed && (
                <h2 className="px-3 text-sm font-medium text-gray-400">Recent</h2>
              )}
              <div className="mt-2 space-y-1">
                {chats.filter(chat => !chat.isPinned && !chat.isArchived).slice(0, visibleChats).map((chat) => (
                  <ChatListItem
                    key={chat.id}
                    id={chat.id}
                    title={chat.title}
                    isCollapsed={isCollapsed}
                    isPinned={chat.isPinned}
                    isArchived={chat.isArchived}
                  />
                ))}
                {chats.filter(chat => !chat.isPinned && !chat.isArchived).length > visibleChats && (
                  <Button
                    variant="ghost"
                    className="w-full text-sm text-gray-400 hover:bg-[#383838] transition-colors duration-200"
                    onClick={loadMoreChats}
                  >
                    <MoreHorizontal className="w-5 h-5" />
                    {!isCollapsed && "Load more"}
                  </Button>
                )}
              </div>
            </div>

            {/* Archived Chats */}
            {chats.some(chat => chat.isArchived) && (
              <div className="px-3 py-2">
                {!isCollapsed && (
                  <h2 className="px-3 text-sm font-medium text-gray-400">Archived</h2>
                )}
                <div className="mt-2 space-y-1">
                  {chats.filter(chat => chat.isArchived).map((chat) => (
                    <ChatListItem
                      key={chat.id}
                      id={chat.id}
                      title={chat.title}
                      isCollapsed={isCollapsed}
                      isPinned={chat.isPinned}
                      isArchived={chat.isArchived}
                    />
                  ))}
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Bottom Navigation */}
          <div className="mt-auto p-3 space-y-1">
            {MENU_ITEMS.map((item) => (
              <TooltipProvider key={item.label} delayDuration={50}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full transition-colors duration-200 hover:bg-[#383838]",
                        isCollapsed 
                          ? "h-8 p-0 flex items-center justify-center" 
                          : "justify-start gap-3 px-3 py-2"
                      )}
                      onClick={() => setIsSettingsOpen(true)}
                    >
                      <item.icon className="w-5 h-5 text-gray-400 shrink-0" />
                      {!isCollapsed && item.label}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent 
                    side="right"
                    sideOffset={8}
                    className="bg-[#F9FAFB] text-[#1F2937] border-none shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                  >
                    <p>{item.label}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Location */}
          {!isCollapsed && (
            <div 
              className={cn(
                "p-4 text-sm text-gray-400 transition-all duration-300 delay-150",
                "opacity-0 translate-y-4",
                !isCollapsed && "opacity-100 translate-y-0"
              )}
            >
              {isLocationLoading ? (
                <div className="animate-pulse">
                  <div className="h-4 w-32 bg-gray-700 rounded" />
                  <div className="mt-1 h-3 w-24 bg-gray-700 rounded" />
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {location}
                  </div>
                  <div className="mt-1 text-xs">
                    <span className="hover:underline cursor-pointer">From your IP address</span>
                    {" · "}
                    <span className="hover:underline cursor-pointer">Update location</span>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <div className="flex items-center justify-end p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="text-sm bg-[#2D2E2F] hover:bg-[#383838] text-white border-[#383838] gap-2 transition-all duration-200 rounded-2xl px-6"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 text-rose-400"
                fill="currentColor"
              >
                <path d="M12 17L6.12132 11.1213L7.53553 9.70711L12 14.1716L16.4645 9.70711L17.8787 11.1213L12 17Z" />
              </svg>
              Try Gemini Advanced
            </Button>
            <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center">
              S
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <h1 className="text-2xl md:text-4xl font-semibold text-center">
                <span className="bg-gradient-to-r from-[#8AB4F8] to-[#F28B82] bg-clip-text text-transparent animate-gradient">
                  {greeting}, Shashank
                </span>
              </h1>
            </div>
          ) : (
            <ChatContainer messages={messages} isStreaming={isStreaming} />
          )}
        </div>

        {/* Input Area */}
        <div className="p-4">
          <ChatInput 
            glowEffect={glowEffect} 
            onSubmit={handleSubmit}
            isStreaming={isStreaming}
          />
          <div className="mt-4 text-center text-xs text-gray-400">
            <div className="inline-flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {isLocationLoading ? (
                <span className="animate-pulse">Loading location...</span>
              ) : (
                location
              )}
            </div>
          </div>
        </div>
      </main>

      <SettingsMenu 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)}
        onUpdateGlowEffect={glowEffect.updateSettings}
        glowEffect={glowEffect}
      />
    </div>
  )
}

