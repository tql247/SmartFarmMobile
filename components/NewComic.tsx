import React, { Component } from "react";
import {Image,  StyleSheet, View, FlatList} from "react-native";


export class NewComic extends Component {

    state = {
        users: [
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/f6/5d/0e/f65d0e54480a0592d14367d39c1b0a47.jpg'
            },
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/f0/8e/3f/f08e3fa4272e5c193fa5623cc9ea86e0.jpg'
            },
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/36/5b/c4/365bc4e62d67ba378813b2a0ebd34aae.jpg'
            },
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/16/28/10/16281022f619c71db9f3cb4025f2e746.jpg'
            },
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/a1/63/78/a16378585fdcde8de8a16c0400fb99cd.jpg'
            },
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/9b/8b/fd/9b8bfdd0a63a29329e3c88d4083b9b3e.jpg'
            },
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/d3/62/4c/d3624c615d53be6c4c3f77caee1b02a5.jpg'
            },
            {
                title: ' ヘビの首を噛',
                coverImageURI: 'https://i.pinimg.com/564x/cc/63/2c/cc632c0cec998a541b9949b007ecfde4.jpg'
            },
        ]
    };

    render() {
        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.scrollView}
                    data={this.state.users}
                    horizontal={true}
                    renderItem={({item}) => (
                        <View style={styles.imgContainer}>
                            <Image
                                style={styles.image}
                                resizeMode="cover"
                                source={{ uri: item.coverImageURI }}
                            />
                        </View>
                    ) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1
    },
    imgContainer: {
        flexGrow: 1,
        margin: 2.5,
    },
    image: {
        maxHeight: 250,
        maxWidth: 200,
        minHeight: 160,
        minWidth: 120,
        borderRadius: 5,
        flex: 1,
        flexGrow: 1,
        borderWidth: 2,
        borderColor: "#feb47b",
        backgroundColor: "#feb47b",
        overflow: "hidden",
    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
    },
});
