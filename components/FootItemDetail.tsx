import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions, FlatList, TouchableOpacity} from "react-native";
import {Text} from "./Themed";
import {Tab, TabView} from 'react-native-elements';
import { ListItem, Avatar, Icon, Button } from 'react-native-elements';
import {ChapterList} from "./ChapterList";
const {width} = Dimensions.get("window");
const randomColor = require('randomcolor');

interface Props {
    navigation: any;
    params: any;
}

export class FootItemDetail extends Component<Props> {

    state = {
        indexTab: 0,
        chapters: [],
    };

    render() {
        return (
            <View style={styles.container}>
                <Tab value={this.state.indexTab} onChange={(value) => this.setState({indexTab: value})}>
                    <Tab.Item style={styles.item} titleStyle={{fontSize: 15, textTransform: "none"}} title="Chapters" />
                    <Tab.Item style={styles.item} titleStyle={{fontSize: 15, textTransform: "none"}} title="Comments" />
                </Tab>

                <TabView value={this.state.indexTab} >
                    <TabView.Item style={{ }}>
                        <ChapterList {...this.props}
                                     navigation={this.props.navigation}
                                     params={this.props.params}/>
                    </TabView.Item>
                    <TabView.Item style={{ width: '100%' }}>
                        <Text>comment</Text>
                    </TabView.Item>
                </TabView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
    },
    item: {
        height: 45, alignItems: "center", justifyContent: "center"
    }
});
