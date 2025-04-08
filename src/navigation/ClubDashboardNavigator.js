import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, Ionicons, FontAwesome5 } from 'react-native-vector-icons';

// Import club screens
import CreateEventScreen from '../screens/club/CreateEventScreen';
import ClubProfileScreen from '../screens/club/ClubProfileScreen';
import EventAnalyticsScreen from '../screens/club/EventAnalyticsScreen';
import FollowersScreen from '../screens/club/FollowersScreen';
import ODManagementScreen from '../screens/club/ODManagementScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const EventsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="EventsMain" 
      component={ODManagementScreen} 
      options={{ title: 'Manage Events & ODs' }}
    />
    <Stack.Screen 
      name="CreateEvent" 
      component={CreateEventScreen} 
      options={{ title: 'Create Event' }}
    />
  </Stack.Navigator>
);

const AnalyticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="AnalyticsMain" 
      component={EventAnalyticsScreen} 
      options={{ title: 'Analytics' }}
    />
  </Stack.Navigator>
);

const FollowersStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="FollowersMain" 
      component={FollowersScreen} 
      options={{ title: 'Followers' }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileMain" 
      component={ClubProfileScreen} 
      options={{ title: 'Club Profile' }}
    />
  </Stack.Navigator>
);

// Main tab navigator for club dashboard
const ClubDashboardNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#e74c3c',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        }
      }}
    >
      <Tab.Screen 
        name="Events" 
        component={EventsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
          tabBarLabel: 'Events & OD'
        }}
      />
      <Tab.Screen 
        name="Analytics" 
        component={AnalyticsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Followers" 
        component={FollowersStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="users" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="business" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default ClubDashboardNavigator;