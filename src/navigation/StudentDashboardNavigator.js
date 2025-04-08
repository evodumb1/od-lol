import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons, Ionicons, FontAwesome5 } from 'react-native-vector-icons';

// Import student screens
import HomeScreen from '../screens/student/HomeScreen';
import MyODsScreen from '../screens/student/MyODsScreen';
import MyEventsScreen from '../screens/student/MyEventsScreen';
import BrowserScreen from '../screens/student/BrowserScreen';
import ProfileScreen from '../screens/student/ProfileScreen';
import NotificationsScreen from '../screens/student/NotificationsScreen';
import EventDetailScreen from '../screens/student/EventDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigators for each tab
const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="HomeMain" 
      component={HomeScreen} 
      options={{ title: 'Dashboard' }}
    />
    <Stack.Screen 
      name="Notifications" 
      component={NotificationsScreen} 
      options={{ title: 'Notifications' }}
    />
    <Stack.Screen 
      name="EventDetail" 
      component={EventDetailScreen} 
      options={{ title: 'Event Details' }}
    />
  </Stack.Navigator>
);

const MyODsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MyODsMain" 
      component={MyODsScreen} 
      options={{ title: 'My ODs' }}
    />
    <Stack.Screen 
      name="EventDetail" 
      component={EventDetailScreen} 
      options={{ title: 'Event Details' }}
    />
  </Stack.Navigator>
);

const MyEventsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="MyEventsMain" 
      component={MyEventsScreen} 
      options={{ title: 'My Events' }}
    />
    <Stack.Screen 
      name="EventDetail" 
      component={EventDetailScreen} 
      options={{ title: 'Event Details' }}
    />
  </Stack.Navigator>
);

const BrowserStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="BrowserMain" 
      component={BrowserScreen} 
      options={{ title: 'Browse' }}
    />
    <Stack.Screen 
      name="EventDetail" 
      component={EventDetailScreen} 
      options={{ title: 'Event Details' }}
    />
  </Stack.Navigator>
);

const ProfileStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="ProfileMain" 
      component={ProfileScreen} 
      options={{ title: 'My Profile' }}
    />
  </Stack.Navigator>
);

// Main tab navigator for student dashboard
const StudentDashboardNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#3498db',
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
        name="Home" 
        component={HomeStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="dashboard" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="MyODs" 
        component={MyODsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="medal" size={size} color={color} />
          ),
          tabBarLabel: 'My ODs'
        }}
      />
      <Tab.Screen 
        name="Events" 
        component={MyEventsStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="event" size={size} color={color} />
          ),
          tabBarLabel: 'Events'
        }}
      />
      <Tab.Screen 
        name="Browse" 
        component={BrowserStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="search" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack} 
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default StudentDashboardNavigator;