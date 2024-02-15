import React from 'react';
import SendIcon from '@mui/icons-material/Send';

export default function SupportInput({sendMessage, ...props}) {
  return (
    <div className='w-[90%] max-w-[400px] fixed bottom-[80px]'>
        <input {...props} className='w-full shadow-1 outline-none p-[10px] pr-[40px] rounded-[10px]'/>
        <button onClick={sendMessage} className='absolute right-[15px] top-0 bottom-0 my-auto'>
            <SendIcon sx={{fontSize: 18}}/>
        </button>
    </div>
  )
}
