import React from 'react';

import {
  Dimensions,
  Modal,
  Platform,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {BlurView} from '@react-native-community/blur';

const screen = Dimensions.get('screen');
const OFFSET_TOP = Platform.OS === 'ios' ? 50 : 10;

const Popover: React.FC<{
  children?: React.ReactNode;
  fitLeft?: boolean;
  selection?: {
    title: string;
    onPress: () => void;
    icon?: React.ReactNode;
  }[];
  isDark?: boolean;
  selectionWidth?: number;
  bottomOffset?: number;
}> = ({
  children,
  selectionWidth = 200,
  fitLeft = true,
  selection,
  isDark = true,
}) => {
  const [visible, setVisible] = React.useState<boolean>(false);
  const [Child, setChild] = React.useState<React.ReactNode>(null);
  const childrenRef = React.useRef<React.ReactNode>(null);
  const [childPosition, setChildPosition] = React.useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  const bottomOffset = React.useMemo(() => {
    return 50 * (selection?.length || 0);
  }, [selection]);

  const openPopover = () => {
    if (childrenRef.current) {
      (childrenRef.current as any).measure(
        (
          _: number,
          __: number,
          width: number,
          height: number,
          pageX: number,
          pageY: number,
        ) => {
          setChildPosition({x: pageX, y: pageY, w: width, h: height});
          setVisible(true);
        },
      );
    }
  };

  const closePopover = () => {
    setVisible(false);
  };

  const togglePopover = () => {
    setVisible(!visible);
  };

  React.useLayoutEffect(() => {
    if (!children) {
      return;
    }

    const NewChild = React.cloneElement(children as React.ReactElement, {
      ref: childrenRef,
      collapsable: false,
    });
    setChild(NewChild);
  }, [children]);

  const isLargeChild = React.useMemo(() => {
    return (
      (childPosition?.h || 0) + (selection?.length || 0) * 50 + 20 >
      screen.height
    );
  }, [childPosition, selection]);

  const scale = React.useMemo(() => {
    if (!isLargeChild) {
      return 1;
    }

    return (
      1 /
      ((childPosition?.h || 0) /
        (screen.height - 10 - OFFSET_TOP - ((selection?.length || 0) + 1) * 50))
    );
  }, [childPosition, selection]);

  return (
    <View>
      <TouchableOpacity onPress={openPopover}>{Child}</TouchableOpacity>
      <Modal animationType={'fade'} visible={visible} transparent={true}>
        <Pressable
          onPress={closePopover}
          style={{
            flex: 1,
          }}>
          <BlurView
            style={{
              flex: 1,
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
              }}>
              <View
                style={{
                  position: 'absolute',
                  top: isLargeChild ? 0 : childPosition?.y,
                  left: childPosition?.x,
                  width: childPosition?.w,
                }}>
                <Pressable
                  style={{
                    transform: [
                      {
                        translateX:
                          (-1 * ((childPosition?.w || 0) * (1 - scale))) / 2,
                      },
                      {
                        translateY: isLargeChild
                          ? (-(childPosition?.h || 0) * (1 - scale)) / 2 +
                            OFFSET_TOP
                          : 0,
                      },
                      {
                        scale: scale,
                      },
                    ],
                  }}>
                  {React.cloneElement(children as React.ReactElement, {
                    style: {
                      ...(children as React.ReactElement)?.props?.style,
                      margin: 0,
                      padding: 0,
                      backgroundColor: 'red',
                    },
                  })}
                </Pressable>
                <View
                  style={{
                    borderRadius: 10,
                    backgroundColor: isDark
                      ? 'rgba(0,0,0,0.3)'
                      : 'rgba(255,255,255,0.3)',
                    width: selectionWidth,
                    marginTop: 10,
                    transform: [
                      {
                        translateX: fitLeft
                          ? 0
                          : (childPosition?.w || selectionWidth) -
                            (selectionWidth > (childPosition?.w || 0)
                              ? selectionWidth
                              : childPosition?.w || 0),
                      },
                      {
                        translateY: selection
                          ? isLargeChild
                            ? -(1 - scale) * (childPosition?.h || 0) +
                              OFFSET_TOP
                            : screen.height - (childPosition?.y || 0) >
                              bottomOffset + (childPosition?.h || 0) + 20
                            ? 0
                            : -selection?.length * 50 -
                              20 -
                              (childPosition?.h || 0)
                          : 0,
                      },
                    ],
                  }}>
                  {selection?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          item.onPress();
                          closePopover();
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            height: 50,
                          }}>
                          <Text
                            style={{
                              padding: 10,
                              color: isDark ? 'white' : 'black',
                            }}>
                            {item.title}
                          </Text>
                          <Text
                            style={{
                              padding: 10,
                              color: isDark ? 'white' : 'black',
                            }}>
                            {item?.icon}
                          </Text>
                        </View>
                        {index !== selection.length - 1 && (
                          <View
                            style={{
                              height: 1,
                              width: '100%',
                              backgroundColor: isDark ? 'gray' : 'gray',
                            }}
                          />
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </View>
          </BlurView>
        </Pressable>
      </Modal>
    </View>
  );
};

export default Popover;
