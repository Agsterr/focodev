"use client"

export default function AdminLogo() {
  // Logo SVG baseado no design da FocoDev (lupa + texto)
  return (
    <svg 
      viewBox="0 0 200 50" 
      className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ minWidth: '140px' }}
    >
      {/* Lupa - círculo externo (azul médio) */}
      <circle cx="20" cy="20" r="12" fill="none" stroke="#0EA5E9" strokeWidth="3" />
      {/* Círculo interno (azul escuro) */}
      <circle cx="16" cy="16" r="4" fill="#0284C7" />
      {/* Cabo da lupa */}
      <line x1="28" y1="28" x2="35" y2="35" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
      {/* Texto FocoDev (azul escuro) */}
      <text x="45" y="25" fontSize="18" fontWeight="700" fill="#0284C7" fontFamily="Arial, sans-serif">
        FocoDev
      </text>
      {/* Texto SISTEMAS (azul médio) */}
      <text x="45" y="38" fontSize="10" fontWeight="600" fill="#0EA5E9" fontFamily="Arial, sans-serif">
        SISTEMAS
      </text>
    </svg>
  )
}

