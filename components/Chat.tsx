import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import {useEffect, useRef, useState} from 'react'
import {doc, addDoc, getDocs, collection, updateDoc, getDoc, query, setDoc, where} from "firebase/firestore" 
import  {auth ,firestore} from "../firebase"
import { useCollectionData } from 'react-firebase-hooks/firestore';

    export default function ChatRoom() {
        const messagesRef = firestore.collection('messages');
        const query = messagesRef.orderBy('createdAt').limit(25);
        const [messages] = useCollectionData(query, { idField: 'id' });
        const [formValue, setFormValue] = useState('');
    
        const sendMessage = async (evt) => {
            evt.preventDefault();
    
            const { uid, photoURL } = auth.currentUser;
    
            await messagesRef.add({
                text: formValue,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                uid,
                picture: photoURL,
            });
    
            setFormValue('');
        };
    
        return (
            <ScrollView>
                <View>
                    {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
                </View>
    
                <View>
                    <TextInput
                        value={formValue}
                        onChangeText={setFormValue}
                        placeholder="Type a message"
                    />
                    <TouchableOpacity onPress={sendMessage}>
                        <Text>Click me!!</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
    
    function ChatMessage({ message }) {
        const { text, uid, picture } = message;
    
        const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
    
        return (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {picture && <Image source={{ uri: picture }} style={{ width: 40, height: 40, borderRadius: 20 }} />}
                <Text>{text}</Text>
            </View>
        );
    }

const style = StyleSheet.create({

})