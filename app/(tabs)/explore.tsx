
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Button } from "react-native";
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from "@/constants/Colors"
import { Feather } from "@expo/vector-icons"

export default function TabTwoScreen() {
  return (
    <View style={styles.upperBody}>
      <View style={styles.upperBody}>
        <View style={styles.whiteSearchContainer}>          
           
           <Feather name="search" size={22} color="#000"/>
             <TextInput 
                 style={{marginTop:5, marginLeft:5, fontSize:16}} 
                 placeholder="Search..." 
                 placeholderTextColor="#7C808D" 
                 selectionColor={"#3662AA"}/>
            

        </View>

      </View>

      <View style={styles.whiteLine}>

      </View>

      <View style={styles.lowerBody}>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({

        upperBody:{
          backgroundColor: Colors.secondaryColor,
          height: 325,
          width: '100%',
          justifyContent: 'space-evenly',
          alignItems: "center",
          display: 'flex'
        },

        
        lowerBody:{
          backgroundColor: Colors.primaryColor,
          height: 325,
          width: '100%',
        },

        whiteLine:{
          backgroundColor: "#fff",
          height: 15,
          width: '100%'
        },

        whiteSearchContainer:{
          display:"flex",
          flexDirection:"row",
          alignItems:"center",
          backgroundColor: '#fff',
          borderRadius: 90, 
          height: 35,
          width: 300,
          marginBottom:75,
          paddingHorizontal:10
          
        }, 

        inputContainer: {
          flexDirection: "row", 
          width: "100%",
          height: 1000,
          marginBottom: 250
        }, 

        input: {
          borderBottomWidth: 1.5,
          flex: 1,
          padding: 5,
          borderColor: "#000",
          fontSize: 16,
          
        },
        icon: {
          marginRight: 15, 
        }

});
