import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button, ScrollView } from "react-native";
import {useEffect, useRef, useState} from 'react'
import {doc, addDoc, getDocs, collection, updateDoc, getDoc, query, setDoc, where} from "firebase/firestore" 
import { Colors } from "@/constants/Colors"
import  {auth ,firestore} from "../firebase"


export default function Chat(props:any){
    const [chatInfo, setChatInfo] = useState()
    const {currentChat, setCurrentChat} = props
    const userInfo = {type:"investor"}
    const rightText = userInfo.type === "investor" 

    return(
        <View>
            <View style={styles.header}>
                <View>the go back button here</View>
                <Text style={{marginRight: 650, fontSize: 40,}}>Shrek inc{Chat.name}</Text>
            </View>
            <ScrollView>
            <View style={styles.mainBody}>
                <View style={styles.messageContainerRecipient}>
                         <View style={styles.circle1}>         
                              <Image style={{ width: 60, height: 75, borderRadius: 180, alignSelf: "center",}} source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAs_TDUTeHiZQ1tqLJlvItaBOjcmRTeoSbHw&s" }}/>
                         </View>
                </View>

                <View style={styles.messageContainerUser}>
                     <View style={styles.circle2}>         
                         <Image style={{ width: 60, height: 75, borderRadius: 180, alignSelf: "center",}} source={{ uri: "https://media.licdn.com/dms/image/v2/D5603AQGOpo9gxHBjuA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707611287888?e=1747872000&v=beta&t=GhJRc_X03KyKIXYaWX_zrXgc8qXgLJAL27Ez3ZNcWME" }}/>
                     </View>
                </View>
            </View>
            </ScrollView>
            <View style={{...styles.header, marginTop:550}}>
                <View style={styles.inputContainer}>
                    <TextInput 
                             style={styles.input} 
                             placeholder="Message..." 
                             placeholderTextColor="#7C808D" 
                             selectionColor={"#3662AA"}/>
                </View>
            </View>

        </View>
    )

    // export default function ChatRoom() {
    //     const messagesRef = firestore.collection('messages');
    //     const query = messagesRef.orderBy('createdAt').limit(25);
    //     const [messages] = useCollectionData(query, { idField: 'id' });
    //     const [formValue, setFormValue] = useState('');
    
    //     const sendMessage = async (evt) => {
    //         evt.preventDefault();
    
    //         const { uid, photoURL } = auth.currentUser;
    
    //         await messagesRef.add({
    //             text: formValue,
    //             createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    //             uid,
    //             picture: photoURL,
    //         });
    
    //         setFormValue('');
    //     };
    
    //     return (
    //         <ScrollView>
    //             <View>
    //                 {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
    //             </View>
    
    //             <View>
    //                 <TextInput
    //                     value={formValue}
    //                     onChangeText={setFormValue}
    //                     placeholder="Type a message"
    //                 />
    //                 <TouchableOpacity onPress={sendMessage}>
    //                     <Text>Click me!!</Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </ScrollView>
    //     );
    // }
    
    // function ChatMessage({ message }) {
    //     const { text, uid, picture } = message;
    
    //     const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
    //     return (
    //         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             {picture && <Image source={{ uri: picture }} style={{ width: 40, height: 40, borderRadius: 20 }} />}
    //             <Text>{text}</Text>
    //         </View>
    //     );
    // }


}

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.primaryColor,
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

      mainBody:{
        backgroundColor: Colors.secondaryColor,
        height: 550,
        width: '100%',
        marginTop: 80
      },

      inputContainer: {
        flexDirection: "row", 
        width: "100%",
        height: 1000,
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 20,
        position: "relative",
        color: "black",
      }, 
      input: {
        borderBottomWidth: 1.5,
        flex: 1,
        padding: 10,
        borderColor: "#000",
        fontSize: 16,
        
      },
      messageContainerUser: {
        backgroundColor: "#fff",
        height: 100,
        width: 325,
        flexDirection:"column",
        borderRadius: 100,
        right: 0,
        top:365,
        position:'absolute',

      },

      messageContainerRecipient: {
        backgroundColor: Colors.primaryColor,
        height: 100,
        width: 325,
        flexDirection:"column",
        borderRadius: 100,
        left: 0,
        top:225
      }, 

      circle1:{
        position: 'absolute',
        left: 7,
        top: 10,
        backgroundColor: Colors.secondaryColor,
        height: 75,
        width: 80,
        borderRadius:180
      },

      circle2:{
        position: 'absolute',
        left: 235,
        top: 10,
        backgroundColor: '#C7B38F',
        height: 75,
        width: 80,
        borderRadius:180,
        borderColor: '#000'
      },
        
})