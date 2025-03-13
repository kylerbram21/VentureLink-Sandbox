import { useState } from "react";
import { View, Text } from "react-native"

import DropDownPicker from "react-native-dropdown-picker";

export default function DropdownStates(){
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
      { label: "AL", value: "Alabama" },
      { label: "AK", value: "Alaska" },
      { label: "AZ", value: "Arizona" },
      { label: "AR", value: "Arkansas" },
      { label: "CA", value: "California" },
      { label: "CO", value: "Colorado" },
      { label: "CT", value: "Connecticut" },
      { label: "DE", value: "Delaware" },
      { label: "FL", value: "Florida" },
      { label: "GA", value: "Georgia" },
      { label: "HI", value: "Hawaii" },
      { label: "ID", value: "Idaho" },
      { label: "IL", value: "Illinois" },
      { label: "IN", value: "Indiana" },
      { label: "IA", value: "Iowa" },
      { label: "KS", value: "Kansas" },
      { label: "KY", value: "Kentucky" },
      { label: "LA", value: "Louisiana" },
      { label: "ME", value: "Maine" },
      { label: "MD", value: "Maryland" },
      { label: "MA", value: "Massachusetts" },
      { label: "MI", value: "Michgan" },
      { label: "MN", value: "Minnesota" },
      { label: "MS", value: "Mississippi" },
      { label: "MO", value: "Missouri" },
      { label: "MT", value: "Montana" },
      { label: "NE", value: "Nebraska" },
      { label: "NV", value: "Nevada" },
      { label: "NH", value: "New Hampshire" },
      { label: "NJ", value: "New Jersey" },
      { label: "NM", value: "New Mexico" },
      { label: "NY", value: "New York" },
      { label: "NC", value: "North Carolina" },
      { label: "ND", value: "North Dakota" },
      { label: "OH", value: "Ohio" },
      { label: "OK", value: "Oklahoma" },
      { label: "OR", value: "Oregon" },
      { label: "PA", value: "Pennsylvania" },
      { label: "RI", value: "Rhode Island" },
      { label: "SC", value: "South Carolina" },
      { label: "SD", value: "South Dakota" },
      { label: "TN", value: "Tennessee" },
      { label: "TX", value: "Texas" },
      { label: "UT", value: "Utah" },
      { label: "VT", value: "Vermont" },
      { label: "VA", value: "Virginia" },
      { label: "WA", value: "Washington" },
      { label: "WV", value: "West Virginia" },
      { label: "WI", value: "Wisconsin" },
      { label: "WY", value: "Wyoming" },
    ]);

return(
    <View style={{ padding: 20, backgroundColor: "#fff", height: "50%", width: "100%" }}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select an option"
    />
  </View>
)

}