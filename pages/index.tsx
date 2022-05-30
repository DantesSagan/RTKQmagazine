import { useState } from 'react';

// import CakeView from '../components/features/cake/CakeView';
// import IceCreamView from '../components/features/icecream/IceCreamView';
// import UserView from '../components/features/user/UserView';
// import { CakesItem } from '../components/features/cakes/CakesItem';
// import { ICakes } from '../components/models/ICakes';
import BasketViewNavBar from '../components/features/baskets/BasketContainer';
import { Box, Tab, Typography } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Cake, Favorite, Icecream } from '@mui/icons-material';
import { CakesContainer } from '../components/features/cakes/CakesContainer';
import { MagazineApi } from '../components/app/store/base/apiMagazineService';
import { IceCreamsContainer } from '../components/features/iceCreams/IceCreamsContainer';

function App() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState('1');

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className='text-center '>
      <BasketViewNavBar />
      {/* <div className='pt-24'></div> */}
      <Box>
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              width: '600',
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
            </Typography>{' '}
            <CakesContainer />
            {/* <CakeView value={undefined} expanded={false} /> */}
          </TabPanel>
          <TabPanel value='2'>
            <Typography
              variant='h3'
              component='div'
              className='font-bold first-letter:text-7xl  first-letter:text-black'
            >
              Delicious ice creams!
            </Typography>
            <IceCreamsContainer />
            {/* <IceCreamView value={undefined} expanded={false} /> */}
          </TabPanel>
        </TabContext>
      </Box>

      {/* <UserView /> */}
    </div>
  );
}

export default App;
