import React from 'react';
import { Platform, Text } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import Colors from '../constants/Colors';
import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import OrdersScreen from '../screens/OrdersScreen';
import HistoryScreen from '../screens/HistoryScreen';
import RatingScreen from '../screens/RatingScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarOptions: { 
    activeTintColor: Colors.yellow,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '';

const OrdersStack = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  config
);

OrdersStack.navigationOptions = {
  tabBarLabel: 'Orders',
  tabBarOptions: { 
    activeTintColor: Colors.yellow,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ?
      `ios-locate${focused ? '' : '-outline'}` : 'md-locate'} />
  ),
};

OrdersStack.path = '';

const HistoryStack = createStackNavigator(
  {
    History: HistoryScreen,
  },
  config
);

HistoryStack.navigationOptions = {
  tabBarLabel: 'History',
  tabBarOptions: { 
    activeTintColor: Colors.yellow,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ?
      `ios-calendar${focused ? '' : '-outline'}` : 'md-calendar'} />
  ),
};

HistoryStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarOptions: { 
    activeTintColor: Colors.yellow,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-contact${focused ? '' : '-outline'}`
          : 'md-contact'
      }
    />
  ),
};

ProfileStack.path = '';

const RatingStack = createStackNavigator(
  {
    Rating: RatingScreen,
  },
  config
);

RatingStack.navigationOptions = {
  tabBarLabel: 'Rating',
  tabBarOptions: { 
    activeTintColor: Colors.yellow,
    inactiveTintColor: Colors.tabIconDefault,
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-star${focused ? '' : '-outline'}`
          : 'md-star'
      }
    />
  ),
};

RatingStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  OrdersStack,
  HistoryStack,
  ProfileStack,
  RatingStack,
});

tabNavigator.path = '';

export default tabNavigator;
