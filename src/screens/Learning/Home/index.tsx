import React from 'react';
import {Box} from 'native-base';
import Header from 'components/Header';
import {HomeCourse} from 'screens/Learning/Home/HomeCourse';
import {storage} from 'src/database';

const Home: React.FC<any> = ({navigation}) => {
  const navigateOverview = () => {
    const isNotFirstAccess = storage.getBoolean('isNotFirstAccess');
    if (isNotFirstAccess) {
      navigation.navigate('Overview');
      return;
    }
    navigation.navigate('InputTest');
  };

  const onLongPress = () => {
    navigation.navigate('Overview');
  };

  return (
    <Box flex={1}>
      <Header title={'TChat'} hideLeft={true} />
      <HomeCourse onPress={navigateOverview} onLongPress={onLongPress} />
    </Box>
  );
};

export default Home;
