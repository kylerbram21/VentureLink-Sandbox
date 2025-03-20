import { useState, useEffect, useRef } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Modal, Dimensions } from "react-native"
import { Colors } from "@/constants/Colors"
import ImageSlider from "./ImageSlider"

import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome,} from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import { collection, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { firestore } from "../firebase"
import useUser from "@/hooks/useUser";

import {v4 as uuidv4} from 'uuid';


const { width, height } = Dimensions.get("window")

export default function CompanyCard(){

    const user = useUser()

    const [userInfo, setUserInfo] = useState({})
    const [profileInfoVisible, setProfileInfoVisible] = useState(false)
    const [profileInfo, setProfileInfo] = useState({})
    const [nextProfileInfo, setNextProfileInfo] = useState({name: "Deez Nutz Inc", picture: "https://i1.sndcdn.com/artworks-ui4wyyS2cm5nTGl6-3aaEjw-t500x500.jpg", industry: "AI", location: "Orem, UT", portfolioUrl: ""})
    const [matchedUsers, setMatchedUsers] = useState([])
    const [show, setShow] = useState(true)
    const [startSwipe, setStartSwipe] = useState(false)
    const [direction, setDirection] = useState("right")


    useEffect(()=> {
        getUserData()
    
    }, [useUser()])

    useEffect(()=> {
      
        getPotentialInvestors()
    }, [userInfo])


    useEffect(()=> {
         setFeed()
    }, [matchedUsers])
    
    
      const getUserData = async () =>{
    
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

      const createChatRoom = async (investorId:string, companyId:string) => {
    
        const uId = uuidv4();
        
        const chatRoomRef = doc(firestore, "chat-rooms", uId)
        const investorRef = doc(firestore, "users", investorId)
        const companyRef = doc(firestore, "users", companyId) 
    
    
        const chatData = {
                        [companyId]: [],  
                        [investorId]: [],            
                    }
              
            try{
                await setDoc(chatRoomRef, chatData)

                const newInvestorData = {...profileInfo, chatRooms: [...profileInfo.chatRooms, uId]}
                const newCompanyData = {...userInfo, chatRooms: [...userInfo.chatRooms, uId]}

                await updateDoc(investorRef, newInvestorData)
                await updateDoc(companyRef, newCompanyData)
            }catch(err){
                console.log(err)
            }
       }

      

    const getPotentialInvestors = async() => {

        try{
        const match = userInfo.match || []

        
        
        const ref = collection(firestore, "users")
        
        const q = query(ref, where("__name__", "in", match))
        
        const querySnapshot = await getDocs(q);
        
        const matchedUsersSnap:any = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setMatchedUsers(matchedUsersSnap)
        }catch(err){
            console.log(err)
        }

        if(matchedUsers.length > 0){
            setFeed()
        }
      
        
    }

    const setFeed = () => {

        if(matchedUsers[0]){
           setProfileInfo(matchedUsers[0])

           if(matchedUsers[1]){
              setNextProfileInfo(matchedUsers[1])
           }else{
        
           
           }
        }

   
    }

    const swipe = (direction:string) => {

        setDirection(direction)
        setStartSwipe(true)
        

        if(direction === "right"){

           createChatRoom(profileInfo.id, user.uid)

        }

        setTimeout(() => {
            
            const newMatchedUsers = matchedUsers.slice(1)
            setMatchedUsers(newMatchedUsers)
            setStartSwipe(false)

        }, 500);

       

    }



    return(
        <View style={{backgroundColor: Colors.primaryColor}}>
            <View style={styles.introMainContainer}>
              <View style={{width: width, height: height / 1.6,}}>
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
                    onPress={()=> swipe("right")}
                  >
                     <AntDesign name="check" size={50} color="green" />
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
        marginLeft: 5
     }
})