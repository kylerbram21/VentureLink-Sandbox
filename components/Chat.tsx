import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { useEffect, useState } from "react";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { Colors } from "@/constants/Colors";
import { firestore } from "../firebase";

export default function Chat(props: any) {
  const { currentChat, setCurrentChat, type } = props;
  const right = type === "company" ? currentChat.companyInfo : currentChat.investorInfo;
  const left = type === "investor" ? currentChat.companyInfo : currentChat.investorInfo;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // 🔁 Real-time Firestore listener
  function listenToMessages(chatId: string, callback: (msgs: any[]) => void) {
    const chatDocRef = doc(firestore, "chat-rooms", chatId);

    return onSnapshot(chatDocRef, (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const sorted = (data.messages || []).sort((a, b) => b.time - a.time);
        callback(sorted);
      }
    });
  }

  useEffect(() => {
    if (currentChat?.id) {
      const unsubscribe = listenToMessages(currentChat.id, setMessages);
      return () => unsubscribe(); // cleanup on unmount
    }
  }, [currentChat]);

  const sendMessage = async () => {
    try {
      const ref = doc(firestore, "chat-rooms", currentChat.id);
      const newMsg = { time: Date.now(), owner: type, message: newMessage };

      const updatedData = {
        ...currentChat,
        messages: [...(currentChat.messages || []), newMsg],
      };

      await updateDoc(ref, updatedData);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const handleNewMessage = () => {
    const newMsg = { time: Date.now(), message: newMessage, owner: type };
    setMessages([...messages, newMsg]); // immediate feedback
    sendMessage();
  };

  return (
    <View>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setCurrentChat({})}>
          <Text style={{ marginRight: 650, fontSize: 40 }}>Back</Text>
        </TouchableOpacity>
        <Text style={{ marginRight: 650, fontSize: 40 }}>{currentChat.name}</Text>
      </View>

      <ScrollView>
        <View style={styles.mainBody}>
          {messages.map((message, index) => (
            <View key={`message-${index}`} style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              {message.owner === type ? (
                <View style={{ ...styles.messageContainerUser, alignSelf: "flex-end", backgroundColor: Colors.primaryColor, marginTop: index === 0 ? 100: 0 }}>
                  <View style={styles.circle2}>
                    <Image
                      style={{ width: 60, height: 75, borderRadius: 180, alignSelf: "center" }}
                      source={{
                        uri: "https://media.licdn.com/dms/image/v2/D5603AQGOpo9gxHBjuA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1707611287888?e=1747872000&v=beta&t=GhJRc_X03KyKIXYaWX_zrXgc8qXgLJAL27Ez3ZNcWME",
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 25, marginRight: 20, color: "#fff" }}>{message.message}</Text>
                </View>
              ) : (
                <View style={{...styles.messageContainerUser, marginTop: index === 0 ? 100: 0} }>
                  <View style={styles.circle1}>
                    <Image
                      style={{ width: 60, height: 75, borderRadius: 180, alignSelf: "center" }}
                      source={{
                        uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAs_TDUTeHiZQ1tqLJlvItaBOjcmRTeoSbHw&s",
                      }}
                    />
                  </View>
                  <Text style={{ fontSize: 25 }}>{message.message}</Text>
                </View>
              )}
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={{ ...styles.header, marginTop: 550 }}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Message..."
            placeholderTextColor="#7C808D"
            selectionColor={"#3662AA"}
            value={newMessage}
            onChangeText={(text) => setNewMessage(text)}
          />

          <TouchableOpacity onPress={handleNewMessage}>
            <Text>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primaryColor,
    height: 80,
    minHeight: 50,
    color: "white",
    position: "absolute",
    width: "100%",
    top: 0,
    zIndex: 99,
    padding: 10,
    boxSizing: "border-box",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  mainBody: {
    display: "flex",
    alignItems: "center",
    backgroundColor: Colors.secondaryColor,
    height: 550,
    width: "100%",
    alignSelf: "center",
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
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 100,
    width: 325,
    flexDirection: "column",
    borderRadius: 100,
    marginBottom: 20,
  },
  messageContainerRecipient: {
    backgroundColor: Colors.primaryColor,
    height: 100,
    width: 325,
    flexDirection: "column",
    borderRadius: 100,
    left: 0,
    top: 225,
  },

  circle1: {
    position: "absolute",
    left: 7,
    top: 10,
    backgroundColor: Colors.secondaryColor,
    height: 75,
    width: 80,
    borderRadius: 180,
  },

  circle2: {
    position: "absolute",
    left: 235,
    top: 10,
    backgroundColor: "#C7B38F",
    height: 75,
    width: 80,
    borderRadius: 180,
    borderColor: "#000",
  },
});
