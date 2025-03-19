import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';

const { width, height } = Dimensions.get("window")

function ImageSlider(props:any){

  const translateX = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const {shouldAnimate, direction, profile,} = props

  useEffect(() => {
    if (shouldAnimate) {
      Animated.parallel([
        Animated.timing(translateX, {
          toValue: direction === "right" ? 200 : -200, // Moves 100px to the right
          duration: 450,
          easing: Easing.bezier(0.755, 0.050, 0.855, 0.060),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0, // Fades out
          duration: 450,
          useNativeDriver: true,
        }),
      ]).start(() => {
        
      });
    } else {
      // Reset animation if shouldAnimate is false
      translateX.setValue(0);
      opacity.setValue(1);
    }
  }, [shouldAnimate]); // Runs when shouldAnimate changes

  return (
    <Animated.View
      style={[
        styles.animatedView,
        {
          transform: [{ translateX }],
          opacity,
        },

      ]}
    >
       <ImageBackground source={{uri: `${profile.picture}`}} resizeMode="cover" style={styles.pictureContaner}>
                <View style={styles.companyNameContainer}>
                   <Text style={{fontSize: 20}}>{profile.name}</Text>
                   <Text style={{marginLeft: 10}}>{profile.location}</Text>
                </View>
                <TouchableOpacity style={styles.downArrowButton}
                  onPress={()=> props.setProfileInfoVisible(true)}
                >
                  <AntDesign name="arrowdown" size={30} color="black" />
                </TouchableOpacity>
              </ImageBackground>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedView: {
    width: width,
    height: height / 1.7,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    position:"absolute"
  },
  pictureContaner:{
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"center",
    width: width,
    height: height / 1.7
  },
  companyNameContainer:{
    backgroundColor: "#fff", 
    position: "absolute",
    left: 0,
    top:50,
    height: 70, 
    width: 170, 
    padding: 10,
    opacity: .5
  },
  downArrowButton:{
   display: "flex",
   justifyContent: "center",
   alignItems:"center",
   backgroundColor: "#fff",
   position: "relative",
   width: 50,
   height: 50,
   borderRadius: 50,
   marginBottom: 20,
   opacity: .6
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ImageSlider;
