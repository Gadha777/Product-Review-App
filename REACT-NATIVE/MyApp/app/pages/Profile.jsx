import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = await AsyncStorage.getItem("username");
      if (storedUsername) {
        setUsername(storedUsername);
        fetchReviews(storedUsername);
      }
    };
    fetchUsername();
  }, []);

  const fetchReviews = async (user) => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/${user}`);
      const data = await response.json();
      if (response.ok) {
        setReviews(data);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleEdit = (id) => {
    navigation.navigate("Edit", { reviewId: id });
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/reviews/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setReviews(reviews.filter((review) => review._id !== id));
        alert("Success", "Review deleted successfully");
      } else {
        alert("Error", "Failed to delete review");
      }
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      navigation.navigate("Home")

    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.heading}>Welcome, {username || "Guest"}</Text>
        <Text><Text style={styles.subheading}>Your Reviews</Text>  {username ? (
    <TouchableOpacity onPress={handleLogout}>
      <Text style={styles.text}>Logout</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={() => navigation.navigate("Login")}>
      <Text style={styles.text}>Login</Text>
    </TouchableOpacity>
  )}</Text>
         

        <FlatList
          data={reviews}
          keyExtractor={(item) => item._id}
          contentContainerStyle={{ paddingBottom: 20 }} // Ensures scrolling area
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.bold}>{item.productName}</Text>
              <Text style={styles.title}>Price: {item.startingPrice}</Text>
              <Text style={styles.title}>Review: {item.reviewText}</Text>
              <Text style={styles.title}>Short Rating: {item.shortRating}</Text>
              <Text style={styles.title}>Rating: {item.rating}</Text>

              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item._id)}>
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item._id)}>
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#004d40",
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#004d40",
  },
  text:{
    marginTop: 30,
    color:"#004d40",
    marginLeft: 200,
    backgroundColor:"#fff",
    padding: 5,
    borderRadius: 3
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    color: "#fff",
    marginTop: 10,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 16,
    color: "#0A5F04",
    marginTop: 3,
  },
  bold: {
    fontWeight: "bold",
    color: "#0A5F04",
    fontSize: 18,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Profile;