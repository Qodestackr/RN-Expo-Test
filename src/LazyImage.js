import React, { useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet } from 'react-native';

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch('https://picsum.photos/v2/list?page=2&limit=100');
      if (response.ok) {
        const data = await response.json();
        setImages(data);
      } else {
        console.error('Error fetching images:', response.status);
      }
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  const renderImage = ({ item }) => (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: item.download_url, cache: 'only-if-cached' }}
        style={styles.image}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={images}
        keyExtractor={(item) => item.id}
        renderItem={renderImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 10,
  },
  image: {
    width: '80%',
    aspectRatio: 1, // Maintain aspect ratio based on width
  },
});

export default ImageList;


// Sample RN code