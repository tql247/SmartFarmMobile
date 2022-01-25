import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput, Alert } from 'react-native';
import { fontSize, fontWeight, width } from 'styled-system';
import { RootStackParamList } from '../types';
import Storage from '../libs/Storage'
import { APIConfig } from '../config';

const logoRatio = 678 / 278;
const loHeight = 30
// Storage.set('a', 'hello')

export default function LoginScreen({ navigation, }: StackScreenProps<RootStackParamList, 'NotFound'>) {
    const [password, setPassword] = React.useState("")
    const [email, setEmail] = React.useState("username@email.com")


    const _login = async () => {
        if (password === "") {
            Alert.alert(
                "Có lỗi xảy ra",
                "Bạn chưa nhập mật khẩu",
                [
                    { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
            );

            return
        }


        var axios = require('axios');
        var data = {
            "email": email,
            "password": password,
        };

        var config = {
            method: 'post',
            url: APIConfig["api"]["login"],
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }

        axios(config)
            .then(async function (response: { data: any; }) {
                console.log('---------------')
                console.log(JSON.stringify(response.data))
                const data = response.data
                await Storage.set('_id', data._id)
                await Storage.set('role', data.role)
                await Storage.set('jwt', data.token)

                navigation.replace('Root')
            })
            .catch(function (error: any) {
                Alert.alert(
                    "Có lỗi xảy ra",
                    "Đăng nhập không thành công",
                    [
                        { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                );
            });
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', justifyContent: 'space-around' }}>
                <Text style={{ marginVertical: 7, fontSize: 56, fontWeight: '500' }}>Welcome</Text>

                <View style={{ width: '100%', justifyContent: 'space-around', marginVertical: 20 }}>

                    <Text style={{ fontWeight: '500', marginVertical: 7, fontSize: 15 }}>Email/Username</Text>

                    <TextInput
                        value={email}
                        style={styles.input}
                        onChangeText={str => setEmail(str)}
                    />
                    <Text style={{ fontWeight: '500', marginVertical: 7, fontSize: 15 }}>Password</Text>

                    <TextInput
                        value={password}
                        secureTextEntry={true}
                        style={styles.input}
                        onChangeText={str => setPassword(str)}
                    />
                </View>


                <TouchableOpacity onPress={() => {
                    _login()
                    // navigation.replace('Root')


                }} style={[styles.link, { marginVertical: 10 }]}>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-around',
        padding: 20,
        alignItems: 'flex-end'
    },
    input: {
        width: "100%",
        height: 44,
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 10,
    },
    link: {
        backgroundColor: '#4AAAB6',
        paddingVertical: 10,
        width: "100%",
    },
    linkText: {
        fontSize: 18,
        color: '#f9faff',
        fontWeight: "500",
        textAlign: "center"
    },
});
