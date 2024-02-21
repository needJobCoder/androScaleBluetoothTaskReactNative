import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { baseUrl, userLoginBasePrefix, createUserPrefix } from '../Constants';
import axios from 'axios';

const SignUp = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [password, setPassword] = useState<string | null>(null);
    const [passwordMatch, setPasswordMatch] = useState<string | null>(null)



    const handleCreateUserRequest = () => {
        let getResponse = null
        const userObj = {
            'username': username,
            'password': password
        }
        if (password === passwordMatch) {
            axios.post(baseUrl + userLoginBasePrefix + createUserPrefix, userObj)
                .then(function (response) {
                    console.log(response.data);

                    try {
                        getResponse = response.data
                        if(getResponse['userCreationStatus'] ===  'Success')
                        {
                            Alert.alert("User Created")
                        }
                        else if(getResponse['userCreationStatus'] ===  'Failed')
                        {
                            Alert.alert("User Creation Failed")
                        }
                        
                    }
                    catch (error) {
                        console.log(error);
                        Alert.alert('Login Failed')
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }else
        {
            Alert.alert("Passwords Do Not Match")
        }

    }

    return (

        <View style={styles.container}>
            <TextInput
                placeholder='Username'
                onChangeText={(username_) => setUsername(username_)}
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                onChangeText={(password_) => setPassword(password_)}
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                placeholder='Password'
                onChangeText={(password_) => setPasswordMatch(password_)}
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity onPress={()=> {
                handleCreateUserRequest()
                
            }} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 8,
        borderColor: 'grey',
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    input: {
        marginBottom: 8,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        width: 300,
        marginVertical: 20,
    },
    button: {
        backgroundColor: '#007bff',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 40

    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
})

export default SignUp