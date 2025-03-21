import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, {useRef, useState} from 'react'
import  {auth, firestore} from "../../firebase"
import {addDoc, collection } from "firebase/firestore"
import Dropdown from "../../components/Dropdown"
import { ScrollView, Image } from "react-native"
import { Swipeable } from "react-native-gesture-handler";
import { Colors } from "@/constants/Colors"

export default function Messges(){
    const [message, setMessage] = useState("")
    
    


return(
   <View style={styles.mainBody}>
        <View>
        <Image style={{ width: '100%', height: 650,  }} source={require('../../assets/images/TempMap.png')}/>
        </View>   
   </View>
)

}

const styles = StyleSheet.create({
    mainBody:{
            height: '100%',
            width: '100%',
            backgroundColor: Colors.secondaryColor
          },
    
    ColorBlock:{
        height:500,
        width: 500,
        backgroundColor: Colors.primaryColor
    }
  })