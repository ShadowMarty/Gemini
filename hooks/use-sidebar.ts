'use client'

import { create } from 'zustand'

interface SidebarState {
  isCollapsed: boolean
  toggle: () => void
}

export const useSidebar = create<SidebarState>((set) => ({
  isCollapsed: false,
  toggle: () => set((state) => ({ isCollapsed: !state.isCollapsed })),
}))

