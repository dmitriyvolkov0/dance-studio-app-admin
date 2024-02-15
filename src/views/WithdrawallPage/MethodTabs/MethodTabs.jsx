import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Title from '@components/Title/Title';
import TextField from '@mui/material/TextField';

// import { phoneValidate } from '../../../utils/helpers/validateFunctions.js';


function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <div className='pt-4 flex flex-col'>
          {children}
        </div>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}



export default function MethodTabs({setMethod, phone, setPhone, card, setCard, isActiveBut, setIsActiveBut}) {
  const [activeTab, setActiveTab] = React.useState(0);

  const onChangeTab = (e, value) => {
    setActiveTab(value);
    setMethod(activeTab === 0 ? 'card' : 'phone');
  };

  React.useEffect(() => {
    if (activeTab === 0 && phone.length >= 12) {
      setIsActiveBut(true);
    } else if (activeTab === 1 && card.length === 19) {
      setIsActiveBut(true);
    } else {
      setIsActiveBut(false);
    }
  }, [card, phone, activeTab])
 
  const onChangeNumber = (e) =>{
    let value = e.target.value.replace(/^./, '+').replace(/[^+0-9]/g, '');
      value.length <= 12 && setPhone(value);
  }

  const onChangeCard = (e) =>{
    let value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1-');
        value.length <= 19 && setCard(value);
  }

  return (
    <div className='w-full'>
      <Title className="my-2">Как будем выводить?</Title>
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={onChangeTab} aria-label="basic tabs example">
            <Tab label="По номеру телефона" {...a11yProps(0)} />
            <Tab label="По номеру карты" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={activeTab} index={0}>

          <TextField  
            id="outlined-basic" 
            label="Номер телефона" 
            variant="outlined" 
            value={phone} 
            onChange={(e) => onChangeNumber(e)} 
          />

        </CustomTabPanel>
        <CustomTabPanel value={activeTab} index={1}>

          <TextField  
            id="outlined-basic" 
            label="Номер карты" 
            variant="outlined"
            value={card} 
            onChange={(e) => onChangeCard(e)} 
          />

        </CustomTabPanel>
    </Box>
    </div>
  );
}