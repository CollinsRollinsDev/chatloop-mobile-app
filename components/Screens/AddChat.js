import React, {useLayoutEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons'
import { db, auth } from '../../firebase';
import { useUser } from '../../Contexts/User';

const AddChat = ({navigation}) => {
    const [input, setInput] = useState('');
    const {user, updateUser} = useUser();

    const createChat = async() => {
        // create chat in database
        await db.collection('chats').add({
            chatName:[user.uid, input]
        }).then(() => {
            navigation.goBack()
        }).catch((error) => alert(error))

    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title:'Add A New Chat',
            // headerStyle:{backgroundColor: '#fff'},
            // headerTitleStyle: {color: 'black'},
            headerTintColor:'black',
            // headerLeft: () => (
            //     <View style={{marginRight:10}}>
            //         <TouchableOpacity activeOpacity={0.5} onPress={signOut}>
            //         <Avatar rounded source={{uri: auth?.currentUser?.photoURL }} />
            //         </TouchableOpacity>
            //     </View>
            // ),
            // headerRight: () => (
            //     <View style={{flexDirection:'row', justifyContent:'space-between', width:80,  marginRight:20}}>
            //         <TouchableOpacity activeOpacity={0.5}>
            //             <AntDesign name="camerao" size={24} color="black" />
            //         </TouchableOpacity>
            //         <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            //             <SimpleLineIcons name="pencil" size={24} color="black" />
            //         </TouchableOpacity>
            //     </View>
            // )
        })
    }, [])

    return (
        <View>
            <Input placeholder="Enter a chat name" 
            value={input}
            onChangeText={(text) => setInput(text)}
            // leftIcon={
            //     <Icon name="wechat" type="antdesign" size={24} color="black" />
            // }
            />
            <Button onPress={createChat} title="Create New Chat" />
        </View>
    )
}

export default AddChat

const styles = StyleSheet.create({})
