/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import AppNavigation from './navigation';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'red',
        }}>
        <AppNavigation />
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default App;
