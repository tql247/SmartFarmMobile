import React from 'react';
import {
    StyleSheet, View, Text, Image, Dimensions,
} from 'react-native';
import Carousel, { PaginationLight } from '../libs/react-native-x-carousel/src/index';

const { width, height } = Dimensions.get('window');

const DATA = [
    {
        coverImageUri: 'https://img.blogtruyen.com/manga/22/22615/036%20copy.jpg',
        cornerLabelColor: '#74fff3',
        // cornerLabelText: 'Top 1',
    },
    {
        coverImageUri: 'https://img.blogtruyen.com/manga/17/17275/000.jpg',
        cornerLabelColor: '#e2d146',
        // cornerLabelText: 'Top 2',
    },
    {
        coverImageUri: 'https://img.blogtruyen.com/manga/23/23229/2.jpg',
        cornerLabelColor: '#e88753',
        // cornerLabelText: 'Top 3',
    },
    {
        coverImageUri: 'https://manhuadragon.com/wp-content/uploads/2021/08/lanke.jpg',
        cornerLabelColor: '#bdb9b9',
        // cornerLabelText: 'Top 4',
    },
];

export function TopCarousel() {
    const renderItem = (data: any) => (
        <View
            key={data.coverImageUri}
            style={styles.cardContainer}
        >
            <View
                style={styles.cardWrapper}
            >
                <Image
                    style={styles.listContainer}
                    source={{ uri: data.coverImageUri }}
                />
                <View
                    style={[
                        styles.cornerLabel,
                        { backgroundColor: data.cornerLabelColor },
                    ]}
                >
                    <Text style={styles.cornerLabelText}>
                        { data.cornerLabelText }
                    </Text>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                pagination={PaginationLight}
                renderItem={renderItem}
                data={DATA}
                loop
                autoplay
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width,
    },
    cardWrapper: {
        overflow: 'hidden',
    },
    listContainer: {
        width: width + 1,
        height: height - 450,
    },
    cornerLabel: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        borderTopLeftRadius: 8,
    },
    cornerLabelText: {
        fontSize: 12,
        color: '#fff',
        fontWeight: '600',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 2,
        paddingBottom: 2,
    },
});
