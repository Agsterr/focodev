import React from 'react'

interface FocoDevLogoProps {
  className?: string
  width?: number
  height?: number
}

export default function FocoDevLogo({ className = '', width = 180, height = 50 }: FocoDevLogoProps) {
  return (
    <svg
      viewBox="0 0 200 50"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Lupa - Círculo externo (azul vibrante) */}
      <circle
        cx="20"
        cy="20"
        r="12"
        fill="none"
        stroke="#0EA5E9"
        strokeWidth="3.5"
      />
      
      {/* Círculo interno (azul escuro - ponto focal) */}
      <circle
        cx="16"
        cy="16"
        r="3.5"
        fill="#0284C7"
      />
      
      {/* Handle da lupa (azul vibrante) */}
      <line
        x1="28"
        y1="28"
        x2="36"
        y2="36"
        stroke="#0EA5E9"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      
      {/* Texto "FocoDev" (azul escuro) */}
      <text
        x="48"
        y="26"
        fontSize="22"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="#0284C7"
      >
        FocoDev
      </text>
      
      {/* Texto "SISTEMAS" (azul vibrante) */}
      <text
        x="48"
        y="40"
        fontSize="13"
        fontWeight="700"
        fontFamily="system-ui, -apple-system, sans-serif"
        fill="#0EA5E9"
        letterSpacing="0.8"
      >
        SISTEMAS
      </text>
    </svg>
  )
}

