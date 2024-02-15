import React from 'react';
import { motion } from "framer-motion";

// icons
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

export default function CenterModal({title, setActiveModal, children, type}) {
  return (
    <motion.div 
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0}}
        transition={{ duration: 0.2 }}

        className='
            fixed top-0 left-0
            flex justify-center items-center
            w-full h-full 
            bg-black/50
            z-[1000]
            px-[15px]
            backdrop-blur-sm
    '>

        <motion.div className={`
            bg-white 
            rounded-[20px]
            w-full max-w-[400px]
        `}

            initial={{ opacity: 0, bottom: -300}}
            animate={{ opacity: 1, bottom: 0}}
            exit={{ opacity: 0,  bottom: -300}}
            transition={{ duration: 0.3 }}
        >
            {/* header */}
            <div className='p-[20px] pb-0'>
                <button onClick={() => setActiveModal(false)} className='ml-auto block'> <CloseIcon/> </button>    
            </div>
            
            <div className='px-[20px] pb-[35px]'>
                <div className='flex flex-col justify-center items-center gap-3'>

                    {type === 'success' && <CheckCircleIcon sx={{fontSize: '110px'}} className="text-green-500"/>}
                    {type === 'danger' && <ReportGmailerrorredIcon sx={{fontSize: '110px'}} className="text-red-500"/>}
                    {type === 'question' && <HelpOutlineIcon sx={{fontSize: '110px'}} className="text-brand"/>}
                    
                    <h1 className='text-[18px] uppercase font-medium text-center'>{title}</h1>
                    <div className='flex flex-col gap-[10px] text-[14px] text-[#777]'>
                        {children}
                    </div>
                </div>
            </div>
            

        </motion.div>
    </motion.div>
  )
}
