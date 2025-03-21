import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native";
import {useEffect, useRef, useState} from 'react'
import  {auth ,firestore} from "../../firebase"
import {getDoc, query, setDoc, where} from 'firebase/firestore'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {doc, addDoc, getDocs, collection, updateDoc} from "firebase/firestore"
import { Colors } from "@/constants/Colors"
import useUser from "@/hooks/useUser";
import Chat from "../../components/Chat"

const shrekDaddy = [{id: "1", companyInfo: {name: "Shrek Inc", picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAs_TDUTeHiZQ1tqLJlvItaBOjcmRTeoSbHw&s", messages: ["Shrek is Love, Shrek is Life"]}, investorInfo: {name: "", picture: "", messages: []}}, {id: "2", companyInfo: {name: "Trump Towers", picture: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/TrumpPortrait.jpg/800px-TrumpPortrait.jpg", messages: []}, investorInfo: {name: "", picture: "", messages: []}}, {id: "3", companyInfo: {name: "Faster than Light", picture: "https://us-tuna-sounds-images.voicemod.net/d748fc13-151a-47d5-b515-c21b41cda87c-1658461428512.jpg", messages: []}, investorInfo: {name: "", picture: "", messages: []}}]

const { height } = Dimensions.get("window")

export default function Messges(){

    const user = useUser()

    
    const [userInfo, setUserInfo] = useState({})
    const [chatInfo, setChatInfo] = useState([])
    const [currentChat, setCurrentChat] = useState({})
    
    
      useEffect(()=> {
        getUserData()
      }, [useUser()])

      useEffect(()=> {
    
        if(Object.keys(userInfo).length !== 0){
          getChats()
        }
      }, [userInfo])


      const getChats = async() => {
        try{
        
          const chats = userInfo.chatRooms || []
  
          
          
          const ref = collection(firestore, "chat-rooms")
          
          const q = query(ref, where("__name__", "in", chats))
          
          const querySnapshot = await getDocs(q);
          
          const chatRooms:any = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  
           setChatInfo(chatRooms)
          }catch(err){
              console.log(err)
          }

        
      }
    
      const getUserData = async () =>{
    
        try{
         const ref = doc(firestore, "users", user.uid)
         const snapShot = await getDoc(ref)
    
         if(snapShot.exists()){
          
          const userData = snapShot.data()
          console.log(userInfo)
          setUserInfo(userData)
          console.log(userInfo)
         
         }
        }catch(err){
    
        }
      }



    return(
    <View style={{backgroundColor: Colors.primaryColor, height: height}}>
        { Object.keys(currentChat).length === 0 ?
        <View>
          <Text style={{fontSize: 40, color:"#fff", marginTop: 20, marginBottom: 20, marginLeft: 20}}>Chat Rooms:</Text>
          {chatInfo.length > 0 ?
            <View>
              {chatInfo.map((item, index)=> {

                 const chat = userInfo.type === "investor" ? item.companyInfo : item.investorInfo
              
                 return(
                    <TouchableOpacity
                      key={`${index}-${chat.name}`}
                      onPress={()=> setCurrentChat(chatInfo[index])}
                      style={styles.profileInfoMainContainer}
                    >
                      <Image style={{ width: 80, height: 80, borderRadius: 180, alignSelf: "center",}} source={{ uri: chat.picture}}/>
                      <View style={styles.textContainer}>
                          <Text style={{fontSize:35}}>{chat.name}</Text>
                          <Text style={{ fontSize:25, opacity:0.5, marginLeft: 20}}>{"No Messages Yet"}</Text>
                      </View> 
                </TouchableOpacity> 
             )
           })}
         </View>
          : null}
       </View> :
       <Chat currentChat={currentChat} setCurrentChat={setCurrentChat} type={userInfo.type}/>}
        
    </View>
    )



//     const [message, setMessage] = useState("")
//     const [userId, setUserId] = useState("")
//     const uId = "sCfbm7In81Rkz3EaHXiCfdyj0th1"
    
//     const koltenUId = "kioo9ThBTiUrdFoh4mNPKRNZZVC2" 
   
//     const connectBuisnessInvestor = async () => {
        
    
//      const ref = doc(firestore, "users", koltenUId)
//      let companyData = {}

//      try{
//          const snapShot = await getDoc(ref)
//          if(snapShot.exists()){
//            companyData = snapShot.data()
//          }

//      }catch(err){

//      }
      
//      const newData = {...companyData, match:[...companyData.match, userId]}
//      console.log(newData)
        
//         try{
//              updateDoc(ref,newData)
//         }catch(err){
//             console.log(err)
//         }
//     }

//    const createChatRoom = async () => {
//     const ref = collection(firestore, "chat-rooms")
//     const chatData = {
//                     [userId]: [],  
//                     [koltenUId]: [],            
//                 }

//         try{
//             await addDoc(ref, chatData)
//         }catch(err){
//             console.log(err)
//         }
//    }

    

//     function SignIn(){
  
//         const signInWithGoogle = () => {
//            signInWithEmailAndPassword(auth, "kylerbram21@gmail.com", "test12")
//            .then((userCredential) => {
//                console.log(userCredential.user.uid)
//                setUserId(userCredential.user.uid)
//            }).catch((err)=> {
//                 console.log(err)
//            })
//         }
        
//         return (
//             <TouchableOpacity onPress={signInWithGoogle}>
//                 <Text>Sign In</Text>
//             </TouchableOpacity>
//         )
//     }
   

//     function SignOut() {
//         return auth.currentUser && (
            
//             <TouchableOpacity onPress={() => auth.signOut()}>
//                 <Text>Sign out</Text>
//             </TouchableOpacity>
//         )
//     }
    
  
    
//     function ChatMessages(props:any){
//         const{ text, uid } = props.message
    
//         //const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    
//         return(
//             <View className={'message ${messageClass}'}>
//                 <image> source={require('../../assets/images/VentureLinkLogo.webp')}</image>
//                 <Text> {text} </Text>
//             </View>
//         )
//     }
    

//     // const sendMessage = async(e) => {

//     //     const { uid, photoURL} = auth.currentUser;

//     //     await messagesRef.add({
//     //         text: formValue,
//     //         createdAt: firestore.firestore.FieldValue.serverTimestamp(),
//     //         uid,
//     //         photoURL
//     //     })

//     //     setFormValue('')

//     //     dummy.current.scrollIntoView({ behavior: 'smooth' })
//     // }

    
//     return(
//         <View style={styles.filler}>
//           <View>
//           {SignIn()}
//           </View>   

//           {/* <View>
//             {messages && ChatMessages.map(msg => <ChatMessages key={msg.id} message={msg} />)}
//           </View>

//           <View onSubmit={sendMessage}>
//             <TextInput value={formValue} onChange={(e) => setFormValue(e.target.value)}> </TextInput> 
//           </View>*/}
//             <TouchableOpacity
//             >
//                 <Text> Sumbit </Text>
//             </TouchableOpacity>

//             <View> 
//                 <TouchableOpacity onPress={()=> connectBuisnessInvestor()}>
                    
//                     <Text>Investor wants your Business</Text>
//                 </TouchableOpacity>
//             </View>

//             <View>
//             <TouchableOpacity onPress={()=> createChatRoom()}>
//                <Text>I'd Love To Do Buisness!!</Text>
//             </TouchableOpacity>
//             </View>
//           </View>

        
//     )


}

const styles = StyleSheet.create({
  filler:{
    backgroundColor: "#fff"
  },

  body: {
    backgroundColor: '#282c34',
    flex: 1,
  },

  app: {
    textAlign: 'center',
    maxWidth: 728,
    marginHorizontal: 'auto',
  },

  header: {
    backgroundColor: '#181717',
    height: 80,
    minHeight: 50,
    color: 'white',
    position: 'absolute',
    width: "100%",
    top: 0,
    zIndex: 99,
    padding: 10,
    boxSizing: 'border-box',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  section: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    minHeight: 100,
    backgroundColor: 'rgb(40, 37, 53)',
  },

  main: {
    padding: 10,
    height: 80,
    marginVertical: 10,
    overflow: 'scroll',
    flexDirection: 'column',
  },

  form: {
    height: 10,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'rgb(0, 0, 0)',
    width: '100%',
    maxWidth: 728,
    flexDirection: 'row',
    fontSize: 24,
  },

  formButton: {
    width: '20%',
    backgroundColor: 'rgb(56, 56, 143)',
  },

  input: {
    lineHeight: 1.5,
    width: '80%',
    fontSize: 24,
    backgroundColor: 'rgb(58, 58, 58)',
    color: 'white',
    borderWidth: 0,
    paddingHorizontal: 10,
  },

  button: {
    backgroundColor: '#282c34',
    borderWidth: 0,
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 32,
    textAlign: 'center',
    fontSize: 20,
    cursor: 'pointer',
  },

  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },

  signIn: {
    color: '#282c34',
    backgroundColor: 'white',
    maxWidth: 400,
    marginHorizontal: 'auto',
  },

  list: {
    textAlign: 'left',
  },

  message: {
    display: 'flex',
    alignItems: 'center',
  },

  sent: {
    flexDirection: 'row-reverse',
  },

  sentText: {
    color: 'white',
    backgroundColor: '#0b93f6',
    alignSelf: 'flex-end',
  },

  receivedText: {
    backgroundColor: '#e5e5ea',
    color: 'black',
  },

  messageText: {
    maxWidth: 500,
    marginBottom: 12,
    lineHeight: 24,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    position: 'relative',
    color: 'white',
    textAlign: 'center',
  },

  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
    marginVertical: 2,
  },

  profileInfoMainContainer:{
    padding: 13,
    backgroundColor: Colors.secondaryColor,
    width:"95%",
    height: 100,
    borderRadius: 20,
    marginLeft: 39,
    marginBottom: 10,
    flexDirection: "row",
    flexWrap: 'wrap',
     },

  circle:{
    position: 'absolute',
    left: 15,
    top: 10,
    backgroundColor: Colors.primaryColor,
    height: 80,
    width: 80,
    borderRadius:180
  },

  emptySpace:{
    margin: 45
  },
  textContainer:{
    marginLeft: 20
  }

})

