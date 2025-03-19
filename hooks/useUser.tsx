import { useState, useEffect } from "react"
import { router } from "expo-router"

import { onAuthStateChanged } from 'firebase/auth';

import {auth} from "../firebase"

export default function useUser(){
    
    const [user, setUser] = useState([])

    useEffect(()=>{

        onAuthStateChanged(auth, (user:any) => {
            if(user) {
              setUser(user)
              console.log("Signed in")
              router.push("/(tabs)")
            }else{
              router.push("/login")
              
            }
        })

    },[])


    return user

}