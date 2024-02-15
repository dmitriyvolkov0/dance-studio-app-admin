import React from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export default function CreateActivityButton({...props}) {
  return (
    <div className='fixed right-[20px] bottom-[70px]' {...props}>
        <Fab color="primary" aria-label="add">
            <AddIcon />
        </Fab>
    </div>
  )
}
