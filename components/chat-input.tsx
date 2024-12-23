'use client'

import { useState, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mic, Send, Paperclip } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GlowEffect {
  enabled: boolean
  color: string
  gradient?: string
  brightness: number
  speed: number
  radius: number
}

interface ChatInputProps {
  glowEffect?: GlowEffect
  placeholder?: string
  onSubmit: (content: string) => Promise<void>
  isStreaming?: boolean
}

export function ChatInput({ glowEffect, placeholder = "Ask Gemini...", onSubmit, isStreaming }: ChatInputProps) {
  const [content, setContent] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleInput = () => {
    if (textareaRef.current && content.includes('\n')) {
      textareaRef.current.style.height = 'auto'
      const scrollHeight = textareaRef.current.scrollHeight
      const maxHeight = window.innerHeight / 4
      textareaRef.current.style.height = `${Math.min(scrollHeight, maxHeight)}px`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value)
    if (e.target.value === '') {
      e.target.style.height = '40px'
    }
  }

  const handleSubmit = async () => {
    if (!content.trim() || isStreaming) return
    
    await onSubmit(content.trim())
    setContent('')
    if (textareaRef.current) {
      textareaRef.current.style.height = '40px'
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="relative w-full max-w-[75%] mx-auto transition-all duration-300">
      {/* Base glow layer */}
      <div className="absolute -inset-3 bg-gradient-to-r from-orange-600/20 via-purple-600/20 to-orange-600/20 rounded-3xl blur-xl animate-border-flow"></div>
      
      {/* Particle layers */}
      <div className="absolute -inset-3 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-particles-1 bg-particle-sm animate-particles-1"></div>
        <div className="absolute inset-0 bg-particles-2 bg-particle-md animate-particles-2"></div>
        <div className="absolute inset-0 bg-particles-3 bg-particle-lg animate-particles-3"></div>
      </div>
      
      {/* Emissive glow layer */}
      <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/30 via-purple-500/30 to-orange-500/30 rounded-2xl blur-sm animate-glow mix-blend-screen"></div>
      
      {/* Input container */}
      <Card className="relative bg-[#27282A] shadow-lg border-0 z-[1]">
        <div className="flex items-center gap-2 p-2">
          <TooltipProvider delayDuration={50}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="text-gray-400 hover:bg-[#383838] transition-all duration-200 group"
                >
                  <Paperclip className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                </Button>
              </TooltipTrigger>
              <TooltipContent 
                sideOffset={8}
                className="bg-[#F9FAFB] text-[#1F2937] border-none shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
              >
                <p>Attach file</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <textarea
            ref={textareaRef}
            placeholder={placeholder}
            value={content}
            onChange={handleChange}
            onInput={handleInput}
            onKeyDown={handleKeyDown}
            disabled={isStreaming}
            className="flex-1 bg-transparent border-0 outline-none resize-none text-white placeholder-gray-400 text-sm leading-6 py-[7px] min-h-[40px] transition-all duration-200 custom-scrollbar disabled:opacity-50"
            style={{ 
              height: '40px'
            }}
          />
          
          <div className="flex items-center gap-2">
            <TooltipProvider delayDuration={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="text-gray-400 hover:bg-[#383838] transition-all duration-200 group"
                  >
                    <Mic className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  sideOffset={8}
                  className="bg-[#F9FAFB] text-[#1F2937] border-none shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                >
                  <p>Voice input</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider delayDuration={50}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    size="icon" 
                    variant="ghost"
                    className="text-gray-400 hover:bg-[#383838] transition-all duration-200 group"
                    onClick={handleSubmit}
                    disabled={!content.trim() || isStreaming}
                  >
                    <Send className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent 
                  sideOffset={8}
                  className="bg-[#F9FAFB] text-[#1F2937] border-none shadow-lg animate-in fade-in-0 zoom-in-95 duration-200"
                >
                  <p>Send message</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </Card>
    </div>
  )
}

