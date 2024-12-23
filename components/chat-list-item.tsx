'use client'

import * as React from 'react'
import { Monitor, MoreVertical, Pin, Pencil, Trash2, Archive } from 'lucide-react'
import Link from "next/link"
import { cn } from '@/lib/utils'
import { useChats } from '@/hooks/use-chats'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ChatListItemProps {
  id: string
  title: string
  isCollapsed?: boolean
  isPinned: boolean
  isArchived: boolean
}

export function ChatListItem({ id, title, isCollapsed, isPinned, isArchived }: ChatListItemProps) {
  const [isRenaming, setIsRenaming] = React.useState(false)
  const [newTitle, setNewTitle] = React.useState(title)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { removeChat, pinChat, unpinChat, archiveChat, unarchiveChat, renameChat } = useChats()

  const handleRename = () => {
    if (newTitle.trim()) {
      renameChat(id, newTitle)
      setIsRenaming(false)
    }
  }

  const startRenaming = () => {
    setIsRenaming(true)
    setNewTitle(title)
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus()
        inputRef.current.select()
      }
    }, 0)
  }

  return (
    <div className="group relative flex items-center">
      <Link
        href="#"
        className={cn(
          "flex flex-1 items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-[#383838] transition-colors duration-200",
          isCollapsed && "justify-center px-0"
        )}
      >
        <Monitor className="w-5 h-5 text-gray-400 shrink-0" />
        {!isCollapsed && (
          isRenaming ? (
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onBlur={handleRename}
              onKeyDown={(e) => e.key === 'Enter' && handleRename()}
              className="bg-transparent border-none outline-none flex-1 text-white"
            />
          ) : (
            <span className="truncate">{title}</span>
          )
        )}
      </Link>

      {!isCollapsed && !isRenaming && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:bg-[#4A4A4A] transition-all duration-200 absolute right-2"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-48 bg-[#2D2D2D] border-[#383838] text-white"
          >
            <DropdownMenuItem onClick={() => isPinned ? unpinChat(id) : pinChat(id)}>
              <Pin className="mr-2 h-4 w-4" />
              <span>{isPinned ? 'Unpin' : 'Pin'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={startRenaming}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Rename</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => isArchived ? unarchiveChat(id) : archiveChat(id)}>
              <Archive className="mr-2 h-4 w-4" />
              <span>{isArchived ? 'Unarchive' : 'Archive'}</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => removeChat(id)} className="text-red-400">
              <Trash2 className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}

