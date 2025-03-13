import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, {useRef, useState} from 'react'
import  firestore from "../../firebase"
import {addDoc, collection } from "firebase/firestore"
import Dropdown from "../../components/Dropdown"
import { ScrollView, Image } from "react-native"

export default function Messges(){
    const [message, setMessage] = useState("")
    
    


return(
    <View style={{ padding: 20, backgroundColor: "#fff", height: 1000, width: "100%" }}>
       <ScrollView style={styles.filler}
         horizontal={true}
         contentContainerStyle={
            {display: "flex",
              flexDirection: "row"
            }
         }
       >
          <View style={styles.logoConatiner}>
              <Image style={{alignSelf: "center", marginBottom: 90, marginTop: 90}} source={require('../../assets/images/VentureLinkLogo.webp')}/>
          </View>
          <View style={styles.logoConatiner}>
            <Image style={{alignSelf: "center", marginBottom: 90, marginTop: 90}} source={require('../../assets/images/VentureLinkLogo.webp')}/>
          </View>
        </ScrollView>
    </View>
)

}

const styles = StyleSheet.create({
    filler:{
      backgroundColor: "#000",
      width: 150, 
      height: 200, 
      flexDirection: "row"
    },
    logoConatiner: {
     width: "100%",
     height: "50%",
     borderStyle: "solid",
      borderColor: "red",
      borderWidth: 1
    }
  })