"use client"
import { useEffect, useState } from 'react';

const Counter = () => {
  const [seconds, setSeconds] = useState(1000);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const formatTime = (sec: number) => {
    const hours = String(Math.floor(sec / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const seconds = String(sec % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold mb-4">{formatTime(seconds)}</h1>
      <button
        onClick={toggle}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition"
      >
        {isActive ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default Counter;