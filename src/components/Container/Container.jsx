import React from 'react'

export default function Container({children, className}) {
  return (
    <div className={`my-[80px] flex flex-col justify-center items-center w-full max-w-[400px] px-[15px] mx-auto ${className}`}>
        {children}
    </div>
  )
}
