import React from 'react';
import {motion} from 'framer-motion';

export default function Message({ role, text, time }) {

    if(role === 'admin'){
        return (
            <motion.div
                initial={{opacity: 0, transform: 'scale(1.1)'}}
                animate={{opacity: 1, transform: 'scale(1)'}}
                className='shadow-1 text-[15px] gradient-1 rounded-[10px] p-[10px] text-white max-w-[90%] min-w-[80px] ml-auto'
            >
                <p>{ text }</p>
                <span className='block w-fit ml-auto mt-[3px]'>{time}</span>
            </motion.div>
        )
    }else{
        return (
            <motion.div 
                initial={{opacity: 0, transform: 'scale(1.1)'}}
                animate={{opacity: 1, transform: 'scale(1)'}}
                className='shadow-1 text-[15px] rounded-[10px] p-[10px] bg-white text-[#333] max-w-[90%] mr-auto'
            >
                <p>{ text }</p>
                <span className='block w-fit ml-auto mt-[3px]'>{time}</span>
            </motion.div>
        )
    }
}
