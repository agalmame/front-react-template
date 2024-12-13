import React from 'react'
import { Toast as ToastType } from './types'

interface ToastProps extends ToastType {
  onClose: (id: string) => void
}

const bgColors = {
  info: 'bg-blue-500',
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500'
}

export const Toast: React.FC<ToastProps> = ({ id, message, type, onClose }) => {
  return (
    <div
      className={`${bgColors[type]} text-white p-4 rounded-lg shadow-lg flex justify-between items-center mb-2 min-w-[300px] animate-slideIn`}
      role="alert"
    >
      <p className="font-medium">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="ml-4 text-white hover:text-gray-200 focus:outline-none"
        aria-label="Close"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  )
}
