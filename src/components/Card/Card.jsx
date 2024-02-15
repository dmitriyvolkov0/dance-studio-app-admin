import React from 'react';

export default function Card({children, className}) {
  return (
    <div className={`
        flex flex-col items-center justify-center
        shadow-1
        bg-white 
        w-full
        px-[30px] py-[35px]
        rounded-[25px]
        ${className}`}
    >
      {children}
    </div>
  )
}
