import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    Switch,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ListItem, Icon } from "react-native-elements";

import { Text } from "./Themed";
import { APIConfig } from "../config";

interface Props {
    navigation: any;
    refreshing: any;
}

let itemIndex = 0;
const axios = require("axios");

export class AccountDetail extends Component<Props> {

    render() {
        return (
            <View style={styles.flatListContainer}>
                <Text>Hello</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        marginBottom: 20,
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: "transparent",
        flex: 1,
    },
});
