
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Modal, Image, ScrollView, SafeAreaView, Touchable} from 'react-native';
import { useState } from 'react';
import { Colors } from "@/constants/Colors"

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from "../../firebase"


import { Feather } from "@expo/vector-icons"


export default function LoginScreen() {

  const [loginScreenVisible, setLoginScreenVisible] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPasword, setShowPassword] = useState(false)



  function login(){

     signInWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
           
      })
      .catch((error) => {
            console.log(error)
      })
  }

  function signUp(){
    createUserWithEmailAndPassword(auth, email, password)
     .then((userCredential) => {
      
  })
  .catch((error) => {
     console.log(error)
  });
  }


  return (
    <View style={styles.container}>
       {loginScreenVisible ? 
        <View style={styles.container}>
        <Image
           style={{ width: 150, height: 150 }}
           source={require("../../assets/images/react-logo.png")}
         />
          <View>
          <Text >Welcome to VentureLink</Text>
          <View> 
          <Text style={{...styles.words}}>Login to your Account!</Text>
            <View style={styles.inputContainer}>
              <View style={styles.icon}>
                <Feather name="mail" size={22} color="#000"/> 
              </View>
                <TextInput 
                  value={email}
                  onChangeText={(newText)=> setEmail(newText)}
                  style={styles.input} 
                  placeholder="Email" 
                  placeholderTextColor="#000" 
                  selectionColor={"#000"}/>
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.icon}>
                <Feather name="lock" size={22} color="#000"/> 
              </View>
                <TextInput 
                  value={password}
                  onChangeText={(newText)=> setPassword(newText)}
                  secureTextEntry={!showPasword}
                  style={styles.input} 
                  placeholder="Password" 
                  placeholderTextColor="#000" 
                  selectionColor={"#000"}
                />
                <TouchableOpacity 
                  style={styles.passwordVisibleButton}
                  onPress={()=> setShowPassword(!showPasword)}  
                >
                  <Feather name="eye-off" size={20} color="#000"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.forgotPasswordButton}>
              <Text style={styles.forgotPasswordButtonText}>Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={()=> login()}
              style={styles.loginButton}  
            >
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.signUpButton}
              onPress={() => setLoginScreenVisible(false)}
            >
              <Text style={styles.signUpButtonText}>Don't have an account? Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View> :
      <View style={styles.container}>
      <Image
         style={{ width: 150, height: 150 }}
         source={require("../../assets/images/react-logo.png")}
       />

      <View>
        <Text>Welcome to Skill Build</Text>
        <View> 
        <Text style={{...styles.words}}>Sign up for an Account!</Text>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="mail" size={22} color="#7C808D"/> 
            </View>
            <TextInput 
              value={email}
              onChangeText={(newText)=> setEmail(newText)}
              style={styles.input} 
              placeholder="Email" 
              placeholderTextColor="#000" 
              selectionColor={"#000"}/>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="lock" size={22} color="#7C808D"/> 
            </View>
            <TextInput 
              value={password}
              onChangeText={(newText)=> setPassword(newText)}
              secureTextEntry={!showPasword}
              style={styles.input} 
              placeholder="Password" 
              placeholderTextColor="#7C808D" 
              selectionColor={"#3662AA"}
            />
              <TouchableOpacity style={styles.passwordVisibleButton}>
                <Feather name="eye-off" size={20} color="#7C808D"/>
              </TouchableOpacity>
          </View>
          
          <TouchableOpacity 
            style={{...styles.loginButton, backgroundColor: Colors.secondaryColor, marginTop: 43}}
            onPress={()=> signUp()}
          >
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signUpButton}
            onPress={()=> setLoginScreenVisible(true)}
          >
            <Text style={styles.signUpButtonText}>Already have account? Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View> 
      }
    </View>
  );
}


const styles = StyleSheet.create({
  words: {
    fontSize: 15, 
    fontWeight: "100",
    marginBottom: 40,
    textAlign: "center"
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.secondaryColor,
  },

  inputContainer: {
    flexDirection: "row", 
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative"
  }, 

  icon: {
    marginRight: 15, 

  }, 
  loginIcon: {
    marginLeft: 15,
  },

  input: {
    borderBottomWidth: 1.5,
    flex: 1,
    padding: 10,
    borderColor: "#000",
    fontSize: 16,
    
  },

  passwordVisibleButton: {
    position: "absolute",
    right: 0,
  },

  forgotPasswordButton: {
    alignSelf: "flex-end",
  },
  
  forgotPasswordButtonText: {
    color: "#3662AA",
    fontSize: 16,
    fontWeight: "500",
  },

  loginButton: {
    backgroundColor: Colors.primaryColor,
    padding: 14,
    borderRadius: 10, 
    marginTop: 20,
  },

  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  
  signUpButton: {
    alignSelf: "center",
    padding: 14
  },

  signUpButtonText:{
    color: "#3662AA",
    fontSize: 16,
    fontWeight: "500",
  }
})
