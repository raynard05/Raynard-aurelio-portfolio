"use client";


import "./DotGrid.css";
export default function DotGrid() {
  const rows = 6;     // change: number of rows
  const cols = 15;    // change: number of columns


  return (
    <div className="dot-grid">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="dot-row">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <div key={colIndex} className="dot" />
          ))}
        </div>
      ))}
    </div>
  );
}
