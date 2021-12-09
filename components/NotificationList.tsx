import React, { Component } from "react";
import {Image, ScrollView, StyleSheet, View, Dimensions} from "react-native";
import {Card} from "react-native-elements";
import {Text} from "./Themed";

const {height} = Dimensions.get("window");

export class NotificationList extends Component {

    state = {
        screenHeight: 0,
        users: [
            {
                from: '文学之祖',
                mess: '诗乃，艺术之根。诗是一种阐述心灵的文学，而诗人则需要掌握成熟的艺术技巧，并按照一定的音节、声调和韵律的要求，',
                imageCover: 'https://www.kindpng.com/picc/m/236-2362818_anime-sempai-animegirl-heart-kawaii-cute-anime-girl.png'
            },
            {
                from: '体裁',
                mess: '用凝练的语言、充沛的情感以及丰富的意象来高度集中地表现社会生活和人类精神世界。',
                imageCover: 'https://i.pinimg.com/originals/eb/bb/9c/ebbb9c6067fd1f30c0c1b5261833e051.jpg'
            },
            {
                from: 'Siren',
                mess: 'Praise the rain; the seagull dive' +
                    'The curl of plant, the raven talk',
                imageCover: 'https://i.imgur.com/wDlae3z.jpg'
            },
            {
                from: 'У меня',
                mess: 'Уесть время чтобы прочесть ещё одно недавнее стихотворение.' +
                    'The curl of plant, the raven talk',
                imageCover: 'https://i.imgur.com/zNZmemg.jpg'
            },
            {
                from: 'Maus geht',
                mess: 'Die Katze, die auf den Baum klettert, fragt, wohin die',
                imageCover: 'https://i.imgur.com/ti9Nf0R.jpg'
            },
            {
                from: 'Il a dit',
                mess: 'Le chat qui grimpe au grand arbre demande où va la souris',
                imageCover: 'https://i.imgur.com/ZvFehmB.jpg'
            },
            {
                from: '它说',
                mess: '爬上高树的猫，问老鼠离家去哪里',
                imageCover: 'https://i.imgur.com/esC9VjO.jpg'
            },
            {
                from: '的死',
                mess: '說要遠道去市場買魚露買鹽給貓爸爸',
                imageCover: 'https://i.imgur.com/zEqLKpl.jpg'
            },
            {
                from: '塘里',
                mess: '鹳晚上去吃东西，落在柔软的树枝上，掉进池塘里',
                imageCover: 'https://i.imgur.com/l9lwBT6.jpg'
            },
            {
                from: '先生',
                mess: '请快来接我，有心就洗笋，有扰就洗清水，不要搅扰水。',
                imageCover: 'https://i.imgur.com/iceIEhp.jpg'
            },
            {
                from: '3月ま',
                mess: 'で、カエルはヘビの首を噛み、それを野原に放しました。',
                imageCover: 'https://i.imgur.com/tKKGXAH.jpg'
            },
        ]
    };

    onContentSizeChange = (contentWidth: number, contentHeight: number) => {
        this.setState({ screenHeight: contentHeight });
    };

    render() {
        const scrollEnabled = this.state.screenHeight > height;

        return (
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={styles.scrollView}
                scrollEnabled={scrollEnabled}
                onContentSizeChange={this.onContentSizeChange}
            >
                <Card containerStyle={styles.listContainer}>
                    {
                        this.state.users.map((u, i) => {
                            return (
                                <View key={i} style={styles.itemContainer}>
                                    <Image
                                        style={styles.image}
                                        resizeMode="cover"
                                        source={{ uri: u.imageCover }}
                                    />
                                    <View style={styles.content}>
                                        <Text style={styles.from}>{u.from}</Text>
                                        <Text style={styles.mess}>{u.mess}</Text>
                                    </View>
                                </View>
                            );
                        })
                    }
                </Card>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    scrollView: {
        backgroundColor: "black",
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flexGrow: 1,
    },
    listContainer: {
        width: '100%',
        minWidth: '100%',
        margin: 0,
        padding: 0,
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flexGrow: 1,
    },
    itemContainer: {
        flexDirection: "row",
        width: '100%',
        minWidth: '100%'
    },
    image: {
        height: 65,
        width: 65,
        overflow: "hidden",
        borderRadius: 100,
        margin: 10
    },
    content: {
        margin: 10,
        flex: 1
    },
    from: {
        fontSize: 17,
        fontWeight: 'bold',
    },
    mess: {
        fontSize: 15,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
