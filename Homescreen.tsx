import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList, MenuRepository } from "../App";
import { MenuItem, CourseAverage } from "../types/MenuItem";
import MenuItemCard from "../components/MenuItemCard";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [courseAverages, setCourseAverages] = useState<CourseAverage[]>([]);

  // Function to calculate average price per course
  const calculateCourseAverages = (menuItems: MenuItem[]) => {
    const courseMap = new Map<string, { total: number; count: number }>();
    
    menuItems.forEach(item => {
      if (!courseMap.has(item.course)) {
        courseMap.set(item.course, { total: 0, count: 0 });
      }
      const courseData = courseMap.get(item.course)!;
      courseData.total += item.price;
      courseData.count += 1;
    });

    const averages: CourseAverage[] = [];
    courseMap.forEach((data, course) => {
      averages.push({
        course,
        average: data.total / data.count,
        count: data.count
      });
    });

    return averages;
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setItems([...MenuRepository.items]);
      setCourseAverages(calculateCourseAverages(MenuRepository.items));
    });

    // Initial load
    setItems([...MenuRepository.items]);
    setCourseAverages(calculateCourseAverages(MenuRepository.items));

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chef Menu</Text>
      <Text style={styles.count}>Total menu items: {items.length}</Text>

      {/* Display course averages */}
      {courseAverages.length > 0 && (
        <View style={styles.averagesContainer}>
          <Text style={styles.averagesTitle}>Average Price per Course:</Text>
          {courseAverages.map((avg, index) => (
            <Text key={index} style={styles.averageText}>
              {avg.course}: ${avg.average.toFixed(2)} ({avg.count} items)
            </Text>
          ))}
        </View>
      )}

      {items.length === 0 ? (
        <Text style={styles.empty}>No menu items yet. Tap + to add.</Text>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item, index) => `${item.dishName}-${index}`}
          renderItem={({ item }) => <MenuItemCard item={item} />}
          contentContainerStyle={styles.listContent}
        />
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("AddItem")}
        activeOpacity={0.7}
      >
        <Text style={styles.addText}>＋</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#f6f8fa" 
  },
  title: { 
    fontSize: 28, 
    fontWeight: "700", 
    marginBottom: 8, 
    color: "#333" 
  },
  count: { 
    fontSize: 16, 
    marginBottom: 16, 
    color: "#666" 
  },
  averagesContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  averagesTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333",
  },
  averageText: {
    fontSize: 16,
    marginBottom: 4,
    color: "#555",
  },
  empty: { 
    fontSize: 18, 
    color: "#888", 
    textAlign: "center", 
    marginTop: 50 
  },
  listContent: {
    paddingBottom: 80,
  },
  addButton: {
    backgroundColor: "#007bff",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 30,
    right: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addText: { 
    color: "white", 
    fontSize: 28, 
    lineHeight: 28 
  },
});