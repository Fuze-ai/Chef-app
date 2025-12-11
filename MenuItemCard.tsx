import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MenuItem } from "../types/MenuItem";
import { MenuRepository } from "../App";

interface MenuItemCardProps {
  item: MenuItem;
  onRemove?: () => void;
}

export default function MenuItemCard({ item, onRemove }: MenuItemCardProps) {
  const handleRemove = () => {
    if (onRemove) {
      onRemove();
    } else {
      // Fallback: Remove from repository directly
      const index = MenuRepository.items.findIndex(
        i => i.dishName === item.dishName && i.course === item.course
      );
      if (index > -1) {
        MenuRepository.items.splice(index, 1);
      }
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.name}>{item.dishName}</Text>
        <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>×</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.course}>{item.course}</Text>
      <Text style={styles.desc}>{item.description}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: { 
    fontSize: 20, 
    fontWeight: "600", 
    flex: 1 
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ff6b6b",
    justifyContent: "center",
    alignItems: "center",
  },
  removeText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  course: { 
    color: "#007bff", 
    fontSize: 16, 
    fontWeight: "500", 
    marginBottom: 8 
  },
  desc: { 
    color: "#555", 
    fontSize: 16, 
    marginBottom: 12, 
    lineHeight: 22 
  },
  price: { 
    fontSize: 18, 
    fontWeight: "bold", 
    color: "#28a745" 
  },
});