import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native'
import React, { useState, useContext } from 'react'
import axios from 'axios'
import { baseUrl, userLoginBasePrefix, userLoginPrefix } from "../Constants"
import { GlobalContext } from '../App'



const Login = () => {
    const { username, setUsername, password, setPassword, isLoggedIn, setIsLoggedIn } = useContext(GlobalContext)

    const userObj = {
        'username': username,
        'password': password
    }

    const login = () => {
        let getResponse = null
                const userObj = {
                    'username':username,
                    'password':password
                }

               axios.post(baseUrl + userLoginBasePrefix + userLoginPrefix, userObj)
              .then(function (response) {
                console.log(response.data);

                try{
                    getResponse = response.data
                    if(getResponse['userLoginStatus'] === 'Success')
                    {
                        setIsLoggedIn(true)
                        Alert.alert("Login Success")
                        
                    }
                    else if(getResponse['userLoginStatus'] === 'Failed')
                    {
                        Alert.alert("Login Failed")
                    }
                }
                catch(error)
                {
                    console.log(error);
                    Alert.alert('Login Failed')
                }
              })
              .catch(function (error) {
                console.log(error);
              });
    }


    return (
        <View style={{...styles.container}}>
    <TextInput
        placeholder='username'
        onChangeText={(username_) => {
            setUsername(username_);
            console.log(username);
        }}
        style={styles.input}
    />
    <TextInput
        placeholder='password'
        onChangeText={(password_) => {
            setPassword(password_);
            console.log(password);
        }}
        style={styles.input}
    />
    <TouchableOpacity
        onPress={() => {
            login();
        }}
        
       style={{...styles.button}}
    >
        <Text style={styles.buttonText}>Send Request</Text>
    </TouchableOpacity>
</View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        backgroundColor: '#f0f0f0',
        padding: 16,
        borderRadius: 8,
        borderColor:'grey',
    },
    input: {
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        width:300,
        marginVertical:20
        
    },
    button: {
        marginTop:30,
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default Login