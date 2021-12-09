import * as React from 'react';
import {Dimensions, FlatList, StyleSheet} from 'react-native';

import { View } from '../components/Themed';
import {ItemListing} from "../components/ItemListing";

const {height} = Dimensions.get("window");

export default function ListItemScreen({props, route, navigation} : any) {
    navigation.setOptions({ headerTitle: route.params.subject })

    return (
        <View style={styles.container}>
            <FlatList
                data={[1]}
                numColumns={1}
                renderItem={({item}) => (
                    <View style={styles.container}>
                        <ItemListing {...props} navigation={navigation}/>
                    </View>
                ) }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        backgroundColor: "#efefef"
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1,
        flexGrow: 1,
        height: "100%",
        minHeight: height,
    },
    threadContainer: {
        borderWidth: 0,
        margin: 2.5,
        borderColor: "transparent",
        shadowColor: 'transparent',
        marginBottom: 10
    },
    threadTitle: {
        color: "#ff7e5f",
        borderWidth: 0,
        margin: 2.5,
        fontSize: 18,
        fontWeight: "500",
        borderColor: "transparent",
        shadowColor: 'transparent',
    },
});
