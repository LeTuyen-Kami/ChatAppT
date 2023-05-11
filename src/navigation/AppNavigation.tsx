import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import * as Screens from '../screens';
import {Test} from 'screens/Test';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const AppNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'Login'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen
          name="Login"
          component={Screens.Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="AIConversation"
          component={Screens.AIConversation}
        />
        <Stack.Screen name="Overview" component={Screens.Learning.OverView} />
        <Stack.Screen name="ListWord" component={Screens.Learning.ListWord} />
        <Stack.Screen name="InputTest" component={Screens.Learning.InputTest} />
        <Stack.Screen name="Test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

type RootStackParamList = {
  // Conversations: undefined;
  // Profile: undefined;
  BottomTab: undefined;
  Login: undefined;
  AIConversation: undefined;
  Overview: undefined;
  ListWord:
    | {
        title?: string;
        topicId?: string;
      }
    | undefined;
  InputTest: undefined;
  Test: undefined;
};

export type GenericScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

const BottomTab: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="LearnScreen" component={Screens.Learning.Home} />
      <Tab.Screen name="Conversations" component={Screens.Conversations} />
      <Tab.Screen name="Profile" component={Screens.Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigation;
