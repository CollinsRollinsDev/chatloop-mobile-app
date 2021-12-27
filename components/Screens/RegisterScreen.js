import { StatusBar } from 'expo-status-bar'
import React, {useState, useLayoutEffect} from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, View } from 'react-native'
import {Button, Input, Image} from 'react-native-elements';
import { auth } from '../../firebase';

const RegisterScreen = ({navigation}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [inputUrl, setInputUrl] = useState('')

    const register = async() => {
        auth.createUserWithEmailAndPassword(email, password).then((authUser) => {
            authUser.user.updateProfile({
                displayName:name,
                photoURL:inputUrl || "https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
            })
        }).catch(error => console.log(error.message))
    }

    useLayoutEffect(() => {
       navigation.setOptions({
           headerBackTitle: "Back to login"
       })
    }, [navigation])

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <StatusBar style="light" />
            <Text h3 style={{marginBottom:50}}>
                Create Chatloop Account
            </Text>

            <View style={styles.inputContainer}>
            <Input placeholder="Full Name" autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
            <Input placeholder="Email" type="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <Input placeholder="Password" secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)}  />
            {/* <Input placeholder="Profile Picture Url (optional)" type="text" value={inputUrl} onChangeText={(text) => setInputUrl(text)}  /> */}
           
            <Button raised containerStyle={styles.button} onPress={register} title="Register" />
        </View>
        </KeyboardAvoidingView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor:'#fff',
        padding:10,
    },
    inputContainer:{
        marginTop:10,
        width:300,
        justifyContent:'center',
        alignItems:'center'
    },
    button:{
        width:200,
        marginTop:10
    },
})
