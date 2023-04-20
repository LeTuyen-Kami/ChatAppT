import React from 'react';

import {Text, useWindowDimensions, View} from 'react-native';
import {Box, Button, Input, useToast} from 'native-base';
import {FlashList} from '@shopify/flash-list';
import Item from 'screens/Profile/Item';
import Video from 'react-native-video';
import RNFS, {writeFile, DocumentDirectoryPath} from 'react-native-fs';
import {
  Canvas,
  Fill,
  Shader,
  Skia,
  useClockValue,
  useComputedValue,
  useTouchHandler,
  useValue,
} from '@shopify/react-native-skia';
import {width} from 'utils/utils';
import {useSharedValue, withRepeat, withTiming} from 'react-native-reanimated';

const ContainerProfile: React.FC<{}> = () => {
  const screen = useWindowDimensions();
  const toast = useToast();

  const [input, setInput] = React.useState<string>('');

  const renderItem = ({item, index}: {item: any; index: number}) => {
    return <Item item={item} index={index} />;
  };

  const flashListRef = React.useRef<any>(null);

  const onPressPrev = () => {
    const isHorizontal =
      flashListRef.current?.rlvRef?._scrollComponent?.props?.isHorizontal;
    const itemHeight = !isHorizontal ? screen.height : screen.width;
    const currentOffset =
      flashListRef.current?.rlvRef?._scrollComponent?._offset;
    // console.log(
    //   'onPressNext',
    //   itemHeight,
    //   currentOffset,
    //   deviceHeight,
    //   deviceWidth,
    // );

    if (currentOffset === 0) {
      toast.show({
        title: 'Đây là chương đầu tiên',
      });
      return;
    }
    const prevIndex = Math.round((currentOffset - itemHeight) / itemHeight);

    flashListRef.current?.scrollToIndex({
      animated: true,
      index: prevIndex,
    });
  };

  const onPressNext = () => {
    const isHorizontal =
      flashListRef.current?.rlvRef?._scrollComponent?.props?.isHorizontal;
    const itemHeight = !isHorizontal ? screen.height : screen.width;
    const currentOffset =
      flashListRef.current?.rlvRef?._scrollComponent?._offset;
    // console.log('onPressNext', itemHeight, currentOffset);
    const contentLength = Math.round(itemHeight * 1000);

    if (Math.round(currentOffset + itemHeight) >= contentLength) {
      toast.show({
        title: 'Đây là chương cuối cùng',
      });
      return;
    }
    const prevIndex = Math.round((currentOffset + itemHeight) / itemHeight);

    flashListRef.current?.scrollToIndex({
      animated: true,
      index: prevIndex,
    });
  };

  const videoUrl =
    'https://scontent.fsgn5-5.fna.fbcdn.net/v/t42.1790-2/329603341_567454905215582_2128462390041390460_n.mp4?_nc_cat=100&ccb=1-7&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6InN2ZV9zZCJ9&_nc_ohc=rE-xLVD4kmYAX8bbjkK&_nc_rml=0&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfDEXcxh9V8sImwSiUeqDXNvDfDH_Ynx3pqGnJbFmVkDiA&oe=644444D6';

  const ytUrl = 'https://www.youtube.com/watch?v=HkHVENSLG8Y';

  const convertToMp3 = async () => {
    //https://convert2mp3s.com/api/button/{FTYPE}?url={VIDEO_URL}
    fetch(
      `https://convert2mp3s.com/api/button/mp3?url=https://www.youtube.com/watch?v=pRpeEdMmmQ0`,
    )
      // .then(res => {
      //   return res.blob();
      // })
      .then((blob: any) => {
        console.log('blob', blob);
        // writeFile(`${DocumentDirectoryPath}/test.mp3`, blob, 'base64')
        //   .then(() => {
        //     console.log('FILE WRITTEN!');
        //   })
        //   .catch((err: any) => {
        //     console.log(err);
        //   });
      });
  };

  const point = useValue(0);

  const currenClock = useValue(0);
  const stringClock = useValue(0);

  const Location = () => {
    console.log('Location', RNFS.DocumentDirectoryPath);
  };

  const colors = [
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#FF00FF',
  ].map(color => Skia.Color(color));

  const log = (e: any) => {
    console.log('e', e);
  };

  const clock = useClockValue();
  const uniforms = useComputedValue(() => {
    let newClock = clock.current;
    if (point.current > 0) {
      newClock = clock.current - stringClock.current;
      currenClock.current = newClock;
      console.log('newClock', newClock, clock.current, stringClock.current);
    } else {
      newClock = currenClock.current;
    }

    //1->15: cl = 15
    //15->20
    //20->25: 20 - 15 = 20 - (20-cl) === 25: (25-15) =10

    return {
      colors: colors,
      clock: newClock,
      size: width,
    };
  }, [clock, colors, point]);

  // vec2 st = gl_FragCoord.xy/u_resolution.xy;
  // st.x *= u_resolution.x/u_resolution.y;
  //
  // vec3 color = vec3(0.);
  // color = vec3(st.x,st.y,abs(sin(u_time)));
  //
  // gl_FragColor = vec4(color,1.0);

  // vec3 d = .5 - fragcoord.xy1 / 400;
  // vec3 p=vec3(0);
  // for (int i = 0; i < 32; i++) {
  //   p += f(p) * d;
  // }
  // return ((sin(p) + vec3(1,2,3)) / length(p)).xyz1;

  // precision highp float;
  // uniform vec2 resolution;
  // uniform float time;
  //
  // void main()
  // {
  //   vec2
  //   p = 7. * (2. * gl_FragCoord.xy - resolution.xy) / resolution.y;
  //   float
  //   m1 = sin(length(p) * 0.3 - time * 0.3);
  //   float
  //   m2 = sin(0.3 * (length(p) * 0.3 - time * 0.3));
  //   float
  //   c1 = 0.012 / abs(length(mod(p, 2.0 * m1) - m1) - 0.3);
  //   float
  //   c2 = 0.012 / abs(length(mod(p, 2.0 * m2) - m2) - 0.3);
  //   gl_FragColor = vec4(vec3(1., 2., 8.) * c1 + vec3(8., 2., 1.) * c2, 1.0);
  // }

  const touch = useTouchHandler({
    onStart: () => {
      stringClock.current = clock.current - currenClock.current;
      console.log('stringClock', stringClock.current);
      point.current = 10;
    },
    onEnd: () => {
      point.current = 0;
    },
  });

  const source = Skia.RuntimeEffect.Make(`
        uniform vec4 colors[6];
        uniform float clock;
        uniform float size;
  
        float f(vec3 p) {
    p.z -= clock /1000.;
    float a = p.z * .1;
    p.xy *= mat2(cos(a), sin(a), -sin(a), cos(a));
    return .1 - length(cos(p.xy) + sin(p.yz));
}

vec4 main(vec2 fragcoord) { 
    float sClock = clock/1000;
    vec2 resolution = vec2(size);
    vec2 st = fragcoord.xy/ resolution.xy;
    st.x *= resolution.x/resolution.y;
    vec3 color = vec3(0.);
    color = vec3(st.x,st.y,abs(sin(sClock)));
    return vec4(color,1.0);
}

  `)!;

  return (
    <Box w={screen.width} h={screen.height}>
      <Box w={200} h={200}>
        {/*<Video*/}
        {/*  source={{*/}
        {/*    uri: videoUrl,*/}
        {/*  }}*/}
        {/*  style={{width: 200, height: 200}}*/}
        {/*  resizeMode="cover"*/}
        {/*  controls={true}*/}
        {/*  paused={false}*/}
        {/*/>*/}
        <Button onPress={convertToMp3}>Convert to mp3</Button>
        <Button onPress={Location}>Location</Button>
        <Canvas
          onTouch={touch}
          style={{
            width: width,
            height: width,
          }}>
          <Fill>
            <Shader source={source} uniforms={uniforms} />
          </Fill>
        </Canvas>
      </Box>
    </Box>
  );
};

export default ContainerProfile;
