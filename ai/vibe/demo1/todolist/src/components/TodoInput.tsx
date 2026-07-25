import { useState, type KeyboardEvent } from 'react'

interface Props {
  onAdd: (text: string) => void
}

export default function TodoInput({ onAdd }: Props) {
  const [value, setValue] = useState('')
  const trimmed = value.trim()
  const canSubmit = trimmed.length > 0

  const handleSubmit = () => {
    if (!canSubmit) return
    onAdd(trimmed)
    setValue('')
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div className="mb-6 flex gap-2">
      <input
        type="text"
        className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-base outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        placeholder="输入新待办..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        className="cursor-pointer rounded-lg bg-blue-500 px-5 py-2 text-sm text-white transition-colors hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-300"
        disabled={!canSubmit}
        onClick={handleSubmit}
      >
        添加
      </button>
    </div>
  )
}
