"use client"
import React from 'react'

interface ProgressBarProps {
  progress: number
  className?: string
}

export default function ProgressBar({ progress, className = '' }: ProgressBarProps) {
  // Ensure progress is between 0 and 100
  const clampedProgress = Math.min(Math.max(progress, 0), 100)

  return (
    <div className={`h-3 w-full bg-purple-300 rounded-full ${className}`}>
      <div
        className="h-full bg-green-500 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${clampedProgress}%` }}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      ></div>
    </div>
  )
}