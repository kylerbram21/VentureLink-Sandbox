import { useState, useEffect, useRef } from "react"
import { ScrollView, StyleSheet, TouchableOpacity, View, Text, Modal, Dimensions, Image } from "react-native"
import { Colors } from "@/constants/Colors"
import ImageSlider from "./ImageSlider"
import useUser from "@/hooks/useUser"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { FontAwesome, FontAwesome6, } from "@expo/vector-icons";
import Fontisto from '@expo/vector-icons/Fontisto';
import { collection, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore"
import { firestore } from "@/firebase"


const { width, height } = Dimensions.get("window")

export default function UserCard(){

    const user = useUser()

    const [profileInfoVisible, setProfileInfoVisible] = useState(false)
    const [profileInfo, setProfileInfo] = useState({name: "", picture: "", industry: "", location: "", model: "", pitchDeck: "", url: "", stage: "",  pitchDeck1: "", pitchDeck2: "", pitchDeck3: "",})
    const [nextProfileInfo, setNextProfileInfo] = useState({name: "", picture: "", industry: "", location: "", model: "", pitchDeck: "", url: "", stage: "", pitchDeck1: "", pitchDeck2: "", pitchDeck3: "",  })
    const [companyFeed, setCompanyFeed] = useState([])
    const [userInfo, setUserInfo] = useState({})
    const [show, setShow] = useState(true)
    const [startSwipe, setStartSwipe] = useState(false)
    const [direction, setDirection] = useState("right")


     useEffect(()=> {
            getUserData()
        
        }, [useUser()])
    
        useEffect(()=> {
          
            getCompanyFeed()
        }, [userInfo])
    
    
        useEffect(()=> {
             setFeed()
        }, [companyFeed])


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

        const getCompanyFeed = async() => {
        
                try{
                const companies = userInfo.companies || []
        
                
                
                const ref = collection(firestore, "users")
                
                const q = query(ref, where("__name__", "in", companies))
                
                const querySnapshot = await getDocs(q);
                
                const matchedUsersSnap:any = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
                setCompanyFeed(matchedUsersSnap)
                }catch(err){
                    console.log(err)
                }
        
                if(companyFeed.length > 0){
                    setFeed()
                }  
            }


            const setFeed = () => {

              if(companyFeed[0]){
                 setProfileInfo(companyFeed[0])
      
                 if(companyFeed[1]){
                    setNextProfileInfo(companyFeed[1])
                 
                  }                  
              }
          }

          
          const addInvestorToCompany = async (companyId:string, investorId:string) => {
      
            const companyRef = doc(firestore, "users", companyId) 
        
        
            const newCompanyData = {...profileInfo, match: [...profileInfo.match, investorId]}
                  
                try{
                    await updateDoc(companyRef, newCompanyData)
    
                }catch(err){
                    console.log(err)
                }
           }
    
    const swipe = (direction:string) => {

      setDirection(direction)
      setStartSwipe(true)
      

      if(direction === "right"){

         addInvestorToCompany(profileInfo.id, user.uid)

      }

      setTimeout(() => {
          
          const newConpanyFeed = companyFeed.slice(1)
          setCompanyFeed(newConpanyFeed)
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
                    <View style={styles.statContainer}>
                      <Entypo name="credit" size={35} color="black" />
                      <Text style={styles.statText}>{profileInfo.model}</Text>
                    </View>
                    <View style={styles.statContainer}>
                      <FontAwesome6 name="seedling" size={35} color="black" />
                      <Text style={styles.statText}>{profileInfo.stage}</Text>
                    </View>
                 </View>
                 <View style={{...styles.profilePicMiniContainer, alignItems:"center"}}>
                      <Image style={styles.testPic} source={{uri: `${profileInfo.pitchDeck1}`}} resizeMode="cover"/>
                 </View>
                 <View style={{...styles.profilePicMiniContainer, alignItems:"center"}}>
                      <Image style={styles.testPic} source={{uri: `${profileInfo.pitchDeck2}`}} resizeMode="cover"/>
                 </View>
                 <View style={{...styles.profilePicMiniContainer, alignItems:"center"}}>
                      <Image style={styles.testPic} source={{uri: `${profileInfo.pitchDeck3}`}} resizeMode="cover"/>
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
      width: "100%",
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
     profileInfoMainContainer:{
        display: "flex",
        padding: 20,
        alignItems: "center",
        alignSelf: "flex-end",
        backgroundColor: "#eee",
        height: height * 2.65,
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
     },

     testPic:{
      height:'75%',
      width: '75%'
     },
    
     profilePicMiniContainer:{
      display: "flex",
      justifyContent:"space-evenly",
      padding: 13,
      backgroundColor: "#fff",
      width:400,
      height: 450,
      borderRadius: 20,
      marginBottom: 25
   },
})