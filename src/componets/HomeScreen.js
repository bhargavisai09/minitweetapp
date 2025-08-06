


// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   FlatList,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import firestore from '@react-native-firebase/firestore';
// import auth from '@react-native-firebase/auth';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import moment from 'moment';

// const TweetItem = ({ item, user, toggleLike, commentText, setCommentText, postComment }) => {
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('tweets')
//       .doc(item.id)
//       .collection('comments')
//       .orderBy('createdAt', 'asc')
//       .onSnapshot(snapshot => {
//         const commentList = [];
//         snapshot.forEach(doc => {
//           commentList.push({ id: doc.id, ...doc.data() });
//         });
//         setComments(commentList);
//       });
//     return unsubscribe;
//   }, [item.id]);

//   return (
//     <View style={styles.tweetBox}>
//       <Text style={styles.email}>{item.email}</Text>
//       <Text style={styles.text}>{item.text}</Text>
//       <Text style={styles.timestamp}>{moment(item.createdAt?.toDate()).fromNow()}</Text>
//       <View style={styles.actions}>
//         <TouchableOpacity onPress={() => toggleLike(item.id, item.likedBy)}>
//           <Text style={styles.icon}>❤️ {item.likes}</Text>
//         </TouchableOpacity>
//         <Text style={styles.icon}>💬 {comments.length}</Text>
//       </View>
//       {comments.map(comment => (
//         <Text key={comment.id} style={styles.comment}>
//           {comment.email}: {comment.text}
//         </Text>
//       ))}
//       <TextInput
//         placeholder="Write a comment..."
//         value={commentText[item.id] || ''}
//         onChangeText={text => setCommentText(prev => ({ ...prev, [item.id]: text }))}
//         style={styles.commentInput}
//       />
//       <TouchableOpacity onPress={() => postComment(item.id)}>
//         <Text style={styles.postComment}>Post</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const HomeScreen = () => {
//   const [tweet, setTweet] = useState('');
//   const [tweets, setTweets] = useState([]);
//   const [search, setSearch] = useState('');
//   const [commentText, setCommentText] = useState({});

//   const user = auth().currentUser;

//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('tweets')
//       .orderBy('createdAt', 'desc')
//       .onSnapshot(snapshot => {
//         const tweetsData = [];
//         snapshot.forEach(doc => {
//           tweetsData.push({ id: doc.id, ...doc.data() });
//         });
//         setTweets(tweetsData);
//       });
//     return unsubscribe;
//   }, []);

//   const postTweet = async () => {
//     if (tweet.trim().length === 0) return;
//     await firestore().collection('tweets').add({
//       text: tweet,
//       email: user.email,
//       userId: user.uid,
//       likes: 0,
//       likedBy: [],
//       createdAt: firestore.FieldValue.serverTimestamp(),
//     });
//     setTweet('');
//   };

//   const toggleLike = async (tweetId, likedBy) => {
//     const isLiked = likedBy.includes(user.uid);
//     const tweetRef = firestore().collection('tweets').doc(tweetId);
//     await tweetRef.update({
//       likes: firestore.FieldValue.increment(isLiked ? -1 : 1),
//       likedBy: isLiked
//         ? firestore.FieldValue.arrayRemove(user.uid)
//         : firestore.FieldValue.arrayUnion(user.uid),
//     });
//   };

//   const postComment = async (tweetId) => {
//     const comment = commentText[tweetId];
//     if (!comment || comment.trim() === '') return;
//     await firestore()
//       .collection('tweets')
//       .doc(tweetId)
//       .collection('comments')
//       .add({
//         text: comment,
//         email: user.email,
//         createdAt: firestore.FieldValue.serverTimestamp(),
//       });
//     setCommentText(prev => ({ ...prev, [tweetId]: '' }));
//   };

//   const filteredTweets = tweets.filter(tweet =>
//     tweet.text.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <Text style={styles.title}>Mini Twitter Feed</Text>
//       <TextInput
//         placeholder="🔍 Search tweets"
//         value={search}
//         onChangeText={setSearch}
//         style={styles.searchInput}
//       />
//       <Text style={styles.trending}>🔥 Trending Tweets</Text>
//       <FlatList
//         data={filteredTweets}
//         keyExtractor={item => item.id}
//         renderItem={({ item }) => (
//           <TweetItem
//             item={item}
//             user={user}
//             toggleLike={toggleLike}
//             commentText={commentText}
//             setCommentText={setCommentText}
//             postComment={postComment}
//           />
//         )}
//         style={{ flex: 1 }}
//       />
//       <TextInput
//         placeholder="What's on your mind?"
//         value={tweet}
//         onChangeText={setTweet}
//         style={styles.tweetInput}
//       />
//       <TouchableOpacity style={styles.postButton} onPress={postTweet}>
//         <Text style={styles.postButtonText}>Post</Text>
//       </TouchableOpacity>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 12,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#1DA1F2',
//     marginBottom: 30,
//     marginTop:79,
//     marginLeft:120,
//   },
//   searchInput: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     padding: 15,
//     borderRadius: 8,
//     marginBottom: 30,
//   },
//   trending: {
//     color: 'red',
//     fontWeight: 'bold',
//     marginBottom: 30,
//     fontSize:20,
//   },
//   tweetBox: {
//     backgroundColor: '#f2f2f2',
//     padding: 12,
//     borderRadius: 20,
//     marginBottom: 20,
//   },
//   email: {
//     fontWeight: 'bold',
//     paddingBottom:7,
//     fontSize:16,
//   },
//   text: {
//     fontSize: 16,
//   },
//   timestamp: {
//     fontSize: 12,
//     color: 'gray',
//     marginBottom: 4,
//     marginLeft:320,

//   },
//   actions: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 12,
//     marginTop: 6,
//   },
//   icon: {
//     fontSize: 16,
//     marginRight: 8,
//   },
//   comment: {
//     fontSize: 14,
//     marginLeft: 4,
//     marginTop: 10,
//   },
//   commentInput: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 6,
//     padding: 6,
//     marginTop:10,
//     width:250,
  

//   },
//   postComment: {
//     color: '#1DA1F2',
//     marginTop: 4,
//   },
//   tweetInput: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 50,
//     padding: 12,
//     marginTop: 6,
//     width:430,
//     height:60,
  
//   },
//   postButton: {
//     backgroundColor: '#1DA1F2',
//     padding: 14,
//     width:170,
//     height:50,
//     marginLeft:250,
//     alignItems: 'center',
//     marginTop: 6,
//     borderRadius: 8,
//   },
//   postButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default HomeScreen;








































import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const TweetItem = ({ item, user, toggleLike, commentText, setCommentText, postComment , deleteTweet}) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tweets')
      .doc(item.id)
      .collection('comments')
      .orderBy('createdAt', 'asc')
      .onSnapshot(snapshot => {
        const commentList = [];
        snapshot.forEach(doc => {
          commentList.push({ id: doc.id, ...doc.data() });
        });
        setComments(commentList);
      });
    return unsubscribe;
  }, [item.id]);

  return (
    <View style={styles.tweetBox}>
  
      {/* <Text style={styles.email}>{item.email}</Text>
      
      <Text style={styles.timestamp}>{moment(item.createdAt?.toDate()).fromNow()}</Text> */}
      <View style={styles.headerRow}>
  <Text style={styles.email}>{item.email}</Text>
  <Text style={styles.timestamp}> · {moment(item.createdAt?.toDate()).fromNow()}</Text>
</View>
  <Text style={styles.text}>{item.text}</Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => toggleLike(item.id, item.likedBy)}>
          <Text style={styles.icon}>❤️ {item.likes}</Text>
        </TouchableOpacity>
        <Text style={styles.icon}>💬 {comments.length}</Text>
      </View>
      {comments.map(comment => (
        <Text key={comment.id} style={styles.comment}>
          {comment.email}: {comment.text}
        </Text>
      ))}
      <TextInput
        placeholder="Write a comment..."
        value={commentText[item.id] || ''}
        onChangeText={text => setCommentText(prev => ({ ...prev, [item.id]: text }))}
        style={styles.commentInput}
      />
      <TouchableOpacity onPress={() => postComment(item.id)}>
        <Text style={styles.postComment}>Post</Text>
      </TouchableOpacity>
      {item.userId === user.uid && (
  <TouchableOpacity onPress={() => deleteTweet(item.id)}>
    <Text style={styles.deleteText}>🗑️ Delete</Text>
  </TouchableOpacity>
)}

    </View>
  );
};

const HomeScreen = () => {
  const [tweet, setTweet] = useState('');
  const [tweets, setTweets] = useState([]);
  const [search, setSearch] = useState('');
  const [commentText, setCommentText] = useState({});

  const user = auth().currentUser;

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('tweets')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const tweetsData = [];
        snapshot.forEach(doc => {
          tweetsData.push({ id: doc.id, ...doc.data() });
        });
        setTweets(tweetsData);
      });
    return unsubscribe;
  }, []);

  const postTweet = async () => {
    if (tweet.trim().length === 0) return;
    await firestore().collection('tweets').add({
      text: tweet,
      email: user.email,
      userId: user.uid,
      likes: 0,
      likedBy: [],
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    setTweet('');
  };

  const toggleLike = async (tweetId, likedBy) => {
    const isLiked = likedBy.includes(user.uid);
    const tweetRef = firestore().collection('tweets').doc(tweetId);
    await tweetRef.update({
      likes: firestore.FieldValue.increment(isLiked ? -1 : 1),
      likedBy: isLiked
        ? firestore.FieldValue.arrayRemove(user.uid)
        : firestore.FieldValue.arrayUnion(user.uid),
    });
  };

  const postComment = async (tweetId) => {
    const comment = commentText[tweetId];
    if (!comment || comment.trim() === '') return;
    await firestore()
      .collection('tweets')
      .doc(tweetId)
      .collection('comments')
      .add({
        text: comment,
        email: user.email,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
    setCommentText(prev => ({ ...prev, [tweetId]: '' }));
  };
  const deleteTweet = async (tweetId) => {
  try {
    await firestore().collection('tweets').doc(tweetId).delete();
  } catch (error) {
    console.error("Error deleting tweet:", error);
  }
};


  const filteredTweets = tweets.filter(tweet =>
    tweet.text.toLowerCase().includes(search.toLowerCase())
  );


  return (
   <SafeAreaView style={{ flex: 1, backgroundColor: '#1DA1F2' }}>
  <StatusBar backgroundColor="#1DA1F2" barStyle="light-content" />
  <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
  >
    {/* Your content here */}

        <Text style={styles.title}>Mini Twitter Feed</Text>
        <TextInput
          placeholder="🔍 Search tweets"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        <Text style={styles.trending}>🔥 Trending Tweets</Text>
        <FlatList
          data={filteredTweets}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TweetItem
              item={item}
              user={user}
              toggleLike={toggleLike}
              commentText={commentText}
              setCommentText={setCommentText}
              postComment={postComment}
              deleteTweet={deleteTweet}
            />
          )}
          style={{ flex: 1 }}
        />
        <TextInput
          placeholder="What's on your mind?"
          value={tweet}
          onChangeText={setTweet}
          style={styles.tweetInput}
        />
        <TouchableOpacity style={styles.postButton} onPress={postTweet}>
          <Text style={styles.postButtonText}>Post</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp('4%'),
    backgroundColor: '#fff',
    marginTop:60,
  },
  title: {
    fontSize: wp('6.5%'),
    fontWeight: 'bold',
    color: '#1DA1F2',
    marginBottom: hp('2%'),
    alignSelf: 'center',
  },
  searchInput: {
    borderColor: '#000',
    borderWidth: 1,
    padding: hp('1.5%'),
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  trending: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
    marginBottom: hp('2%'),
  },
  tweetBox: {
    backgroundColor: '#f2f2f2',
    padding: wp('4%'),
    borderRadius: wp('4%'),
    marginBottom: hp('2%'),
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

  email: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginBottom: hp('2.5%'),
  },
  text: {
    fontSize: wp('4%'),
    color:'#666',
  },
  timestamp: {
    fontSize: wp('3.2%'),
    color: '#000',
    alignSelf: 'flex-end',
   
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('1%'),
    gap: wp('4%'),
  },
  icon: {
    fontSize: wp('4%'),
  },
  comment: {
    fontSize: wp('3.8%'),
    marginTop: hp('1%'),
  },
  commentInput: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: wp('2%'),
    padding: hp('1%'),
    marginTop: hp('1%'),
  },
  deleteText: {
  color: 'red',
  marginTop: hp('-10%'),
  fontWeight: 'bold',
  marginLeft:wp('70%'),
},

  postComment: {
    color: '#1DA1F2',
    marginTop: hp('1%'),
  },
  tweetInput: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: wp('10%'),
    padding: hp('1.5%'),
    marginTop: hp('1%'),
  },
  postButton: {
    backgroundColor: '#1DA1F2',
    padding: hp('1.5%'),
    alignItems: 'center',
    marginTop: hp('1%'),
    borderRadius: wp('2%'),
    width:wp('40%'),
    marginLeft:wp('53%'),
  },
  postButtonText: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
  },
});

export default HomeScreen;
