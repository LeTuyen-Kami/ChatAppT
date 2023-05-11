import React from 'react';
import {Box} from 'native-base';
import Header from 'components/Header';
import {HomeCourse} from 'screens/Learning/Home/HomeCourse';
import {Database} from 'src/database';

const Home: React.FC<any> = ({navigation}) => {
  const navigateOverview = () => {
    const isNotFirstAccess = Database.getBoolean(
      Database.keys.IS_NOT_FIRST_ACCESS,
    );
    if (isNotFirstAccess) {
      navigation.navigate('Overview');
      return;
    }
    navigation.navigate('InputTest');
  };

  const onLongPress = () => {
    console.log('onLongPress');
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
