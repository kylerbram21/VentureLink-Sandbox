import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import {useRef, useState} from 'react'
import  {auth ,firestore} from "../../firebase"
import {getDoc, query, setDoc, where} from 'firebase/firestore'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {doc, addDoc, getDocs, collection, updateDoc} from "firebase/firestore"





export default function Messges(){
    const [message, setMessage] = useState("")
    const [userId, setUserId] = useState("")
    const uId = "sCfbm7In81Rkz3EaHXiCfdyj0th1"
    
    const koltenUId = "kioo9ThBTiUrdFoh4mNPKRNZZVC2" 
   
    const connectBuisnessInvestor = async () => {
        
    
     const ref = doc(firestore, "users", koltenUId)
     let companyData = {}

     try{
         const snapShot = await getDoc(ref)
         if(snapShot.exists()){
           companyData = snapShot.data()
         }

     }catch(err){

     }
      
     const newData = {...companyData, match:[...companyData.match, userId]}
     console.log(newData)
        
        try{
             updateDoc(ref,newData)
        }catch(err){
            console.log(err)
        }
    }

   const createChatRoom = async () => {
    const ref = collection(firestore, "chat-rooms")
    const chatData = {
                    [userId]: [],  
                    [koltenUId]: [],            
                }

        try{
            await addDoc(ref, chatData)
        }catch(err){
            console.log(err)
        }
   }

    

    function SignIn(){
  
        const signInWithGoogle = () => {
           signInWithEmailAndPassword(auth, "kylerbram21@gmail.com", "test12")
           .then((userCredential) => {
               console.log(userCredential.user.uid)
               setUserId(userCredential.user.uid)
           }).catch((err)=> {
                console.log(err)
           })
        }
        
        return (
            <TouchableOpacity onPress={signInWithGoogle}>
                <Text>Sign In</Text>
            </TouchableOpacity>
        )
    }
   

    function SignOut() {
        return auth.currentUser && (
            
            <TouchableOpacity onPress={() => auth.signOut()}>
                <Text>Sign out</Text>
            </TouchableOpacity>
        )
    }
    
  
    
    function ChatMessages(props:any){
        const{ text, uid } = props.message
    
        //const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recieved';
    
        return(
            <View className={'message ${messageClass}'}>
                <image> source={require('../../assets/images/VentureLinkLogo.webp')}</image>
                <Text> {text} </Text>
            </View>
        )
    }
    

    // const sendMessage = async(e) => {

    //     const { uid, photoURL} = auth.currentUser;

    //     await messagesRef.add({
    //         text: formValue,
    //         createdAt: firestore.firestore.FieldValue.serverTimestamp(),
    //         uid,
    //         photoURL
    //     })

    //     setFormValue('')

    //     dummy.current.scrollIntoView({ behavior: 'smooth' })
    // }

    
    return(
        <View style={styles.filler}>
          <View>
          {SignIn()}
          </View>   

          {/* <View>
            {messages && ChatMessages.map(msg => <ChatMessages key={msg.id} message={msg} />)}
          </View>

          <View onSubmit={sendMessage}>
            <TextInput value={formValue} onChange={(e) => setFormValue(e.target.value)}> </TextInput> 
          </View>*/}
            <TouchableOpacity
            >
                <Text> Sumbit </Text>
            </TouchableOpacity>

            <View> 
                <TouchableOpacity onPress={()=> connectBuisnessInvestor()}>
                    
                    <Text>Investor wants your Business</Text>
                </TouchableOpacity>
            </View>

            <View>
            <TouchableOpacity onPress={()=> createChatRoom()}>
               <Text>I'd Love To Do Buisness!!</Text>
            </TouchableOpacity>
            </View>
          </View>

        
    )


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
    height: 10,
    minHeight: 50,
    color: 'white',
    position: 'absolute',
    width: '100%',
    maxWidth: 728,
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

})