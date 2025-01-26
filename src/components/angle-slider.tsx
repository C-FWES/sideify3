"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"

const AngleSlider: React.FC = () => {
  const [angle, setAngle] = useState(0)
  const svgRef = useRef<SVGSVGElement>(null)

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (svgRef.current) {
      const svgRect = svgRef.current.getBoundingClientRect()
      const centerX = svgRect.left + svgRect.width / 2
      const centerY = svgRect.top + svgRect.height / 2

      const dx = event.clientX - centerX
      const dy = event.clientY - centerY

      let theta = Math.atan2(dy, dx) * (180 / Math.PI)
      theta = (theta + 360) % 360 // Normalize to 0-360

      setAngle(Math.round(theta))
    }
  }

  const handleMouseLeave = () => {
    document.removeEventListener("mousemove", handleMouseMove as any)
    document.removeEventListener("mouseup", handleMouseLeave)
  }

  const handleMouseDown = () => {
    document.addEventListener("mousemove", handleMouseMove as any)
    document.addEventListener("mouseup", handleMouseLeave)
  }

  // Calculate slider head position
  const radius = 100
  const centerX = 110
  const centerY = 110
  const sliderX = centerX + radius * Math.cos(angle * (Math.PI / 180))
  const sliderY = centerY + radius * Math.sin(angle * (Math.PI / 180))

  return (
    <div className="flex items-center justify-center space-x-8">
      <svg ref={svgRef} width="220" height="220" onMouseDown={handleMouseDown} className="cursor-pointer">
        {/* Outer circle */}
        <circle cx={centerX} cy={centerY} r={radius} fill="none" stroke="#e2e8f0" strokeWidth="4" />
        {/* Angle arc */}
        <path
          d={`M ${centerX} ${centerY} L ${centerX + radius} ${centerY} A ${radius} ${radius} 0 ${
            angle > 180 ? 1 : 0
          } 1 ${sliderX} ${sliderY} Z`}
          fill="rgba(59, 130, 246, 0.2)"
        />
        {/* Slider head */}
        <circle cx={sliderX} cy={sliderY} r="10" fill="#3b82f6" />
      </svg>
      <div className="text-2xl font-semibold">{angle}°</div>
    </div>
  )
}

export default AngleSlider

