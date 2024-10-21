"use client"
export const pointCal = (point: number) => {
    if (point >= 1000000000) return (point / 1000000000).toFixed(1) + "B"; // Billions
    if (point >= 1000000) return (point / 1000000).toFixed(1) + "M"; // Millions
    if (point >= 10000) return (point / 1000).toFixed(1) + "k"; // Thousands
    return point.toString(); 
};