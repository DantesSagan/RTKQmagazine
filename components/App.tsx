import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import CakeView from './features/cake/CakeView';
import IceCreamView from './features/icecream/IceCreamView';
import UserView from './features/user/UserView';
import BasketViewNavBar from './features/basket/BasketView';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Cake, Favorite, Icecream } from '@mui/icons-material';

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className='text-center '>
      <BasketViewNavBar />
      <div className='flex items-center justify-center'>
        <Box>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                border: 'divider',
                width: '650px',
                paddingTop: '150px',
              }}
            >
              <TabList
                aria-label='Tabs example'
                onChange={handleChange}
                textColor='primary'
                indicatorColor='primary'
                centered
                // centered for alignCenter of TabList
                // centered
              >
                <Tab
                  label='Cakes'
                  value='1'
                  icon={<Cake />}
                  iconPosition='start'
                />
                <Tab
                  label='IceCreams'
                  value='2'
                  icon={<Icecream />}
                  iconPosition='start'
                />
              </TabList>
            </Box>
            <TabPanel value='1'>
              <Typography
                variant='h3'
                component='div'
                className='font-bold first-letter:text-7xl  first-letter:text-black'
              >
                Delicious cakes!
              </Typography>
              <CakeView value={undefined} expanded={false} />
            </TabPanel>
            <TabPanel value='2'>
              <Typography
                variant='h3'
                component='div'
                className='font-bold first-letter:text-7xl  first-letter:text-black'
              >
                Delicious ice creams!
              </Typography>
              <IceCreamView value={undefined} expanded={false} />
            </TabPanel>
          </TabContext>
        </Box>
      </div>

      {/* <UserView /> */}
    </div>
  );
}

export default App;
