import React, { useLayoutEffect, useState,useRef, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { Avatar } from "react-native-elements";
import { AntDesign, SimpleLineIcons, Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { auth, db } from "../../firebase";
import * as firebase from "firebase";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const setRef = useCallback(node => {
    if(node){
    node.scrollIntoView({ smooth: true})
    }
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add A New Chat",
      headerBackTitleVisible: false,
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            rounded
            source={{
              uri: messages[0]?.data.photoURL || "https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?k=20&m=517998264&s=612x612&w=0&h=pdEwtkJlZsIoYBVeO2Bo4jJN6lxOuifgjaH8uMIaHTU=",
            }}
          />
          <Text style={{ marginLeft: 10 }}>{route.params.chatName}</Text>
        </View>
      ),
      headerLeft: () => (
        <TouchableOpacity>
          {/* <AntDesign name="arrowleft" size={24} color="white" /> */}
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            {/* <AntDesign name="video-camera" size={24} color="white" /> */}
          </TouchableOpacity>
          <TouchableOpacity>
            <SimpleLineIcons name="pencil" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, messages]);

  const sendMessage = () => {
    Keyboard.dismiss();
    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURl: auth.currentUser.photoURL,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, [route]);

  useLayoutEffect(() => {
    //  console.log(messages)
  }, [messages])

  const displayMessage = (
    messages.map(({id, data}, index) => {
        // const lastMessage = messages.length - 1 === index
        // console.log(lastMessage, "as last message")
        if(data.email === auth.currentUser.email){
            return (
            <View key={id} style={styles.reciever}>
          <Avatar
            position="absolute"
            rounded
            bottom={15}
            size={30}
            right={-5}
            source={{uri:data.photoURL}}
            containerStyle={{
                position:"absolute",
                bottom:15,
                right:-5
            }}
          />
          <Text style={styles.recieverText}>{data.message}</Text>
        </View>
        )
        } else{
            return (
                <View style={styles.sender}>
                <Avatar 
                position="absolute"
                rounded
                bottom={15}
                size={30}
                right={-5}
                source={{uri:data.photoURL}}
                containerStyle={{
                    position:"absolute",
                    bottom:15,
                    right:-5
                }}
                />
                <Text style={styles.senderText}>{data.message}</Text>
                <Text style={styles.senderName}>{data.displayName}</Text>
              </View>
            )
        }
    })
  )

  const scrollViewRef = useRef();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView ref={scrollViewRef}
      onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })} contentContainerStyle={{paddingTop:15}}>
              {displayMessage}
            </ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Message"
                style={styles.textInput}
                value={input}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* <Text>{route.params.chatName}</Text> */}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    borderColor: "transparent",
    backgroundColor: "#ECECEC",
    borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
  reciever:{
      padding:15,
      alignSelf:'flex-end',
      backgroundColor:'#ECECEC',
      borderRadius:20,
      marginRight:15,
      marginBottom:20,
      maxWidth:'80%',
      position:'relative',
  },
  recieverText:{
    color:'black',
    fontWeight:'500',
    marginLeft:10,
  },
  senderText:{
    color:'white',
    fontWeight:'500',
    marginLeft:10,
    marginBottom:15
  },
  sender:{
    padding:15,
    alignSelf:'flex-start',
    backgroundColor:'#2b68e6',
    borderRadius:20,
    margin:15,
    marginBottom:20,
    maxWidth:'80%',
    position:'relative',
  },
  senderName:{
      left:10,
      paddingRight:10,
      fontSize:10,
      color:'white'
  }
});
