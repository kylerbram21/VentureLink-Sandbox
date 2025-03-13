import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, TouchableOpacity, Text, StyleSheet, } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Profile from './profile';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather'; 




export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
   
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} > <Text style= {styles.text}>Here</Text></TouchableOpacity>,
          headerShown: true,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerStyle:{
            backgroundColor: '#000',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} > <Text style= {styles.text}>Here</Text></TouchableOpacity>,
          headerShown: true,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    
    <Tabs.Screen
      name = "map"
      options={{
        title: 'Maps',
        headerStyle:{
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          display:"flex",
          alignItems:"center",
          fontWeight: 'bold',
        },

        headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} > <Text style= {styles.text}>Here</Text></TouchableOpacity>,
          headerShown: true,
        tabBarIcon: ({ color }) => <Feather name="map-pin" size={24} color={color} />,
      }}
      />

      <Tabs.Screen
      name = "messages"
      options={{
        title: 'Messages',
        headerStyle:{
          backgroundColor: '#000',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} > <Text style= {styles.text}>Here</Text></TouchableOpacity>,
          headerShown: true,
        tabBarIcon: ({ color }) => <AntDesign name="message1" size={24} color={color} />,
      }}
      />


      <Tabs.Screen
      name = "profile"
      options={{
        title: 'Profile',
        headerStyle:{
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        
        headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} > <Text style= {styles.text}>Here</Text></TouchableOpacity>,
          headerShown: true,
        tabBarIcon: ({ color }) => <FontAwesome name="building" size={24} color={color} />,
      }}
      />

    </Tabs>
  );
}

const styles = StyleSheet.create({
  filler:{
    backgroundColor: "#fff"
  },
  text:{
    color: "#fff"
  }
})
