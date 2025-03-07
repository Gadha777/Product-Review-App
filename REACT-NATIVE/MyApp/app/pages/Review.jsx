import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity,  StyleSheet, ScrollView } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ReviewScreen = () => {
  const navigation = useNavigation(); // Initializing navigation for screen transitions
  // State to store form data
  const [formData, setFormData] = useState({
    productName: "",
    startingPrice: "",
    reviewText: "",
    shortRating: "",
    rating: "",
    category: "", 
    });
  // Function to update form data when inputs change
  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const username = await AsyncStorage.getItem("username"); // Retrieve username from AsyncStorage
      if (!username) {
        alert( "You need to log in before submitting a review.");
        navigation.navigate("Login");
        return;
      }
  
      // Validate if all input fields are filled
      if (
        !formData.productName ||
        !formData.startingPrice ||
        !formData.reviewText ||
        !formData.shortRating ||
        !formData.rating ||
        !formData.category
      ) {
        alert("All fields are required.");
        return;
      }
  
      const response = await fetch("http://localhost:5000/reviews/add-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },// Setting content type to JSON
        body: JSON.stringify({ ...formData, username }),// Converting formData to JSON and including username
      });
  
      if (response.ok) {
        alert("Review submitted successfully!");
        // setFormData({// Reset the form fields after successful submission
        //   productName: "",
        //   startingPrice: "",
        //   reviewText: "",
        //   shortRating: "",
        //   rating: "",
        //   category: "",
        // });
        navigation.navigate("Home");
      } else {
        const errorData = await response.json();
        alert("Error", errorData.error || "Failed to submit review");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>Submit a Review</Text>
      <TextInput
        style={styles.input}
        placeholder="Product Name"
        value={formData.productName}
        onChangeText={(text) => handleInputChange("productName", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Starting Price"
        value={formData.startingPrice}
        onChangeText={(text) => handleInputChange("startingPrice", text)}
        keyboardType="numeric"
      />
    
      <TextInput
        style={styles.input}
        placeholder="Review"
        value={formData.reviewText}
        onChangeText={(text) => handleInputChange("reviewText", text)}
        
      />
      <TextInput
        style={styles.input}
        placeholder="Short Review"
        value={formData.shortRating}
        onChangeText={(text) => handleInputChange("shortRating", text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Rating (1-5)"
        value={formData.rating}
        onChangeText={(text) => handleInputChange("rating", text)}
        keyboardType="numeric"
      />

      {/* Category Dropdown */}
        <Picker style={styles.pickerContainer}
          selectedValue={formData.category}
          onValueChange={(itemValue) => handleInputChange("category", itemValue)}
        >
          <Picker.Item label="Select a category..." value={null} />
          <Picker.Item label="Car" value="Car" />
          <Picker.Item label="Vacuum" value="Vacuum" />
          <Picker.Item label="Coffemachine" value="Coffemachine" />
          <Picker.Item label="Weight loss product" value="Weightlossproduct" />
          <Picker.Item label="Tyres" value="Tyres" />
          <Picker.Item label="Home" value="Home" />
        </Picker>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
  <Text style={styles.buttonText}>Submit Review</Text>
</TouchableOpacity>
      {/* <Button title="Submit Review" style={styles.button} onPress={handleSubmit} /> */}
    </ScrollView>
    </View>

  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
    padding: 20,
    backgroundColor: "#004d40",
  },
  container: {
    flex: 1, 
    backgroundColor: "#004d40",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color:"#fff"
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",

  },

  pickerContainer: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "#f9f9f9",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#fff", 
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  
  buttonText: {
    color: "#004d40",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});

export default ReviewScreen;
