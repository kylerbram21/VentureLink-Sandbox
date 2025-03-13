import { useState } from "react";
import { View, Text } from "react-native"

import DropDownPicker from "react-native-dropdown-picker";

export default function Dropdown(props:any){
 
  const {items, value, setState } = props


    const [open, setOpen] = useState(false);


return(
    <View style={{position: "absolute", paddingHorizontal: 10, backgroundColor: "#fff", height: 100,  width: "100%" }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setState}
        placeholder="Select an option"
    />
  </View>
)

}