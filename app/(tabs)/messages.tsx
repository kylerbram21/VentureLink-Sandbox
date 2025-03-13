import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import React, {useRef, useState} from 'react'
import  firestore from "../../firebase"
import {addDoc, collection } from "firebase/firestore"

export default function Messges(){
    const [message, setMessage] = useState("")
    
    const handleSave = async () => {
        
        const ref = collection(firestore, "messages")
        let data = {
            message: message
        }
        
        try {
            addDoc(ref,data);
        }catch(e){
            console.log(e);
        }
    };
    
    return(
        <View style={styles.filler}>
            <Text style={styles.filler}>Messages</Text>
            <TextInput style={styles.filler} value={message} onChange={(evt:any)=> setMessage(evt.target.value)}/>
            <TouchableOpacity onPress={()=> handleSave()}>
                <Text>Click</Text>
            </TouchableOpacity>    
        </View>
    )


}

const styles = StyleSheet.create({
  filler:{
    backgroundColor: "#fff"
  }
})