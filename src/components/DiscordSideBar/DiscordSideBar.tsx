import { useRef } from 'react'
import type { ReactElement, PointerEvent as ReactPointerEvent } from 'react'

type SideBarItem = {
  name: string
  icon: ReactElement
}

type DiscordSideBarProps = {
  items: SideBarItem[]
  activeItem: string
  onSelect: (name: string) => void
  width: number
  height: number
  onResize: (size: { width: number; height: number }) => void
}

const MIN_WIDTH = 80
const MAX_WIDTH = 320
const MIN_HEIGHT = 180
const MAX_HEIGHT = 720

function DiscordSideBar({ items, activeItem, onSelect, width, height, onResize }: DiscordSideBarProps) {
  const resizeState = useRef<{
    startX: number
    startY: number
    startWidth: number
    startHeight: number
  } | null>(null)

  const handlePointerMove = (event: PointerEvent) => {
    if (!resizeState.current) {
      return
    }

    const nextWidth = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, resizeState.current.startWidth + (event.clientX - resizeState.current.startX)),
    )
    const nextHeight = Math.min(
      MAX_HEIGHT,
      Math.max(MIN_HEIGHT, resizeState.current.startHeight + (event.clientY - resizeState.current.startY)),
    )

    onResize({ width: nextWidth, height: nextHeight })
  }

  const stopResizing = () => {
    resizeState.current = null
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerup', stopResizing)
  }

  const startResizing = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.preventDefault()

    resizeState.current = {
      startX: event.clientX,
      startY: event.clientY,
      startWidth: width,
      startHeight: height,
    }

    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', stopResizing)
  }

  return (
    <div
      className="discordSidebar fixed top-0 left-0 flex flex-col overflow-visible rounded-tr-lg rounded-br-lg bg-gray-800 text-white shadow-lg"
      style={{ width, height }}
    >
      <div className="discordSidebarHeader border-b border-white/10 px-2 py-3 text-center text-white/70">
        <h2 className="w-full text-[8px] font-semibold uppercase leading-none tracking-[0.04em]">
          Components
        </h2>
      </div>
      <ul className="discordSidebarMenu sidebarGrid mt-4 flex-1 overflow-visible px-2 pb-4">
        {items.map((item) => (
          <li key={item.name} className="flex justify-center">
            <button
              type="button"
              onClick={() => onSelect(item.name)}
              className={`sidebarIcon group ${activeItem === item.name ? 'sidebarIconActive' : ''}`}
              aria-label={item.name}
              aria-pressed={activeItem === item.name}
            >
              {item.icon}

              <span className="sidebarTooltip group-hover:scale-100 group-focus-visible:scale-100">
                {item.name}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <button
        type="button"
        aria-label="Resize sidebar"
        onPointerDown={startResizing}
        className="sidebarResizeHandle"
      />
    </div>
  )
}

export default DiscordSideBar