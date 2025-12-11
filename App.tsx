
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import AddItemScreen from "./screens/AddItemScreen";
import { MenuItem } from "./types/MenuItem";

export type RootStackParamList = {
  Home: undefined;
  AddItem: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Global repository for menu items
export const MenuRepository: { items: MenuItem[] } = { 
  items: [
    new MenuItem("Caesar Salad", "Fresh romaine with Caesar dressing", "Starter", 8.99),
    new MenuItem("Grilled Salmon", "Atlantic salmon with lemon butter", "Main", 24.99),
    new MenuItem("Chocolate Cake", "Rich chocolate dessert", "Dessert", 7.99)
  ] 
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ title: "Chef Menu" }} 
        />
        <Stack.Screen 
          name="AddItem" 
          component={AddItemScreen} 
          options={{ title: "Add Menu Item" }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
