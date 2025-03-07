import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import productImage from "../../assets/images/coffee.jpeg";

const Coffemachine = () => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:5000/reviews/category/Coffemachine");
        const data = await res.json();
        setReviews(data.reduce((acc, review) => { //The .reduce() method is used to transform an array into a single.we are converting an array of reviews into an object grouped by productName.
          (acc[review.productName] = acc[review.productName] || []).push(review);
          return acc;
        }, {}));
      } catch (error) {
        console.error("Error fetching reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#fff" style={styles.loader} />;
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Product Review</Text>
        <TouchableOpacity onPress={navigation.goBack} style={styles.button}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>
        {reviews && Object.keys(reviews).length ? (//Ensures that there is at least one review.
          Object.entries(reviews).map(([productName, items]) => (//Converts the reviews object into an array of key-value pairs,
            <View key={productName} style={styles.card}>
              <Image source={items[0]?.imageUrl ? { uri: items[0].imageUrl } : productImage} style={styles.image} />
              <Text style={styles.productTitle}>{productName} <Text style={styles.rating}>{items[0]?.rating} ★</Text></Text>

              {items.map(({ username, shortRating, reviewText ,rating}, idx) => (
                <View key={idx} style={styles.reviewBox}>
                 <Text><Text style={styles.bold}>{username}:</Text> <Text> {shortRating}</Text></Text> 
                 <Text style={styles.stars}>{rating}★★★★★</Text>
                  <Text style={styles.reviewText}>{reviewText}</Text>
                </View>
              ))}

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Load More Reviews</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noReviews}>No reviews available for Coffemachines.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#004d40" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  button: { backgroundColor: "green", padding: 10, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold", marginTop: 10 },
  card: { backgroundColor: "white", padding: 16, borderRadius: 8, marginBottom: 16, elevation: 3 },
  image: { width: "100%", height: 150, borderRadius: 8, marginBottom: 10 },
  productTitle: { fontSize: 18, fontWeight: "bold" },
  rating: { color: "#ffc107", fontWeight: "bold" },
  bold: { fontWeight: "bold" },
  reviewBox: { backgroundColor: "#f1f3f5", padding: 8, borderRadius: 5, marginTop: 8 },
  stars: { color: "#ffc107", fontSize: 16 , marginTop: 5},
  noReviews: { textAlign: "center", fontSize: 16, color: "gray", marginTop: 20 },
  loader: { flex: 1, justifyContent: "center" },
  reviewText:{ marginTop: 5 }
});

export default Coffemachine;
