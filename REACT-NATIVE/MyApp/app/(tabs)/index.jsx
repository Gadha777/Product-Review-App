import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Homepage from "../pages/Home";
import Secondpage from "../pages/Second";
import Reviewpage from "../pages/Review";
import Signuppage from "../pages/Signup";
import Loginpage from "../pages/Login";
import Profile from "../pages/Profile"; // Import Profile screen
import Edit from "../pages/Edit";
import Car from "../pages/Car";
import Vacuum from "../pages/Vacuum";
import Homebuilders from "../pages/Homebuilders";
import Tyres from "../pages/Tyres";
import Weightloss from "../pages/Weightloss";
import Coffeemachine from "../pages/Coffeemachine";


const Stack = createStackNavigator();

export default function App() {
  return (
    // <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Second" component={Secondpage} />
        <Stack.Screen name="Review" component={Reviewpage} />
        <Stack.Screen name="Signup" component={Signuppage} />
        <Stack.Screen name="Login" component={Loginpage} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Edit" component={Edit} />
        <Stack.Screen name="Car" component={Car} />
        <Stack.Screen name="Vacuum" component={Vacuum} />
        <Stack.Screen name="Homebuilders" component={Homebuilders} />
        <Stack.Screen name="Tyres" component={Tyres} />
        <Stack.Screen name="Weightloss" component={Weightloss} />
        <Stack.Screen name="Coffeemachine" component={Coffeemachine} />

      </Stack.Navigator>
    // </NavigationContainer>
  );
}
