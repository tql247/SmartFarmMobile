import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, Modal, Pressable, Platform, TextInput } from 'react-native';

import { View, Text } from '../components/Themed';
import { RuleList } from "../components/RuleList";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { APIConfig } from "../config";
import { backgroundColor } from 'styled-system';

const { height } = Dimensions.get("window");

const wait = (timeout: any) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};
let currentFarm = [
    {
        _id: '',
        name: '',
        address: ''
    }
]

export default function RuleScreen({ navigation, props }: any) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    let [editing, setEditing] = React.useState(false);
    const insets = useSafeAreaInsets();
    const [farms, setFarms] = React.useState(currentFarm);
    const [selectedValue, setSelectedValue] = React.useState("");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            setRefreshing(false)
        });
    }, []);

    
    const _getFarms = () => {
        const axios = require("axios");

        const config = {
            method: "get",
            url: APIConfig["api"]["get_farms"].replace(
                "{owner_id}",
                "61baad92ac7a62194cb3983e"
            ),
            headers: {},
        };

        axios(config)
            .then(function (response: any) {
                currentFarm = response.data
                setFarms(currentFarm)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    const onEditing = () => {
        editing = !editing
        setEditing(editing);
        navigation.setOptions({
            headerLeft: () => (
                <Ionicons size={30} name={editing ? "checkmark-outline" : "ios-create-outline"} color="#fff" onPress={onEditing} />
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
            ),
        });
        console.log(3)
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Ionicons size={30} name={"ios-create-outline"} color="#fff" onPress={onEditing} />
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
            ),
            headerRight: () => (<Ionicons size={30} name={"ios-add"} color="#fff" onPress={() => { setModalVisible(true) }} />),
        });
        _getFarms()
    }, [navigation]);


    React.useEffect(() => {
    })


    return (
        <View style={styles.container}>
            <FlatList
                data={[1]}
                numColumns={1}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.container}>
                        <View style={[styles.threadContainer, { margin: 0 }]}>
                            <RuleList {...props} navigation={navigation} key={[editing, refreshing]} refreshing={refreshing} edit={editing} />
                        </View>
                    </View>
                )}
            />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                style={{ justifyContent: "flex-end", margin: 0 }}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", margin: 10, alignItems: "center", marginBottom: 20 }}>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Text style={{ fontSize: 18, fontWeight: "500" }}>
                            Điều kiện chạy
                        </Text>
                        <Pressable
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Done</Text>
                        </Pressable>
                    </View>
                    <View style={{ margin: 10 }}>
                        <View style={styles.modalView}>
                            <TextInput
                                style={styles.input}
                                placeholder="Tên điều kiện"
                            />
                        </View>
                        <View style={{marginVertical: 10 }}>
                            <Picker
                                selectedValue={selectedValue}
                                onValueChange={(itemValue, itemIndex) =>
                                    setSelectedValue(itemValue)
                                }
                                style={{margin: 0, padding: 0}}
                                itemStyle={{ height: 44 }}
                            >
                                {farms.map((farm) => {
                                    return (
                                        <Picker.Item key={farm._id} label={farm.name + ' - ' + farm.address} value={farm._id} />
                                    )
                                })}
                            </Picker>
                        </View>
                        {/* <View style={styles.modalView}>
                            <TextInput
                                style={styles.input}
                                placeholder="Tên điều kiện"
                                keyboardType="numeric"
                            />
                        </View> */}
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
    },
    centeredView: {
        flex: 1,
        marginTop: 63,
        borderRadius: 10
    },
    modalView: {
        marginVertical: 5,
        padding: 12,
        borderRadius: 7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center",
        color: "#ff7e5f"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    container: {
        flex: 1,
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: 'transparent',
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
        marginBottom: 3,
        fontSize: 18,
        fontWeight: "500",
        borderColor: "transparent",
        shadowColor: 'transparent',
    },
});
