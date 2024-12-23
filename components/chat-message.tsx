import { Message } from "@/types/message"
import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

interface ChatMessageProps {
  message: Message
  isStreaming?: boolean
}

export function ChatMessage({ message, isStreaming }: ChatMessageProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current && isStreaming) {
      containerRef.current.scrollIntoView({ behavior: "smooth", block: "end" })
    }
  }, [message.content, isStreaming])

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex flex-col gap-2 px-4 py-3 rounded-lg animate-in fade-in-0 duration-300",
        message.role === "user" ? "bg-[#383838]/50" : "bg-transparent"
      )}
    >
      <div className="flex items-center gap-2">
        <div className={cn(
          "w-6 h-6 rounded-full flex items-center justify-center text-xs",
          message.role === "user" ? "bg-purple-500" : "bg-blue-500"
        )}>
          {message.role === "user" ? "U" : "A"}
        </div>
        <span className="text-sm text-gray-400">
          {new Date(message.timestamp).toLocaleTimeString()}
        </span>
      </div>
      <div 
        className={cn(
          "text-white/90 leading-relaxed whitespace-pre-wrap pl-8",
          "animate-in fade-in-0 slide-in-from-top-4 duration-700"
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

