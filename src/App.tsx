/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Pressable, SafeAreaView} from 'react-native';
import {NativeBaseProvider} from 'native-base';
import AppNavigation from './navigation';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

function App(): JSX.Element {
  const locationX = useSharedValue(0);
  const locationY = useSharedValue(0);
  const opacity = useSharedValue(1);
  const timeoutId = React.useRef<any>(null);
  const [arr, setArr] = React.useState<any[]>([]);
  const prevLocation = useSharedValue({x: 0, y: 0});
  const nextLocation = useSharedValue({x: 0, y: 0});

  const ellipticalPath = (x1: any, y1: any, x2: any, y2: any, t: any) => {
    'worklet';
    const centerX = (x1 + x2) / 2;
    const centerY = (y1 + y2) / 2;
    const radiusX = (x2 - x1) / 2;
    const radiusY = (y2 - y1) / 2;
    const distance = Math.sqrt(Math.pow(radiusX, 2) + Math.pow(radiusY, 2));
    const angle = Math.atan2(y1 - y2, x1 - x2);
    const x = centerX + distance * Math.cos(angle) * Math.cos(t);
    const y = centerY + distance * Math.sin(angle) * Math.sin(t);
    return {x, y};
  };

  const animatedStyle = useAnimatedStyle(() => {
    //locationY from 0 to pi

    const t = interpolate(
      locationY.value,
      [prevLocation.value.y, nextLocation.value.y],
      [Math.PI / 2, (3 / 2) * Math.PI],
    );

    const calc = ellipticalPath(
      prevLocation.value.x,
      prevLocation.value.y,
      nextLocation.value.x,
      nextLocation.value.y,
      t,
    );

    return {
      opacity: opacity.value,
      transform: [{scale: opacity.value}],
      top: calc.y,
      left: calc.x,
    };
  }, []);

  const animatedStyle2 = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: opacity.value}],
    };
  }, []);

  const onPress = (event: any) => {
    opacity.value = withTiming(1);
    prevLocation.value = {x: locationX.value, y: locationY.value};
    nextLocation.value = {
      x: event.nativeEvent.locationX,
      y: event.nativeEvent.locationY,
    };
    locationX.value = withSpring(event.nativeEvent.locationX);
    locationY.value = withSpring(event.nativeEvent.locationY);

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {
      opacity.value = withTiming(0, {duration: 1000});
    }, 1000);
  };

  const addArr = (x: number, y: number) => {
    setArr(vl => {
      const newArr = vl.slice(-5);
      newArr.push({x, y});
      return newArr;
    });
  };

  useAnimatedReaction(
    () => {
      return locationX.value;
    },
    value => {
      runOnJS(addArr)(value, locationY.value);
    },
    [locationX, locationY],
  );

  return (
    <NativeBaseProvider>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <Pressable style={{flex: 1}} onPress={onPress}>
          <AppNavigation />
        </Pressable>
        {/*<Animated.View*/}
        {/*  style={[*/}
        {/*    {*/}
        {/*      position: 'absolute',*/}
        {/*      width: 100,*/}
        {/*      height: 100,*/}
        {/*      backgroundColor: 'red',*/}
        {/*    },*/}
        {/*    animatedStyle,*/}
        {/*  ]}*/}
        {/*/>*/}
        {/*{arr.map((item, index) => {*/}
        {/*  return (*/}
        {/*    <Animated.View*/}
        {/*      key={index}*/}
        {/*      style={[*/}
        {/*        {*/}
        {/*          position: 'absolute',*/}
        {/*          top: item.y,*/}
        {/*          left: item.x,*/}
        {/*          width: 100,*/}
        {/*          height: 100,*/}
        {/*          backgroundColor: `rgba(255,0,0,${0.2})`,*/}
        {/*        },*/}
        {/*        animatedStyle2,*/}
        {/*      ]}*/}
        {/*    />*/}
        {/*  );*/}
        {/*})}*/}
      </SafeAreaView>
    </NativeBaseProvider>
  );
}

export default App;
