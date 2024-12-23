import { useEffect, useRef, useState } from "react"
import { Message } from "@/types/message"
import { ChatMessage } from "./chat-message"
import { Button } from "./ui/button"
import { ChevronDown } from 'lucide-react'
import { cn } from "@/lib/utils"

interface ChatContainerProps {
  messages: Message[]
  isStreaming?: boolean
}

export function ChatContainer({ messages, isStreaming }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showScrollButton, setShowScrollButton] = useState(false)
  const [userHasScrolled, setUserHasScrolled] = useState(false)
  const lastScrollPositionRef = useRef(0)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Handle auto-scrolling
  useEffect(() => {
    if (!userHasScrolled && containerRef.current) {
      scrollToBottom('auto')
    }
  }, [messages, isStreaming])

  // Detect user scroll vs programmatic scroll
  const onScroll = () => {
    if (!containerRef.current) return
    
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current
    const isAtBottom = Math.abs(scrollHeight - scrollTop - clientHeight) < 10
    const hasScrolledUp = lastScrollPositionRef.current > scrollTop
    
    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set a timeout to determine if this is a user scroll
    scrollTimeoutRef.current = setTimeout(() => {
      if (hasScrolledUp) {
        setUserHasScrolled(true)
      }
      if (isAtBottom) {
        setUserHasScrolled(false)
      }
    }, 150)

    lastScrollPositionRef.current = scrollTop
    setShowScrollButton(!isAtBottom)
  }

  const scrollToBottom = (behavior: 'smooth' | 'auto' = 'smooth') => {
    if (!containerRef.current) return
    
    containerRef.current.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: behavior
    })
    
    setShowScrollButton(false)
    setUserHasScrolled(false)
  }

  return (
    <div className="relative flex-1 w-full max-w-4xl mx-auto">
      <div 
        ref={containerRef}
        onScroll={onScroll}
        className="h-full w-full overflow-y-auto space-y-4 custom-scrollbar pb-32"
      >
        {messages.map((message) => (
          <ChatMessage 
            key={message.id} 
            message={message}
            isStreaming={isStreaming && message.id === messages[messages.length - 1]?.id}
          />
        ))}
      </div>

      {/* Scroll to bottom button */}
      <div 
        className={cn(
          "fixed bottom-32 right-8 transition-all duration-200 z-50",
          showScrollButton 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <Button
          size="icon"
          onClick={() => scrollToBottom('smooth')}
          className="h-10 w-10 rounded-full shadow-lg bg-[#383838] hover:bg-[#404040] text-white border border-[#4A4A4A]"
        >
          <ChevronDown className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}

