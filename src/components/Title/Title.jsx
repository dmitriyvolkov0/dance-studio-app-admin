import React from 'react'

export default function Title({children, className}) {
  return (
    <h1 className={`text-[20px] uppercase font-medium text-center mx-auto ${className}`}>
        {children}
    </h1>
  )
}
