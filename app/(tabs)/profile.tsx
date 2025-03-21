import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal} from "react-native";
import React, {useEffect, useRef, useState} from 'react'
import {auth, firestore} from "../../firebase"
import {addDoc, collection, doc, getDoc } from "firebase/firestore"
import {Colors} from "@/constants/Colors";
import InvestorProfile from "../../components/InvestorProfile.tsx"
import CompanyProfile from "../../components/CompanyProfile.tsx"
import useUser from "@/hooks/useUser";


export default function Profile(){

  const user = useUser()

  const [userInfo, setUserInfo] = useState({})

  useEffect(()=> {
     getUserData()
  },[useUser()])

  const getUserData = async() => {
     
    try{
       const ref = doc(firestore, "users", user.uid)
       const snapShot = await getDoc(ref)

       if(snapShot.exists()){
         const userData = snapShot.data()

         setUserInfo(userData)
         
        
       }
    }catch(err){
       console.log(err)
    }
}


    
    return(
       <ScrollView>
         {userInfo.type === "investor" ? <InvestorProfile /> :
         <CompanyProfile />}
       </ScrollView> 
    )


}

const styles = StyleSheet.create({
  filler:{
    backgroundColor: Colors.primaryColor
  },
  boxsize:{
    width: "50%",
    borderColor: "#000",
    height: 50,
    marginBottom: 20,
    backgroundColor : Colors.primaryColor
    },
  profileMainContainer:{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
    height: "100%"
  },



})