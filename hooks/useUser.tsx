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
             // router.push("/(tabs)")
            }else{
              router.push("/login")
              
            }
        })

    },[])


    return user

}