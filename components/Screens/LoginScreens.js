import React from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView } from 'react-native'
import {Button, Input, Image} from 'react-native-elements';
import { StatusBar } from "expo-status-bar";
import {useState, useEffect} from 'react'
import { auth } from '../../firebase';
import { useUser } from '../../Contexts/User';


const LoginScreens = ({navigation}) => {
    const {user, updateUser} = useUser();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async() => {
        auth.signInWithEmailAndPassword(email, password).catch(error => alert(error))
    }

    useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser){
                // push to homepage
                updateUser(authUser.providerData[0])
                navigation.replace("Home")
            }
        })
        return unsubscribe;
    }, [])

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <StatusBar style="light" />
        <Image source={{
            uri:'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/1200px-Signal-Logo.svg.png',
        }}
        style={{width:200, height:200, marginBottom:20}} />
        <View style={styles.inputContainer}>
            <Input placeholder="Email" autoFocus type="Email" value={email} onChangeText={(text) => setEmail(text)} />
            <Input onSubmitEditing={signIn} placeholder="Password" secureTextEntry type="password" value={password} value={password} onChangeText={(text) => setPassword(text)}  />
            <Button containerStyle={styles.button} onPress={signIn} title="Login" />
            <Button containerStyle={styles.button} onPress={() => navigation.navigate("Register")} type="outline" title="Register" />
        </View>
    </KeyboardAvoidingView>
    )
}

export default LoginScreens

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
        alignItems:'center',
        
    },
    button:{
        width:200,
        marginTop:10
    },
   
})
