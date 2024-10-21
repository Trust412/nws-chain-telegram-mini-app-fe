"use client"

import React, { useState } from 'react'

interface TabProps {
  tabs: string[]
  defaultTab?: string
  setSort: React.Dispatch<React.SetStateAction<number>>;
}

export function Tabs({ tabs, defaultTab, setSort }: TabProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0])

  const handleTab = ( tab: string, idx: number ) => {
    setActiveTab(tab)
    setSort(idx)
  } 
  return (
    <div className="bg-[#2D2463] p-1 rounded-lg flex overflow-scroll w-fit">
      {tabs.map((tab, idx) => (
        <button
          key={tab}
          className={`py-2 px-4 rounded-lg text-white text-sm font-semibold text-nowrap transition-colors duration-200 ${
            activeTab === tab
              ? 'bg-[#7B61FF]'
              : 'hover:bg-[#3D2F80] focus:bg-[#3D2F80]'
          }`}
          onClick={() => handleTab(tab, idx)}
        >
          {tab}
        </button>
      ))}
    </div>
  )
}