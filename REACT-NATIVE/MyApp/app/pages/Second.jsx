import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWindowDimensions } from "react-native";

const categories = [
  { name: "Cars", reviews: "29,500 reviews", route: "Car" },
  { name: "Home Builders", reviews: "20,000 reviews", route: "Homebuilders" },
  { name: "Coffee Machines", reviews: "16,900 reviews", route: "Coffeemachine" },
  { name: "Weight Loss Product", reviews: "35,000 reviews", route: "Weightloss" },
  { name: "Vacuum Machines", reviews: "30,000 reviews", route: "Vacuum" },
  { name: "Tyres", reviews: "40,000 reviews", route: "Tyres" },
];

const Second = () => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions(); // Get screen width

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Popular Categories</Text>
      <Text style={styles.subtitle}>Browse our most popular categories</Text>
      <View style={styles.grid}>
        {categories.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.category, { width: width < 400 ? "100%" : "48%" }]} // Full width for small screens
            onPress={() => navigation.navigate(category.route)}
          >
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <Text style={styles.categoryReviews}>{category.reviews}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
    textAlign: "center",
  },
  grid: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  category: {
    backgroundColor: "#004d40",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  categoryTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    textAlign: "center",
  },
  categoryReviews: {
    color: "white",
    fontSize: 9,
    marginTop: 5,
    textAlign: "center",
  },
});

export default Second;
