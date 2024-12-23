'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useModels } from '@/hooks/use-models'

const MODEL_VERSIONS: Record<string, string> = {
  'gemini-pro': '1.5 Flash',
  'gemini-pro-vision': '1.5 Vision',
  'gemini-ultra': '2.0 Ultra'
}

export function ModelSelector() {
  const [open, setOpen] = React.useState(false)
  const { models, selectedModel, selectModel } = useModels()

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between bg-[#27282A] text-white border-[#383838] hover:bg-[#383838]"
        >
          {selectedModel.name}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 bg-[#27282A] border-[#383838]">
        <Command>
          <CommandInput placeholder="Search model..." className="h-9 text-white" />
          <CommandEmpty>No model found.</CommandEmpty>
          <CommandGroup>
            {models.map((model) => (
              <CommandItem
                key={model.id}
                value={model.name}
                onSelect={() => {
                  selectModel(model.id)
                  setOpen(false)
                }}
                className="text-white hover:bg-[#383838]"
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedModel.id === model.id ? "opacity-100" : "opacity-0"
                  )}
                />
                {model.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

