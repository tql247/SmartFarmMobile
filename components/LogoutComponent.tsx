import { ListItem, Icon } from 'react-native-elements'

import React, { Component } from "react";
import { Image, ScrollView, StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";
import { Card } from "react-native-elements";
import { Text } from "./Themed";

const { height } = Dimensions.get("window");

interface Props {
    navigation: any
}

export class LogoutComponent extends Component<Props> {
    render() {
        return (
            <TouchableOpacity
                onPress={() => (this.props.navigation.replace('LoginScreen'))}
            >
                <ListItem >
                    <Icon name={'logout'} color={'#ff7e5f'} />
                    <ListItem.Content>
                        <ListItem.Title style={{ color: '#ff7e5f' }}>Đăng xuất</ListItem.Title>
                    </ListItem.Content>
                </ListItem>

            </TouchableOpacity>
        );
    }
}
