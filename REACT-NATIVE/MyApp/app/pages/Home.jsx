import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {

  const navigation = useNavigation(); // Fix for navigation

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {/* <Image source={require("../assets/images/product-quality.png")} style={styles.logo} /> */}
          <Text style={styles.headerText}>Product <Text style={styles.bold}>Review</Text></Text>
        </View>

        {/* Profile Button */}
        <TouchableOpacity style={styles.ProfileButton} onPress={() => navigation.navigate("Profile")}>
          <Text style={styles.buttonText}>Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Main Section */}
      <View style={styles.main}>
        <Text style={styles.mainHeading}>Know Better, Choose Better</Text>
        <Text style={styles.mainText}>Reviews by people like you.</Text>

        <View style={styles.searchBar}>
          <TextInput style={styles.input} placeholder="What are you looking for?" placeholderTextColor="#666" />
          <TouchableOpacity style={styles.iconButton}>
            <Text>🔍</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <Text style={styles.footerHeading}>Your opinion matters</Text>
        <Text style={styles.footerText}>ProductReview.com.au is a community of consumers helping each other make better purchasing decisions.</Text>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.greenButton} onPress={() => navigation.navigate("Review")}>
            <Text style={styles.buttonText}>Write a review</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.greenButton} onPress={() => navigation.navigate("Second")}>
            <Text style={styles.buttonText}>See reviews</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    
    backgroundColor: "#fff", 
    width:'100%'
  },
  header: { 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff", 
    padding: 5 
  },
  headerLeft: { 
    flexDirection: "row",
    alignItems: "center"
   },
  logo: { 
    width: 30,
    height: 30,
    // marginRight:
    },
  headerText: {
    color: "#004d40", 
    fontSize: 15
   },
  bold: { 
    fontWeight: "bold"
   },
  searchContainer: {
    flexDirection: "row", 
    alignItems: "center", 
    backgroundColor: "white", 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    paddingVertical: 5 
  },
  searchInput: { flex: 1,
     color: "#333"
     },
  searchButton: { 
    backgroundColor: "#ddd", 
    padding: 5, 
    borderRadius: 5 
  },
  searchButtonText: { 
    fontSize: 14 
  },
  ProfileButton: { 
    backgroundColor: "#004d40", 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    borderRadius: 5 
  },
  buttonText: { 
    color: "white", 
    fontWeight: "bold" 
  },

  main: { 
    backgroundColor: "#004d40", 
    alignItems: "center", 
    paddingVertical: 80 
  },
  mainHeading: { 
    color: "white", 
    fontSize: 24, 
    fontWeight: "bold" 
  },
  mainText: { 
    color: "white", 
    fontSize: 16, 
    marginBottom: 20 
  },
  searchBar: { 
    flexDirection: "row", 
    backgroundColor: "white", 
    borderRadius: 5, 
    paddingHorizontal: 10, 
    alignItems: "center", 
    // width: "80%" 
  },
  input: { 
    flex: 1, 
    height: 40 
  },
  iconButton: { 
    padding: 10 
  },

  footer: { 
    alignItems: "center", 
    paddingVertical: 20 
  },
  footerHeading: { 
    fontSize: 18, 
    fontWeight: "bold" 
  },
  footerText: { 
    color: "#666", 
    textAlign: "center", 
    marginHorizontal: 20, 
    marginVertical: 10 
  },
  buttonContainer: { 
    flexDirection: "row", 
    gap: 10 },
  greenButton: { 
    backgroundColor: "#004d40", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 5 
  },
});

export default Home;
