import {NativeModules} from 'react-native';

const {RNSound} = NativeModules;

//implement type for RNSound
export type RNSoundType = {
  sound: (path: string) => void;
};

export default RNSound as RNSoundType;
