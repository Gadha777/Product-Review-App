import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import {useRoute, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({ route }) => {
    // const route = useRoute();
    const { reviewId } = route.params;
    const navigation = useNavigation();

    const [reviewData, setReviewData] = useState({
    reviewText: "",
    shortRating: "",
    rating: "",
  });

  useEffect(() => {
    if (reviewId) {
      fetchReviewData(reviewId);
    }
  }, [reviewId]);

  const fetchReviewData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/get-review/${id}`);
      if (!response.ok) throw new Error("Failed to fetch review");
      const data = await response.json();
      setReviewData({
        reviewText: data.reviewText || "",
        shortRating: data.shortRating || "",
        rating: data.rating || "",
      });
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  const handleChange = (key, value) => {
    setReviewData({ ...reviewData, [key]: value });
  };

const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/update/${reviewId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        Alert.alert("Success", "Review updated successfully");
        navigation.navigate("Home"); // Go back to Profile page
      } else {
        Alert.alert("Error", "Failed to update review");
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <View>
    <View>
      <Text style={styles.heading}>Edit Review</Text>
    </View>
    <View style={styles.container}>
      
      <Text style={styles.label}>Review Text</Text>
      <TextInput
        style={styles.input}
        multiline
        value={reviewData.reviewText}
        onChangeText={(text) => handleChange("reviewText", text)}
      />
      
      <Text style={styles.label}>Short Rating</Text>
      <TextInput
        style={styles.input}
        value={reviewData.shortRating}
        onChangeText={(text) => handleChange("shortRating", text)}
      />
      
      <Text style={styles.label}>Rating</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={reviewData.rating}
        onChangeText={(text) => handleChange("rating", text)}
      />

      <View style={styles.buttonContainer}>
        <Button title="Update" onPress={handleUpdate} color="#007bff" />
        <Button title="Cancel" onPress={() => navigation.navigate("Profile")} color="#dc3545" />
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#004d40",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#004d40",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#bbb",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
   color: "#fff",

  },
});

export default Edit;
