import React, { Component } from "react";
import {Image, StyleSheet, View, Dimensions, FlatList} from "react-native";
import {TopCarousel} from "./TopCarousel";

const {height} = Dimensions.get("window");

export class MainViewScroll extends Component {

    render() {

        return (
            <View style={[{flex: 1, height: "100%"}]}>
                <View style={styles.carousel}>
                    <TopCarousel/>
                </View>
                <View  style={[styles.centroid, {marginVertical: 10}]}>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1,
        flexGrow: 1,
        height: "100%",
        minHeight: height,
    },
    centroid:{
        width: "100%",
        minWidth: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    carousel: {
        flex: 1,
        flexGrow: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    blue: {
        backgroundColor: "blue"
    },
    red: {
        backgroundColor: "red"
    },
});
