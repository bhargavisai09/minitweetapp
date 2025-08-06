import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const TweetCard = ({ tweet, onLike }) => {
  const currentUser = auth().currentUser;
  const isLiked = tweet?.likedBy?.includes(currentUser?.uid);

  return (
    <View style={styles.card}>
      <Text style={styles.email}>{tweet.username}</Text>
      <Text style={styles.text}>{tweet.text}</Text>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => onLike(tweet.id, isLiked)}>
          <Icon
            name="heart"
            size={20}
            color={isLiked ? '#e0245e' : '#888'}
            style={styles.likeIcon}
          />
        </TouchableOpacity>
        <Text style={styles.likeCount}>{tweet.likes} likes</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  email: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 14,
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likeIcon: {
    marginRight: 8,
  },
  likeCount: {
    fontSize: 14,
    color: '#555',
  },
});

export default TweetCard;
