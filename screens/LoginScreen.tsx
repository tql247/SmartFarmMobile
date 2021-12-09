import { StackScreenProps } from '@react-navigation/stack';
import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, TextInput } from 'react-native';
import { fontSize, fontWeight, width } from 'styled-system';
import { RootStackParamList } from '../types';

const logoRatio = 678 / 278;
const loHeight = 30

export default function LoginScreen({ navigation, }: StackScreenProps<RootStackParamList, 'NotFound'>) {
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', justifyContent: 'space-around' }}>
                <Text style={{marginVertical: 7, fontSize: 56, fontWeight: '500'}}>Welcome</Text>

                <View style={{ width: '100%', justifyContent: 'space-around', marginVertical: 20 }}>

                    <Text style={{fontWeight: '500', marginVertical: 7, fontSize: 15}}>Email/Username</Text>

                    <TextInput
                        style={styles.input}
                    />
                    <Text style={{fontWeight: '500', marginVertical: 7, fontSize: 15}}>Password</Text>

                    <TextInput
                        secureTextEntry={true}
                        style={styles.input}
                    />
                </View>


                <TouchableOpacity onPress={() => navigation.replace('Root')} style={[styles.link, {marginVertical: 10}]}>
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
