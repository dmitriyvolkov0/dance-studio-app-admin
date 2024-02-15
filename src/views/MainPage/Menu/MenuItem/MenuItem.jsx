import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuItem({ title, gradient, icon, link }) {

  
  return (
    <Link to={link} className={`
        flex flex-col justify-center
        p-5
        w-full 
        max-w-[180px]
        rounded-[15px]
        text-[18px] font-medium
        active:transform-cpu active:scale-105 duration-200
        active:opacity-[80%]
        cursor-pointer
        ${gradient}
    `}>

        <div className='flex justify-center items-center bg-white w-[35px] h-[35px] rounded-full'>
            {icon}
        </div>
        <span className="text-[#fff] mt-[5px]">
            {title}
        </span>
    </Link>
  )
}
