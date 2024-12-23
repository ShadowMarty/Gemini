'use client'

import { create } from 'zustand'
import { Model } from '@/types/chat'

interface ModelsState {
  models: Model[]
  selectedModel: Model
  addCustomModel: (model: Model) => void
  selectModel: (id: string) => void
}

export const useModels = create<ModelsState>((set) => ({
  models: [
    { id: 'gemini-pro', name: 'Gemini Pro' },
    { id: 'gemini-pro-vision', name: 'Gemini Pro Vision' },
    { id: 'gemini-ultra', name: 'Gemini Ultra' },
  ],
  selectedModel: { id: 'gemini-pro', name: 'Gemini Pro' },
  addCustomModel: (model) => set((state) => ({ models: [...state.models, model] })),
  selectModel: (id) => set((state) => ({
    selectedModel: state.models.find((m) => m.id === id) || state.selectedModel
  })),
}))

