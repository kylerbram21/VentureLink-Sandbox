import { View, Image, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, FlatList, Dimensions } from "react-native" 
import { useState, useEffect } from "react"
import Dropdown from "./Dropdown"
import { Colors } from "@/constants/Colors"
import { signOut } from "firebase/auth"
import { auth, firestore } from "@/firebase"
import useUser from "@/hooks/useUser"
import { doc, getDoc, updateDoc } from "firebase/firestore"



const { width } = Dimensions.get("window")

export default function CompanyProfile(props:any){

    const user = useUser()

    const [userInfo, setUserInfo] = useState({})
    const [picture, setPicture] = useState("")
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [industry, setIndustry] = useState("")
    const [model, setModel] = useState("")
    const [portfolioUrl, setPortfolioUrl] = useState("")

    const companyPhotos = [ "https://bramnationweb.com/static/media/heroImage.bcfa7b9dc724694e2793.png", "https://bramnationweb.com/static/media/heroImage.bcfa7b9dc724694e2793.png", "https://bramnationweb.com/static/media/heroImage.bcfa7b9dc724694e2793.png", "https://bramnationweb.com/static/media/heroImage.bcfa7b9dc724694e2793.png", "https://bramnationweb.com/static/media/heroImage.bcfa7b9dc724694e2793.png", "last"] 

     useEffect(()=> {
         getUserData()
     
      }, [useUser()])
      
    const getUserData = async() => {
     
           try{
              const ref = doc(firestore, "users", user.uid)
              const snapShot = await getDoc(ref)
    
              if(snapShot.exists()){
                const userData = snapShot.data()

                setUserInfo(userData)
                
                setLocation(userData.location)
                setName(userData.name)
                setPicture(userData.picture)
                setIndustry(userData.industry)
                setPortfolioUrl(userData.portfolioUrl)
                setModel(userData.model)
              }
           }catch(err){
              console.log(err)
           }
       }
    
    const handleChange = (field:string, value:string)=> {
         
        let newData = userInfo

        newData[field] = value

        setUserInfo(newData)
     
    }
    
    
    const handleSave = async () => {
        
        const ref = doc(firestore, "users", user.uid)
        let data = {...userInfo,
           location: location,
           name: name,
           industry: industry,
           portfolioUrl: portfolioUrl
        }
        
        try {
            updateDoc(ref,data);
        }catch(e){
            console.log(e);
        }
    };


   function signOutUser(){
    signOut(auth).then(() => {
      
   }).catch((error) => {
     console.log(error)
   })
} 
  
    return(
        <View style={styles.profileMainContainer}>
          <View style={styles.profilePictureContainer}>
            <Image style={styles.profilePicture} source={{uri: picture}}/>
            <TextInput style={styles.nameInput} value={name} onChange={(evt)=> setName(evt.target.value)}/>
            <TextInput style={styles.locationInput} value={location} onChange={(evt)=> setLocation(evt.target.value)}/>
          </View>

          <View style={styles.picturesContainer}>
            <Text style={{fontSize: 30,  textAlign:"center", marginBottom: 20}}>Pitch Deck</Text>
            <FlatList
              data={companyPhotos}
              numColumns={3} // 3 columns
              columnWrapperStyle={{ justifyContent: "space-between", marginBottom: 10}}
              renderItem={({ item }) => (
                <ImageBackground source={{uri: `${item}`}} style={styles.pictureContainer}>
             
                 </ImageBackground>
                )}
              keyExtractor={(item) => item}
            />

          </View>

          <View style={styles.profilePictureContainer}>
            <View style={{display:"flex", flexDirection: "row", justifyContent:"center", alignItems:"center", marginBottom: 20}}>
              <Text style={styles.inputTitle}>Industry:</Text>    
              <TextInput style={styles.normalInput} value={industry} onChange={(evt)=> setIndustry(evt.target.value)}/>
            </View>
            <View style={{display:"flex", flexDirection: "row", justifyContent:"center", alignItems:"center", marginBottom: 20}}>
              <Text style={styles.inputTitle}>Reveune Model:</Text>    
              <TextInput style={styles.normalInput} value={model} onChange={(evt)=> setModel(evt.target.value)}/>
            </View>
            <View style={{display:"flex", flexDirection: "row", justifyContent:"center", alignItems:"center", marginBottom: 20}}>
              <Text style={styles.inputTitle}>Portfolio Url:</Text>    
              <TextInput style={styles.normalInput} value={portfolioUrl} onChange={(evt)=> setPortfolioUrl(evt.target.value)}/>
            </View>
            
          </View>
          <View style={{display:"flex", flexDirection: "row", justifyContent:"center", alignItems:"center", marginBottom: 20, marginTop: 20}}>
            <TouchableOpacity style={styles.saveButton} onPress={()=> handleSave()}>
               <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.saveButton, backgroundColor:"#fff", marginLeft: 20}} onPress={()=> signOutUser()}>
              <Text style={{...styles.saveButtonText, color:Colors.primaryColor}}>Sign Out</Text>
            </TouchableOpacity>
          </View>
               
        </View>
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
      height: "100%",
      padding: 20
    },
    profilePictureContainer:{
       display: "flex",
       alignItems:"center",
       marginTop: 30,
       marginBottom: 30
    },
    profilePicture:{
        borderRadius: 300,
        width: 300, 
        height: 300,
        marginBottom: 10
    },
    nameInput:{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        fontSize: 30,
        textAlign:"center"
    }, 
    locationInput:{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: "auto",
        fontSize: 20,
        textAlign:"center"
    },
    picturesContainer:{
      width: "90%",
      borderTopWidth: 1,
      borderColor: "#fff",
      paddingTop: 20,
      textAlign:"center"
    },
    pictureContainer:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      width: width / 4,
      height: width / 4,
      borderRadius: 20,
      backgroundColor: "#fff"
    },
    normalInput:{
        display:"flex",
        justifyContent: "center",
        alignItems: "center",
        width: 130,
        fontSize: 20,
        marginLeft: 10,
        backgroundColor: "#fff"
    },
    inputTitle:{
        fontSize: 20
    },
    saveButton:{
     display:"flex",
     justifyContent:"center",
     alignItems:"center",
     backgroundColor: Colors.primaryColor,
     width: 100,
     padding: 10,
     marginBottom: 20,
     shadowColor: '#000',
     borderRadius: 20,
     shadowOffset: { width: 0, height: 1 },
     shadowOpacity: 0.8,
     shadowRadius: 1,  
    }, 
    saveButtonText:{
      color: "#fff",
      fontSize: 20
    }

})