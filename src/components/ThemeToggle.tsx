import { useEffect, useState } from 'react'
import { Button, Dropdown, Label } from '@heroui/react'
import { Monitor, Moon, Sun } from 'lucide-react'

type ThemeMode = 'light' | 'dark' | 'auto'
type ResolvedTheme = 'light' | 'dark'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'

  const stored = window.localStorage.getItem('theme')
  if (stored === 'light' || stored === 'dark' || stored === 'auto')
    return stored

  return 'auto'
}

function resolveTheme(mode: ThemeMode): ResolvedTheme {
  if (mode !== 'auto') return mode
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyThemeMode(mode: ThemeMode) {
  const resolved = resolveTheme(mode)

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)

  if (mode === 'auto') document.documentElement.removeAttribute('data-theme')
  else document.documentElement.setAttribute('data-theme', mode)

  document.documentElement.style.colorScheme = resolved
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>('auto')
  const [resolved, setResolved] = useState<ResolvedTheme>('light')

  useEffect(() => {
    const initialMode = getInitialMode()
    setMode(initialMode)
    setResolved(resolveTheme(initialMode))
    applyThemeMode(initialMode)
  }, [])

  useEffect(() => {
    if (mode !== 'auto') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      applyThemeMode('auto')
      setResolved(resolveTheme('auto'))
    }

    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  function handleThemeChange(key: React.Key) {
    const next = key as ThemeMode
    setMode(next)
    setResolved(resolveTheme(next))
    applyThemeMode(next)
    window.localStorage.setItem('theme', next)
  }

  const Icon = resolved === 'dark' ? Moon : Sun

  return (
    <Dropdown>
      <Button variant="ghost" size="sm" isIconOnly aria-label="Toggle theme">
        <Icon size={16} />
      </Button>
      <Dropdown.Popover isNonModal>
        <Dropdown.Menu onAction={handleThemeChange}>
          <Dropdown.Item id="light" textValue="Light">
            <Sun size={14} />
            <Label>Light</Label>
          </Dropdown.Item>
          <Dropdown.Item id="dark" textValue="Dark">
            <Moon size={14} />
            <Label>Dark</Label>
          </Dropdown.Item>
          <Dropdown.Item id="auto" textValue="System">
            <Monitor size={14} />
            <Label>System</Label>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}
