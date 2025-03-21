import { Tabs } from 'expo-router';
import React from 'react';
import {View, Platform, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import Profile from './profile';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather'; 

const { width, height } = Dimensions.get("window")

const headerHeight = height / 9


export default function TabLayout() {
  const colorScheme = useColorScheme();

  const headerOptions ={
    headerStyle: {
      backgroundColor: Colors.secondaryColor,
      height: 120
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerLeft: ()=> <View style={{display:"flex", height:"100%", flexDirection: "row",  overflow:"hidden"}}><View style={styles.headerLeftContainer}><Text style={styles.headerFont}>Venture Link</Text></View><View style={styles.separator}></View></View>,
    headerRight: () => <TouchableOpacity style={{marginRight: 20}} onPress={() => console.log("Here")} > <Feather name="sliders" size={25} color="#000"/> </TouchableOpacity>,
    headerShown: true,
    tabBarIcon: () => <IconSymbol size={28} name="house.fill" color={Colors.primaryColor} />,
  
   }

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
        options={{...headerOptions, title:"Home"}}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          headerStyle:{
            backgroundColor: Colors.primaryColor,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} > </TouchableOpacity>,
          headerShown: true,
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="paperplane.fill" color={color} />,
        }}
      />
    
    <Tabs.Screen
      name = "map"
      options={{
        title: 'Maps',
        headerStyle:{
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          display:"flex",
          alignItems:"center",
          fontWeight: 'bold',
        },

        headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} ></TouchableOpacity>,
          headerShown: true,
        tabBarIcon: ({ color }) => <Feather name="map-pin" size={24} color={color} />,
      }}
      />

      <Tabs.Screen
      name = "messages"
      options={{
        title: 'Messages',
        headerStyle:{
          backgroundColor: Colors.primaryColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },

        headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} ></TouchableOpacity>,
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
        
        headerRight: () => <TouchableOpacity onPress={() => console.log("Here")} ></TouchableOpacity>,
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
  },
  headerLeftContainer: {
      display: "flex",
      justifyContent: "center",
      backgroundColor: Colors.primaryColor,
      width: 170,
      maxWidth: "auto",
      height: "100%",
      padding: 10,
  },
  headerFont:{
    flex: 1,
    fontSize: 30,
    fontWeight: 700,
    color: "#fff",
    position: "absolute",
    right: -30,
    marginBlockEnd: 1,
    zIndex: 20
  },
  separator:{
    width:0,
    height:0,
    borderStyle: "solid",
    borderRightWidth: 120,
    borderRightColor: "transparent",
    borderBottomWidth: headerHeight + 120,
    borderBottomColor: Colors.primaryColor,
    borderTopWidth: -headerHeight,
    zIndex: 10
    
  }
})
