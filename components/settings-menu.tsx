'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"

const settingsCategories = [
  { id: 'account', label: 'Account' },
  { id: 'profile', label: 'Profile' },
  { id: 'preferences', label: 'Preferences' },
  { id: 'appearance', label: 'Appearance' },
  { id: 'advanced', label: 'Advanced' },
]

interface GlowEffect {
  enabled: boolean;
  color: string;
  gradient?: string;
  brightness: number;
  speed: number;
  radius: number;
}

interface SettingsMenuProps {
  isOpen: boolean
  onClose: () => void
  glowEffect: GlowEffect
  onUpdateGlowEffect: (settings: Partial<GlowEffect>) => void
}

export default function SettingsMenu({ isOpen, onClose, glowEffect, onUpdateGlowEffect }: SettingsMenuProps) {
  const [activeCategory, setActiveCategory] = useState('appearance')
  const [theme, setTheme] = useState('dark')


  const handleGlowEffectChange = (key: string, value: any) => {
    onUpdateGlowEffect({ [key]: value })
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] bg-[#27282A] text-white border-[#383838]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription className="text-gray-400">
            Manage your account settings and preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="flex h-full py-6">
          <Tabs defaultValue="appearance" className="flex flex-col sm:flex-row h-full w-full">
            <TabsList className="h-full justify-start sm:flex-col bg-[#1E1F20] p-2">
              {settingsCategories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="w-full justify-start text-left hover:bg-[#383838] data-[state=active]:bg-[#383838] transition-colors duration-200"
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="flex-1 pl-0 sm:pl-6">
              <ScrollArea className="h-[60vh]">
                <TabsContent value="appearance" className="mt-0 border-0 p-0">
                  <div className="space-y-6">
                    {/* Theme Section */}
                    <div>
                      <h3 className="text-lg font-medium">Theme</h3>
                      <p className="text-sm text-gray-400">
                        Customize the appearance of the application
                      </p>
                      <RadioGroup defaultValue="dark" onValueChange={setTheme} className="mt-4">
                        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3">
                          {['dark', 'light', 'device', 'dynamic', 'custom'].map((option) => (
                            <div key={option}>
                              <RadioGroupItem
                                value={option}
                                id={`theme-${option}`}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={`theme-${option}`}
                                className="flex flex-col items-center justify-between rounded-md border-2 border-[#383838] bg-[#1E1F20] p-4 hover:bg-[#383838] hover:text-white peer-data-[state=checked]:border-white [&:has([data-state=checked])]:border-white"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 mb-3"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Glow Effect Section */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Input Glow Effect</h3>
                      <p className="text-sm text-gray-400">
                        Customize the glowing effect around the chat input
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <Label htmlFor="glow-toggle">Enable glow effect</Label>
                        <Switch
                          id="glow-toggle"
                          checked={glowEffect.enabled}
                          onCheckedChange={(checked) => handleGlowEffectChange('enabled', checked)}
                        />
                      </div>

                      {glowEffect.enabled && (
                        <div className="space-y-4 mt-4">
                          <div className="space-y-2">
                            <Label>Color Mode</Label>
                            <RadioGroup
                              value={glowEffect.gradient ? 'gradient' : 'solid'}
                              onValueChange={(value) => handleGlowEffectChange('gradient', value === 'gradient')}
                            >
                              <div className="flex gap-4">
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="solid" id="solid" />
                                  <Label htmlFor="solid">Solid Color</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="gradient" id="gradient" />
                                  <Label htmlFor="gradient">Gradient</Label>
                                </div>
                              </div>
                            </RadioGroup>
                          </div>

                          {glowEffect.gradient ? (
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <Label>Gradient Start</Label>
                                <Input
                                  type="color"
                                  value={glowEffect.color}
                                  onChange={(e) => handleGlowEffectChange('color', e.target.value)}
                                  className="h-10 p-1 bg-[#1E1F20]"
                                />
                              </div>
                              <div>
                                <Label>Gradient End</Label>
                                <Input
                                  type="color"
                                  value={glowEffect.gradient}
                                  onChange={(e) => handleGlowEffectChange('gradient', e.target.value)}
                                  className="h-10 p-1 bg-[#1E1F20]"
                                />
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Label>Color</Label>
                              <Input
                                type="color"
                                value={glowEffect.color}
                                onChange={(e) => handleGlowEffectChange('color', e.target.value)}
                                className="w-full h-10 p-1 bg-[#1E1F20]"
                              />
                            </div>
                          )}

                          <div className="space-y-2">
                            <Label>Brightness</Label>
                            <Slider
                              min={0.1}
                              max={2}
                              step={0.1}
                              value={[glowEffect.brightness]}
                              onValueChange={([value]) => handleGlowEffectChange('brightness', value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Animation Speed (seconds)</Label>
                            <Slider
                              min={1}
                              max={10}
                              step={0.5}
                              value={[glowEffect.speed]}
                              onValueChange={([value]) => handleGlowEffectChange('speed', value)}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label>Glow Radius</Label>
                            <Slider
                              min={10}
                              max={50}
                              step={1}
                              value={[glowEffect.radius]}
                              onValueChange={([value]) => handleGlowEffectChange('radius', value)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </ScrollArea>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}

