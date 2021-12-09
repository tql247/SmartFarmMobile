import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    FlatList,
    TouchableOpacity
} from "react-native";
import { ListItem, Icon } from 'react-native-elements';
import {Text} from "./Themed";

interface Props {
    navigation: any
}

export class TopTrend extends Component<Props>  {

    state = {
        users: [
            {
                title: 'Release That Witch',
                subtitle: '放开那个女巫',
                imageCover: 'https://avt.mkklcdnv6temp.com/47/i/17-1583496971.jpg',
                lastUpdate: "Aug 18,2021 - 21:30 PM",
                isFollowing: false,
                tag: [
                    "Action",
                    "Adventure",
                    "Fantasy",
                    "Shounen",
                    "Webtoons"
                ]
            },
            {
                title: 'Isekai Yurutto Survival Seikatsu: Gakkou no Minna to Isekai no Mujintou ni Tenishitakedo Ore Dake Rakushou desu',
                subtitle: '異世界ゆるっとサバイバル生活 ～学校の皆と異世界の無人島に転移したけど俺だけ楽勝です～',
                imageCover: 'https://avt.mkklcdnv6temp.com/41/a/22-1606497907.jpg',
                lastUpdate: "Aug 19,2021 - 12:54 AM",
                isFollowing: true,
                tag: [
                    "Action", "Adventure", "Comedy", "Drama", "Fantasy", "Harem" ,"Psychological" , "Romance"
                ]
            },
            {
                title: 'Soredemo Ayumu wa Yosetekuru',
                subtitle: 'それでも歩は寄せてくる',
                imageCover: 'https://avt.mkklcdnv6temp.com/3/j/18-1583497210.jpg',
                lastUpdate: "Aug 18,2021 - 15:32 AM",
                isFollowing: false,
                tag: [
                    "Comedy", "Romance", "School life", "Shounen", "Slice of life",
                ]
            },
            {
                title: 'Ichioku-Nen Button O Renda Shita Ore Wa, Kizuitara Saikyou Ni Natteita',
                subtitle: 'ApretÉ El BotÓN Durante Un MillÓN De AÑOs Y Antes De Darme Cuenta, Fui El MÁS Fuerte. ; I Hit The Button For A Million Years And Before I Knew It, I Was The Strongest. ; Ichioku-Nen Button O Renda Shita Ore Wa, Kizuitara Saikyou Ni Natteita~ ; Rakudai Kenshi No Gakuin Musou~ ; 億年ボタンを連打した俺は、気付いたら最強になっていた ～落第剣士の学院無双～',
                imageCover: 'https://avt.mkklcdnv6temp.com/12/a/21-1589272261.jpg',
                lastUpdate: "Aug 19,2021 - 16:54 PM",
                isFollowing: false,
                tag: [
                    "Action", "Adventure", "Comedy", "Drama" , "Fantasy" , "Harem" , "Romance" , "Shounen", "Manhua"
                ]
            },
            {
                title: 'Martial Peak',
                subtitle: 'MP, 武炼巅峰',
                imageCover: 'https://avt.mkklcdnv6temp.com/20/b/16-1583494192.jpg',
                lastUpdate: "Aug 19,2021 - 02:24 AM",
                isFollowing: false,
                tag: [
                    "Action" , "Adventure" , "Fantasy" , "Historical" , "Martial arts"
                ]
            },
            {
                title: 'Urara Meirochou',
                subtitle: 'うらら迷路帖 ; Urara 迷路帖',
                imageCover: 'https://avt.mkklcdnv6temp.com/10/e/15-1583491828.jpg',
                lastUpdate: "Aug 19,2021 - 01:26 AM",
                isFollowing: false,
                tag: [
                    "Action" ,"Adventure", "Fantasy", "Historical" ,"Martial arts"
                ]
            },
            {
                title: 'The Reincarnated Inferior Magic Swordsman',
                subtitle: 'Inferior Magic Swordsman ; Rettou Hito no Maken Tsukai Sukiruboudo o Kushi Shite Saikyou ni Itaru ; Use the Skill Board to Become the Most Powerful Swordsman ; 劣等人の魔剣使い　スキルボードを駆使して最強に至る',
                imageCover: 'https://avt.mkklcdnv6temp.com/3/t/22-1598420567.jpg',
                lastUpdate: "Aug-18-2021 23:25:20 PM",
                isFollowing: false,
                tag: [
                    "Adventure", "Fantasy", "Shounen",
                ]
            },
            {
                title: 'Daiya No A - Act Ii',
                subtitle: 'ダイヤのA actII (Japanese); Daiya no Ace- Act II ; Diamond no Ace - Act II (English); Diamond no Ace 2',
                imageCover: 'https://avt.mkklcdnv6temp.com/50/k/13-1583489698.jpg',
                lastUpdate: "Aug 19,2021 - 16:54 PM",
                isFollowing: false,
                tag: [
                    "Comedy" ,"School life", "Shounen", "Sports"
                ]
            },
            {
                title: 'Ranger Reject',
                subtitle: 'Sentai Daishikkaku ; Боевой отряд «Полный Провал» ; Оперативный отряд "Daishikkaku" ; 戦隊大失格',
                imageCover: 'https://avt.mkklcdnv6temp.com/26/h/23-1613533484.jpg',
                lastUpdate: "Aug 19,2021 - 01:26 AM",
                isFollowing: false,
                tag: [
                    "Action", "Adventure" ,"Comedy", "Mystery" , "Sci fi", "Shounen" , "Supernatural"
                ]
            },
            {
                title: 'Blue Period',
                subtitle: 'ブルーピリオド',
                imageCover: 'https://avt.mkklcdnv6temp.com/45/s/17-1583496913.jpg',
                lastUpdate: "Aug 19,2021 - 01:26 AM",
                isFollowing: false,
                forwardScreen: "ComicDetailScreen",
                tag: [
                    "Drama" , "School life" , "Seinen"
                ]
            }
        ]
    };

    renderTitle(name: string) {
        return (
            <Text style={styles.title}>
                {name.slice(0, 25) + (name.length>25?"...":"")}
            </Text>
        )
    }

    renderImage(item: any) {
        if (item.title === "add")
            return (
                <View style={styles.image}>
                    <Icon name={"chevron-forward-circle"} size={50} type={"ionicon"} color={"#feb47b"} />
                </View>
            )
        return (
            <View style={styles.imgContainer}>
                <View style={styles.imgCover}>
                    <Image
                        style={[styles.image, {backgroundColor: item.backgroundColor || "#feb47b"}]}
                        resizeMode="cover"
                        source={ { uri: item.imageCover }}
                    />
                </View>
                <View>
                    {this.renderTitle(item.title)}
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.flatListContainer}>
                <FlatList
                    style={styles.scrollView}
                    data={this.state.users}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <View style={styles.imgContainer}>
                            <TouchableOpacity
                                onPress={() => (this.props.navigation.navigate(item.forwardScreen || "ComicDetailScreen", {subject: "Got Movie/Anime"}))}
                            >
                                {this.renderImage(item)}
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    flatListContainer: {
        flex: 1
    },
    title: {
        color: "#767676",
        fontWeight: "400",
        flexDirection: "row",
        flexWrap: "wrap",
        maxWidth: 75,
        minWidth: 75,
        textAlign: "center"
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
        flex: 1
    },
    imgContainer: {
        flexGrow: 1,
        margin: 5,
        paddingBottom: 5,
        alignItems: "flex-start",
        justifyContent: "flex-start",
    },
    imgCover: {
        flexGrow: 1,
        maxHeight: 75,
        maxWidth: 75,
        minHeight: 75,
        minWidth: 75,
        borderRadius: 75,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        borderWidth: 0.1,
        borderColor: "rgba(173,173,173,0.5)",
        maxHeight: 75,
        maxWidth: 75,
        minHeight: 75,
        minWidth: 75,
        borderRadius: 75,
        flex: 1,
    },
});
