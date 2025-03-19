import { Image, StyleSheet, Platform, View } from 'react-native';
import { ScrollView, Dimensions } from 'react-native'
import TinderCard from 'react-tinder-card'
import { useEffect, useState } from 'react'
import {useSpring, animated} from '@react-spring/native'

import UserCard from '@/components/UserCard';
import useUser from "../../hooks/useUser"

const { width } = Dimensions.get('window');

export default function HomeScreen(){

  const user = useUser()

  console.log(user)

  return(
    <View>
      <UserCard />
    </View>
  )
}









// export default function HomeScreen() {

//   const characters = [
//     {
//       name: 'Richard Hendricks',
//       url: 'https://ih1.redbubble.net/image.4646860467.2555/raf,360x360,075,t,fafafa:ca443f4786.jpg'
//     },
//     {
//       name: 'Erlich Bachman',
//       url: 'https://ih1.redbubble.net/image.5246806981.0160/raf,750x1000,075,t,FCD9D9:9126c0bfe7.jpg'
//     },
//     {
//       name: 'Monica Hall',
//       url: 'https://static.wikia.nocookie.net/wyrmrest/images/8/85/Sherk.png/revision/latest?cb=20200620154452'
//     },
//     {
//       name: 'Jared Dunn',
//       url: 'https://us-tuna-sounds-images.voicemod.net/3813e1e3-1b64-4771-b250-e4d9f2c32fc5-1713665309451.jpg'
//     },
//     {
//       name: 'Dinesh Chugtai',
//       url: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Sean-sherk.jpg'
//     }
//   ]
  

//   const [lastDirection, setLastDirection] = useState("")

//   const swiped = (direction:string, nameToDelete:string) => {
//     console.log('removing: ' + nameToDelete)
//     setLastDirection(direction)
//   }

//   const outOfFrame = (name:string) => {
//     console.log(name + ' left the screen!')
//   }

//   return (
//      <View style={styles.dashboard}>
//       <View style={styles.swiperContainer}>
//         <View style={styles.cardContainer}>
//           <View style={styles.swipe}>
//         {characters.map((character) =>
//             <TinderCard  key={character.name} onSwipe={(dir) => swiped(dir, character.name)} onCardLeftScreen={() => outOfFrame(character.name)}>
//             <View style={{...styles.card }}>
//               <Image style={{ width: "100%", height: "100%", alignSelf: "center", marginBottom: 90, marginTop: 90}} source={{uri: character.url}}/>
//               {character.name}
//             </View>
//           </TinderCard>
//         )}
//         </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   dashboard:{

//   },
//   swiperContainer:{

//   },
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#000',
//   },
//   swipe: {
//     position: 'absolute',
//   },
//   cardContainer: {
//     width: width * 0.9,
//     maxWidth: 260,
//     height: 300,
//   },
//   card: {
//     position: 'relative',
//     backgroundColor: '#fff',
//     width: width * 0.8,
//     maxWidth: 260,
//     height: 300,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.3,
//     shadowRadius: 30,
//     borderRadius: 20,
//     overflow: 'hidden',
//   },
//   cardContent: {
//     width: '100%',
//     height: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   cardTitle: {
//     position: 'absolute',
//     bottom: 10,
//     margin: 10,
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   infoText: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//     color: '#fff',
//   },
//   buttons: {
//     marginTop: 20,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     justifyContent: 'center',
//   },
//   button: {
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 0,
//     backgroundColor: '#9198e5',
//     margin: 10,
//     width: 160,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 0 },
//     shadowOpacity: 0.1,
//     shadowRadius: 15,
//     transform: [{ scale: 1 }],
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   },
  
// )
