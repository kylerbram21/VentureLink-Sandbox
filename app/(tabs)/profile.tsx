import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView, Modal} from "react-native";
import React, {useRef, useState} from 'react'
import {auth, firestore} from "../../firebase"
import {addDoc, collection } from "firebase/firestore"
import { IconSymbol } from '@/components/ui/IconSymbol';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import DropDownPicker from 'react-native-dropdown-picker';
import {Colors} from "@/constants/Colors";
import Dropdown from "../../components/Dropdown"
import { signOut } from "firebase/auth";

export default function Profile(){

    const [Industry, setIndustry] = useState("")
    const [Location, setLocation] = useState("")
    const [RevenueModel, setRevenueModel] = useState("")
    const [startupLevel, setStartupLevel] = useState("")
    const [userState, setUserState] = useState("")
    const [pitchDeck, setpitchDeck] = useState("")
    const [userWebsite, setUserWebsite] = useState("")

    const startUpLevelOptions =  [
     { label: "1. Pre-Seed Stage", value: "preSeedStage" },
    { label: "2. Seed Stage", value: "seedStage" },
    { label: "3. Early Stage", value: "earlyStage" },
    { label: "4. Growth Stage", value: "growthStage" },
    { label: "5. Expansion Stage", value: "expansionStage" },
    { label: "6. Exit Stage", value: "exitStage" },
  ]

  const stateOptions = [
  { label: "AL", value: "Alabama" },
  { label: "AK", value: "Alaska" },
  { label: "AZ", value: "Arizona" },
  { label: "AR", value: "Arkansas" },
  { label: "CA", value: "California" },
  { label: "CO", value: "Colorado" },
  { label: "CT", value: "Connecticut" },
  { label: "DE", value: "Delaware" },
  { label: "FL", value: "Florida" },
  { label: "GA", value: "Georgia" },
  { label: "HI", value: "Hawaii" },
  { label: "ID", value: "Idaho" },
  { label: "IL", value: "Illinois" },
  { label: "IN", value: "Indiana" },
  { label: "IA", value: "Iowa" },
  { label: "KS", value: "Kansas" },
  { label: "KY", value: "Kentucky" },
  { label: "LA", value: "Louisiana" },
  { label: "ME", value: "Maine" },
  { label: "MD", value: "Maryland" },
  { label: "MA", value: "Massachusetts" },
  { label: "MI", value: "Michgan" },
  { label: "MN", value: "Minnesota" },
  { label: "MS", value: "Mississippi" },
  { label: "MO", value: "Missouri" },
  { label: "MT", value: "Montana" },
  { label: "NE", value: "Nebraska" },
  { label: "NV", value: "Nevada" },
  { label: "NH", value: "New Hampshire" },
  { label: "NJ", value: "New Jersey" },
  { label: "NM", value: "New Mexico" },
  { label: "NY", value: "New York" },
  { label: "NC", value: "North Carolina" },
  { label: "ND", value: "North Dakota" },
  { label: "OH", value: "Ohio" },
  { label: "OK", value: "Oklahoma" },
  { label: "OR", value: "Oregon" },
  { label: "PA", value: "Pennsylvania" },
  { label: "RI", value: "Rhode Island" },
  { label: "SC", value: "South Carolina" },
  { label: "SD", value: "South Dakota" },
  { label: "TN", value: "Tennessee" },
  { label: "TX", value: "Texas" },
  { label: "UT", value: "Utah" },
  { label: "VT", value: "Vermont" },
  { label: "VA", value: "Virginia" },
  { label: "WA", value: "Washington" },
  { label: "WV", value: "West Virginia" },
  { label: "WI", value: "Wisconsin" },
  { label: "WY", value: "Wyoming" }, ]
    
    const handleSave = async () => {
        
        const ref = collection(firestore, "userInfo")
        let data = {
            Industry: Industry,
            location: Location,
            userState: userState,
            revenueModel : RevenueModel,
            startUpStage: startupLevel

        }
        
        try {
            addDoc(ref,data);
        }catch(e){
            console.log(e);
        }
    };

   console.log("Super Here")


   function signOutUser(){
    signOut(auth).then(() => {
      
   }).catch((error) => {
     console.log(error)
   })
} 
    
    return(
       <ScrollView>
        <View style={styles.profileMainContainer}>
          <Image style={{ width: 300, height: 300, alignSelf: "center", marginBottom: 90, marginTop: 90}} source={require('../../assets/images/VentureLinkLogo.webp')}/>
          <View style={styles.boxsize}> 
            <Text style={styles.filler}>Industry</Text>
            <TextInput style={styles.filler} value={Industry} onChange={(evt:any)=> setIndustry(evt.target.value)}/>

            
          </View> 
          <View style={styles.boxsize}> 
            <Text style={styles.filler}>Location</Text>
            <TextInput style={styles.filler} value={Location} onChange={(evt:any)=> setLocation(evt.target.value)}/>
            
          </View> 
          
          <View style={{...styles.boxsize, zIndex: 1200, marginBottom: 60,}}>
            <Dropdown style={styles.boxsize} items={stateOptions} value={userState} setState={setUserState} defaultValue = "States" />
          </View>

          <View style={styles.boxsize}> 
            <Text style={styles.filler}> Revenue Model</Text>
            <TextInput style={styles.filler} value={RevenueModel} onChange={(evt:any)=> setRevenueModel(evt.target.value)}/>
            
          </View>

          {/* <View style={styles.boxsize}> 
            <Text style={styles.filler}>Pitch Deck</Text>
            <TextInput style={styles.filler} value={pitchDeck} onChange={(evt:any)=> setpitchDeck(evt.target.value)}/>
            
          </View>  */}

          <View style={{...styles.boxsize, zIndex: 1200, marginBottom: 60,}}>
                  <Dropdown items={startUpLevelOptions} value={startupLevel} setState={setStartupLevel} defaultValue = "Which Stage are you?"/>
            </View> 

            <View style={styles.boxsize}> 
            <Text style={styles.filler}>Website Link</Text>
            <TextInput style={styles.filler} value={userWebsite} onChange={(evt:any)=> setUserWebsite(evt.target.value)}/>
            
             </View> 
            

          <TouchableOpacity onPress={()=> handleSave()}>
               <Text>Click</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> signOutUser()}>
               <Text>Sign Out</Text>
            </TouchableOpacity>
       </View> 
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