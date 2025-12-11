import React, { useState } from "react";
import { 
  View, 
  TextInput, 
  StyleSheet, 
  Button, 
  Alert, 
  ScrollView,
  Text 
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, MenuRepository } from "../App";
import { MenuItem } from "../types/MenuItem";

type Props = NativeStackScreenProps<RootStackParamList, "AddItem">;

export default function AddItemScreen({ navigation }: Props) {
  const [dishName, setDishName] = useState("");
  const [description, setDescription] = useState("");
  const [course, setCourse] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    // Validation
    if (!dishName.trim()) {
      Alert.alert("Error", "Please enter a dish name");
      return;
    }
    if (!course) {
      Alert.alert("Error", "Please select a course");
      return;
    }
    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert("Error", "Please enter a valid price greater than 0");
      return;
    }

    // Create and add new menu item
    const item = new MenuItem(dishName.trim(), description.trim(), course, priceValue);
    MenuRepository.items.push(item);

    Alert.alert("Success", "Menu item added successfully!");
    
    // Clear form and navigate back
    setDishName("");
    setDescription("");
    setCourse("");
    setPrice("");
    
    // Small delay before navigating back to show success message
    setTimeout(() => {
      navigation.goBack();
    }, 500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add New Menu Item</Text>
      
      <Text style={styles.label}>Dish Name *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Caesar Salad"
        value={dishName}
        onChangeText={setDishName}
        maxLength={50}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        placeholder="Describe the dish..."
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
        maxLength={200}
      />

      <Text style={styles.label}>Course *</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={course}
          onValueChange={(value) => setCourse(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select a course" value="" />
          <Picker.Item label="Starter" value="Starter" />
          <Picker.Item label="Main" value="Main" />
          <Picker.Item label="Dessert" value="Dessert" />
          <Picker.Item label="Drink" value="Drink" />
        </Picker>
      </View>

      <Text style={styles.label}>Price ($) *</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 12.99"
        keyboardType="decimal-pad"
        value={price}
        onChangeText={setPrice}
      />

      <View style={styles.buttonContainer}>
        <Button 
          title="Add Item" 
          onPress={handleAdd} 
          color="#007bff"
        />
        <View style={styles.spacer} />
        <Button 
          title="Cancel" 
          onPress={() => navigation.goBack()} 
          color="#6c757d"
        />
      </View>
      
      <Text style={styles.note}>* Required fields</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 30,
    color: "#333",
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    color: "#495057",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#f8f9fa",
  },
  multiline: {
    height: 100,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#f8f9fa",
  },
  picker: {
    height: 50,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 20,
  },
  spacer: {
    height: 10,
  },
  note: {
    fontSize: 14,
    color: "#6c757d",
    textAlign: "center",
    marginTop: 20,
  },
});