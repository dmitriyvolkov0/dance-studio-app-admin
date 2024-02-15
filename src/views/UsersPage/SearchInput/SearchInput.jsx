import React from 'react';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function clearButtonComponent(search, setSearch, onChangeSearch){
    return search.trim().length > 0 ?
        <IconButton onClick={() => { setSearch(''); onChangeSearch('')} } aria-label="delete" size="small">
            <CloseIcon fontSize="inherit" />
        </IconButton>
        :
        <></>
}

export default function SearchInput({onChangeSearch}) {
    const [search, setSearch] = React.useState('');

    const onChangeSearchHandle = (value) => {
        setSearch(value);
        onChangeSearch(value); 
    }

    return (
        <TextField
            className='w-full'
            label="Поиск"
            value={search}
            onChange={(e) => onChangeSearchHandle(e.target.value)}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
                ),
                endAdornment:(
                    clearButtonComponent(search, setSearch, onChangeSearch)
                )
            }}
        />
    )
}
