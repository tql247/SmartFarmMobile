import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import {ActionSheetOptions} from "@expo/react-native-action-sheet";


const {height, width} = Dimensions.get("window");
const numColumn = Math.floor(width/100) - 1;

interface Props {
    navigation : any;
    showActionSheetWithOptions: (
        options: ActionSheetOptions,
        callback: (buttonIndex: number) => void
    ) => void;
}

export class FollowingFlatList extends Component<Props> {

    state = {
        screenHeight: 0,
        items: [
            {
                title: 'Dragon Ball by Akira Toriyama',
                coverImageURI: 'https://www.kindpng.com/picc/m/236-2362818_anime-sempai-animegirl-heart-kawaii-cute-anime-girl.png'
            },
            {
                title: 'Siren Roar Mir Kola',
                coverImageURI: 'https://i.imgur.com/wDlae3z.jpg'
            },
            {
                title: 'Inuyasha by Rumiko Takahashi',
                coverImageURI: 'https://i.imgur.com/zNZmemg.jpg'
            },
            {
                title: 'Maus geht kape gacha',
                coverImageURI: 'https://i.imgur.com/ti9Nf0R.jpg'
            },
            {
                title: 'Il a dit con olp',
                coverImageURI: 'https://i.imgur.com/ZvFehmB.jpg'
            },
            {
                title: 'Naruto by Masashi Kishimoto',
                coverImageURI: 'https://i.imgur.com/esC9VjO.jpg'
            },
            {
                title: 'Fullmetal Alchemist by Hiromu Arakawa',
                coverImageURI: 'https://i.imgur.com/zEqLKpl.jpg'
            },
            {
                title: 'Death Note by Tsugumi Ohba and Takeshi Obata',
                coverImageURI: 'https://i.imgur.com/l9lwBT6.jpg'
            },
            {
                title: 'Fruits Basket by Natsuki Takaya',
                coverImageURI: 'https://i.imgur.com/tKKGXAH.jpg'
            },
            {
                title: 'Sailor Moon by Naoko Takeuchi',
                coverImageURI: 'https://i.pinimg.com/564x/42/fb/ac/42fbaca97af619fb2327cf7561fa53c1.jpg'
            },
            {
                title: 'My Hero Academia by Kohei Horikoshi',
                coverImageURI: 'https://i.pinimg.com/564x/15/63/4c/15634cf53dcabcf55d3e8c9bbb771afe.jpg'
            },
            {
                title: 'Death Note',
                coverImageURI: 'https://i.pinimg.com/564x/c9/72/5c/c9725ccda0271714e360655a916dd94b.jpg'
            },
            {
                title: 'Naruto',
                coverImageURI: 'https://i.pinimg.com/564x/91/3b/ec/913becf803280c4f2baff246990d7ba9.jpg'
            },
        ]
    };

    onContentSizeChange = (contentWidth: number, contentHeight: number) => {
        this.setState({ screenHeight: contentHeight });
    };

    _onPressButton() {
        console.log('af')
    }

    _onLongPressFollowingItem(_item : any) {
        const options = ['Unfollow!', 'Cancel'];
        const destructiveButtonIndex = 0;
        const cancelButtonIndex = 1;
        console.log('a')

        this.props.showActionSheetWithOptions(
            {
                options,
                cancelButtonIndex,
                destructiveButtonIndex,
            },
            buttonIndex => {

                if (buttonIndex === 0) {
                    const _itemIndex = this.state.items.findIndex(x => x.coverImageURI === _item.coverImageURI);
                    const cpyItems = this.state.items;
                    cpyItems.splice(_itemIndex, 1);
                    this.setState({items: cpyItems})
                }
            },
        );
    }


    render() {
        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.scrollView}
                    data={this.state.items}
                    numColumns={numColumn}
                    extraData={this.state}
                    keyExtractor={item => item.coverImageURI.toString()}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={styles.touchButton}
                            delayLongPress={800}
                            onPress={this._onPressButton}
                            onLongPress={() => this._onLongPressFollowingItem(item)}
                        >
                            <View style={styles.imgContainer}>
                                <Image
                                    style={styles.image}
                                    resizeMode="cover"
                                    source={{ uri: item.coverImageURI }}
                                />
                                <View style={styles.titleContainer}>
                                    <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1,
        marginHorizontal: 2.5,
        marginTop: 2.5
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1
    },
    touchButton: {
        flexGrow: 1,
    },
    imgContainer: {
        flexGrow: 1,
        margin: 2.5,
        flexDirection: "row",
        flexWrap: "wrap",
        maxHeight: 250,
        maxWidth: 200,
        minHeight: 180,
        minWidth: 100,
        overflow: "hidden",
        borderRadius: 5,
        borderColor: "rgba(254,180,123,0.1)",
        borderWidth: 0.1,
        backgroundColor: "rgba(254,180,123,0.5)",
    },
    image: {
        width: "100%",
        height: "100%",
        flex: 1,
        flexGrow: 1,
    },
    titleContainer: {
        backgroundColor: "rgba(20,20,20,0.5)",
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingHorizontal: 1,
        paddingBottom: 1
    },
    title: {
        fontSize: 14,
        fontWeight: '400',
        width: "100%",
        color: "rgba(255,255,255,0.9)",
        marginHorizontal: 1,
    },
});
