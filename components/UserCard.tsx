import { useState, useEffect, useRef } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Modal, Dimensions } from "react-native"
import { Colors } from "@/constants/Colors"
import ImageSlider from "./ImageSlider"
import  {auth ,firestore} from "../firebase"
import {getDoc, query, setDoc, where, doc, addDoc, getDocs, collection, updateDoc} from 'firebase/firestore'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome, FontAwesome6, } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import useUser from "@/hooks/useUser"


const { width, height } = Dimensions.get("window")

export default function UserCard(){

    const [profileInfoVisible, setProfileInfoVisible] = useState(false)
    const [profileInfo, setProfileInfo] = useState({ id: "kioo9ThBTiUrdFoh4mNPKRNZZVC2" , name: "Sherk Inc", picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAs_TDUTeHiZQ1tqLJlvItaBOjcmRTeoSbHw&s", industry: "AI", location: "Orem, UT", model: "Subscritpions", pitchDeck: "https://bramnationweb.com", url: "https://bramnationweb.com", stage: "early"})
    const [nextProfileInfo, setNextProfileInfo] = useState({id: "kioo9ThBTiUrdFoh4mNPKRNZZVC2" , name: "Trump Tower", picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/TrumpPortrait.jpg/800px-TrumpPortrait.jpg", industry: "Food", location: "Lehi, UT", model: "Subscritpions", pitchDeck: "https://bramnationweb.com", url: "https://bramnationweb.com", stage: "early"})
    const [show, setShow] = useState(true)
    const [startSwipe, setStartSwipe] = useState(false)
    const [direction, setDirection] = useState("right")

    const thirdProfile = {id: "kioo9ThBTiUrdFoh4mNPKRNZZVC2" , name: "Faster than Light", picture: "https://us-tuna-sounds-images.voicemod.net/d748fc13-151a-47d5-b515-c21b41cda87c-1658461428512.jpg", industry: "Tech", location: "Provo, UT", model: "Subscritpions", pitchDeck: "https://bramnationweb.com", url: "https://bramnationweb.com", stage: "early"}
    const user = useUser()
    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("") 
    const swipe = (direction:string) => {

      if(direction === "right"){
        connectBuisnessInvestor()
     }

        setDirection(direction)
        setStartSwipe(true)

        setTimeout(() => {
  
            setProfileInfo(nextProfileInfo)
            
            setNextProfileInfo(thirdProfile)
            setStartSwipe(false)

        }, 500);

       
        
    }

    console.log(user.uid)

    const connectBuisnessInvestor = async () => {
         const companyRef = doc(firestore, "users", profileInfo.id)
         let companyData = {}
    
         try{
          
             const snapShot = await getDoc(companyRef)
             
             if(snapShot.exists()){
               companyData = snapShot.data()
               console.log(companyData)
             }
    
         }catch(err){
    
         }
          
         const newData = {...companyData, match:[...companyData.match, user.uid]}
         console.log(newData)
            
            try{
                 updateDoc(companyRef,newData)
            }catch(err){
                console.log(err)
            }
        }



    return(
        <View style={{backgroundColor: Colors.primaryColor}}>
            <View style={styles.introMainContainer}>
              <View style={{width: width, height: height / 1.7,}}>
                <ImageSlider shouldAnimate={false} direction={direction} profile={nextProfileInfo} setProfileInfoVisible={setProfileInfoVisible}/>
                <ImageSlider shouldAnimate={startSwipe} direction={direction} profile={profileInfo} setProfileInfoVisible={setProfileInfoVisible}/>
              </View>
              <View style={styles.buttonsMainContainer}>
                <View style={styles.swipeButtonsContainer}>
                  <TouchableOpacity style={styles.swipeButtonContainer}
                   onPress={()=> swipe("left")}
                  >
                     <Entypo name="cross" size={50} color="red" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.swipeButtonContainer}>
                  <Entypo name="message" size={50} color={Colors.primaryColor} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.swipeButtonContainer}
                    onPress={()=> swipe("right", )}
                  >
                     <AntDesign name="check" size={50} color="green" />
                  </TouchableOpacity>
                </View>    
                <View style={styles.websiteButtonContainer}>
                  <TouchableOpacity 
                   style={styles.websiteButton}
                   onPress={()=> console.log("here")}                  
                  >
                     <Text>Website</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Modal
             visible={profileInfoVisible}
             onRequestClose={()=> setProfileInfoVisible(false)}
             animationType={"slide"}
             style={{height: 200}}
             transparent={true}
            >
              <ScrollView contentContainerStyle={styles.profileInfoMainContainer}>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={()=> setProfileInfoVisible(false)}  
                >
                  <Entypo name="circle-with-cross" size={30} color="black" />
                </TouchableOpacity>
                 <View style={styles.profileInfoMiniContainer}>
                    <View style={styles.statContainer}>
                      <FontAwesome name="industry" size={35} color="black" />
                      <Text style={styles.statText}>{profileInfo.industry}</Text>
                    </View>
                    <View style={styles.statContainer}>
                      <Entypo name="location-pin" size={35} color="black" />
                      <Text style={styles.statText}>{profileInfo.location}</Text>
                    </View>
                    <View style={styles.statContainer}>
                      <Entypo name="credit" size={35} color="black" />
                      <Text style={styles.statText}>{profileInfo.model}</Text>
                    </View>
                    <View style={styles.statContainer}>
                      <FontAwesome6 name="seedling" size={35} color="black" />
                      <Text style={styles.statText}>{profileInfo.stage}</Text>
                    </View>
                 </View>
                 <View style={{...styles.profilePicContainer}}>
                   <View>
                   <Text style={{...styles.statText, alignItems:"center"}}>Pitch Deck or Company Photos</Text>
                   </View>
                   <View style={{...styles.pictureContainer}}>

                   </View>
                   <View style={{...styles.pictureContainer}}>

                   </View>
                   <View style={{...styles.pictureContainer}}>

                   </View>
                   <View style={{...styles.pictureContainer}}>

                   </View>
                   <View style={{...styles.pictureContainer}}>

                   </View>
                 </View>
                 <View style={{...styles.profileInfoMiniContainer, alignItems:"center"}}>
                   <Fontisto name="locked" size={60} color="black" />
                   <Text style={styles.statText}>Locked Until Matched</Text>
                 </View>
              </ScrollView>
             
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    introMainContainer:{
      display:"flex",
      alignItems: "center",
      width: "100%"
    },
    buttonsMainContainer:{
      maxWidth: 700,
      width: "100%"
    },
    swipeButtonsContainer:{
       display:"flex",
       flexDirection: "row",
       justifyContent: "space-around",
       marginTop: 20,
       marginBottom: 20
    }, 
    swipeButtonContainer:{
        display:"flex",
        alignItems:"center",
        justifyContent: "center",
        width: 75,
        height: 75,
        borderRadius: 70,
        backgroundColor: "#fff"
     }, 
    websiteButtonContainer:{
       display: "flex",
       alignItems: "center",
       justifyContent: "center",
       marginBottom: 20,
       paddingHorizontal: 20
    },
    websiteButton:{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width:"100%",
        height: 50,
        borderRadius: 20,
        backgroundColor: "#fff",
     },
     profileInfoMainContainer:{
        display: "flex",
        padding: 20,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#eee",
        height: height - 125,
        width: width,
        marginTop: 125,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
     },
     closeButton: {
         position: "absolute",
         right: 10, 
         top:10,
         zIndex:10
     },
     profileInfoMiniContainer:{
        display: "flex",
        justifyContent:"space-evenly",
        padding: 13,
        backgroundColor: "#fff",
        width:"100%",
        height: 250,
        borderRadius: 20,
        marginBottom: 25
     },
     statContainer:{
       display:"flex",
       flexDirection: "row",
       alignItems: "center"
     },
     statText:{
        fontSize: 20,
        marginLeft: 5,
     },

     profilePicContainer:{
      
      justifyContent:"space-evenly",
      padding: 13,
      backgroundColor: "#fff",
      width:"100%",
      height: 400,
      borderRadius: 20,
      marginBottom: 25,
      flexDirection: "row",
      flexWrap: 'wrap',
     },

     pictureContainer:{
      width: '15%', 
    aspectRatio: 1, // Makes items square
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
     
     }
})