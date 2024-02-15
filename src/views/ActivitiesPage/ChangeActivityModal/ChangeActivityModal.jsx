import React, {useState} from 'react';
import BottomModal from '@components/BottomModal/BottomModal';

import { Button } from '@mui/material';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

import dayjs from 'dayjs';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';

export default function ChangeActivityModal({setActiveModal, selectedChangeActivity, onSaveChangesActivity}) {
    const [date, setDate] = useState(dayjs(selectedChangeActivity.date));
    const [totalPlaces, setTotalPlaces] = useState(selectedChangeActivity.totalPlaces);
    const [price, setPrice] = useState(selectedChangeActivity.price);
    const [groupType, setGroup] = useState(selectedChangeActivity.groupType);

    const onSaveClickHandle = () => {
        let activity = JSON.parse(JSON.stringify(selectedChangeActivity));
        activity.date = String(date['$d'] || date);
        activity.totalPlaces = +totalPlaces;
        activity.price = +price;
        activity.groupType = groupType;
        onSaveChangesActivity(activity);
    }

    return (
        <BottomModal title="Изменить занятие" setActiveModal={setActiveModal} isFullScreen={true}>
            <div className='flex flex-col gap-6 px-[15px] py-4'>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                        format="DD/MM/YY HH:mm" 
                        label="Дата и время проведения" 
                        ampm={false}
                        onChange={(e) => setDate(e['$d'])}
                        value={date}
                    />
                </LocalizationProvider>

                <TextField
                    label="Количество мест"
                    value={totalPlaces}
                    onChange={(e) => setTotalPlaces(e.target.value)}
                    type="number"
                />

                <TextField
                    label="Цена занятия"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            <CurrencyRubleIcon />
                        </InputAdornment>
                        ),
                    }}
                />

                <FormControl fullWidth>
                    <InputLabel id="group-label-id">Группа</InputLabel>
                    <Select
                        labelId="group-label-id"
                        value={groupType}
                        label="group"
                        onChange={(e) => setGroup(e.target.value)}
                    >
                        <MenuItem value="open">Открытая группа</MenuItem>
                        <MenuItem value="close">Закрытая группа</MenuItem>
                    </Select>
                </FormControl>

                <div className='flex flex-col gap-3'>
                    <Button onClick={onSaveClickHandle} variant='contained'>Сохранить</Button>
                    <Button onClick={() => setActiveModal(false)} variant='contained' color='error'>Отменить изменения</Button>
                </div>

            </div>
        </BottomModal>
    )
}