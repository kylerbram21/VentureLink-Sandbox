import { Image, StyleSheet, Platform, View } from 'react-native';
import { ScrollView } from 'react-native'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import {useSpring, animated} from '@react-spring/native'

export default function HomeScreen() {


  const characters = [
    {
      name: 'Richard Hendricks',
      url: 'https://ih1.redbubble.net/image.4646860467.2555/raf,360x360,075,t,fafafa:ca443f4786.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: 'https://ih1.redbubble.net/image.5246806981.0160/raf,750x1000,075,t,FCD9D9:9126c0bfe7.jpg'
    },
    {
      name: 'Monica Hall',
      url: 'https://static.wikia.nocookie.net/wyrmrest/images/8/85/Sherk.png/revision/latest?cb=20200620154452'
    },
    {
      name: 'Jared Dunn',
      url: 'https://us-tuna-sounds-images.voicemod.net/3813e1e3-1b64-4771-b250-e4d9f2c32fc5-1713665309451.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sean-sherk.jpg'
    }
  ]
  

  const [lastDirection, setLastDirection] = useState("")

  const swiped = (direction:string, nameToDelete:string) => {
    console.log('removing: ' + nameToDelete)
    setLastDirection(direction)
  }

  const outOfFrame = (name:string) => {
    console.log(name + ' left the screen!')
  }

  return (
    <ScrollView style={{width: "100%", backgroundColor: "white"}}>
     <View style={styles.mainColor}>
      <View style={styles.swiperContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.swipe}>
        {characters.map((character) =>
            <TinderCard  key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
            <View style={{...styles.card }}>
              <Image style={{ width: "100%", height: "100%", alignSelf: "center", marginBottom: 90, marginTop: 90}} source={{uri: character.url}}/>
              {character.name}
            </View>
          </TinderCard>
        )}
        </View>
        </View>
      </View>
    </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  dashboard:{

  },

  swiperContainer:{
    
  },

  mainColor:{
    backgroundColor: "#fff",
    width:"100%",
    height: 500
  },

    swipe: {
      position: 'absolute',
    },
  
    cardContainer: {
      width: 90,
      maxWidth: 260,
      height: 300,
    },
  
    card: {
      position: 'relative',
      backgroundColor: '#fff',
      width: 80,
      maxWidth: 260,
      height: 300,
      boxShadow: '0px 0px 60px 0px rgba(0,0,0,0.30)',
      borderRadius: '20px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
  
    cardContent: {
      width: '100%',
      height: '100%',
    },
  
    swipeLastOfType: {},
  
    cardTitle: {
      position: 'absolute',
      bottom: 0,
      margin: 10,
      color: '#fff',
    },
  },
  
)
