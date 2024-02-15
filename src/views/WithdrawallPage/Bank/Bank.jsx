import React from 'react';
import Title from '@components/Title/Title';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import AlphaImg from '@assets/banks/alpha.png';
import GazpromImg from '@assets/banks/gazprom.png';
import SberImg from '@assets/banks/sber.png';
import TinkoffImg from '@assets/banks/tinkoff.png';

export default function Bank({bank, setBank}) {
  const [bankImg, setBankImg] = React.useState(SberImg);

  const handleChange = (event) =>  setBank(event.target.value);

  React.useEffect(()=>{
    switch(bank){
      case 'alpha': setBankImg(AlphaImg);
      break;
      case 'gazprom': setBankImg(GazpromImg);
      break;
      case 'sber': setBankImg(SberImg);
      break;
      case 'tinkoff': setBankImg(TinkoffImg);
      break;

      default: setBankImg(SberImg);
    }
  }, [bank])

  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <Title>Выберите банк</Title>

        <img className='mb-3 mt-1' src={bankImg} alt="Банк" />

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Банк</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            value={bank}
            label="Age"
            onChange={handleChange}
          >
            <MenuItem value="sber">Сбербанк</MenuItem>
            <MenuItem value="tinkoff">Тинькофф</MenuItem>
            <MenuItem value="alpha">Альфабанк</MenuItem>
            <MenuItem value="gazprom">Газпромбанк</MenuItem>
          </Select>
        </FormControl>
    </div>
  )
}
