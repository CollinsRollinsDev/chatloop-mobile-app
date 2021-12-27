import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { db } from "../firebase";
import { useUser } from "../Contexts/User";

const CustomListItem = ({ id, chatName, enterChat }) => {

    const {user, updateUser} = useUser();

    console.log("user here", user)

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
      console.log(id, "as the id......")
      const unsubscribe = db
      .collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatMessages(
          snapshot.docs.map((doc) => doc.data())
        )
      );
    return unsubscribe;
  }, []);

  useEffect(() => {
     console.log("messages are", chatMessages)
  }, [chatMessages])

//   console.log(chatName, "testing array of chatName")

  let getChatName = chatName.filter(item => item != user.uid && item)


  return (
    <ListItem key={id} onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar
        rounded
        source={{
          uri: "https://media.istockphoto.com/vectors/male-user-icon-vector-id517998264?k=20&m=517998264&s=612x612&w=0&h=pdEwtkJlZsIoYBVeO2Bo4jJN6lxOuifgjaH8uMIaHTU=",
        }}
        style={{ height: 40, width: 40 }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {getChatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages.length != 0 && chatMessages[0].message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
