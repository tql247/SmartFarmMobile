import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, Modal, Pressable, Platform, TextInput, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native';

import { View, Text } from '../components/Themed';
import { RuleList } from "../components/RuleList";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";
import { APIConfig } from "../config";
import { flex, width } from 'styled-system';
import Storage from '../libs/Storage'

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
let currentSensors = [
    {
        _id: "0",
        name: "Comage",
        unit: "",
        located: {
            address: "Tp. Hồ Chí Minh",
            name: "sf4",
            owner: "61baad92ac7a62194cb3983e",
            _id: "61d8a1f56af3d133b457bc14",
        },
        owner: {
            email: "email222311321",
            full_name: "full_name2",
            _id: "61baad92ac7a62194cb3983e",
        },
        value: "-",
        display: true,
    },
];
let currentMachine = [
    {
        _id: "0",
        name: "-",
        located: {
            address: "-",
            name: "-",
            owner: "-",
            _id: "-",
        },
        owner: {
            email: "-",
            full_name: "-",
            _id: "-",
        },
        value: "-",
        display: true,
        active: false,
    },
]

export default function RuleScreen({ navigation, props }: any) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    let [editing, setEditing] = React.useState(false);
    const insets = useSafeAreaInsets();

    const [farms, setFarms] = React.useState(currentFarm);
    const [sensors, setSensors] = React.useState(currentSensors);
    const [machines, setMachines] = React.useState(currentMachine);

    const [selectedValue, setSelectedValue] = React.useState("");
    const [selectedSensor, setSensor] = React.useState("");
    const [selectedMachine, setMachine] = React.useState("");

    const [ruleID, setRuleID] = React.useState("")
    const [ruleName, setRuleName] = React.useState("Tên điều kiện")

    const [threshold, setThreshold] = React.useState("")

    const [sh, setSH] = React.useState("00")
    const [sm, setSM] = React.useState("00")
    const [eh, setEH] = React.useState("23")
    const [em, setEM] = React.useState("00")

    const [duration, setDuration] = React.useState("10")


    const [selectedExpr, setEpxr] = React.useState(">=");
    const [selectedTarget, setTarget] = React.useState("ON");

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            setRefreshing(false)
        });
    }, []);


    const _getFarms = async () => {
        const axios = require("axios");

        const config = {
            method: "get",
            url: APIConfig["api"]["get_farms"].replace(
                "{owner_id}",
                "61baad92ac7a62194cb3983e"
            ),
            headers: {},
        };


        // const value = await Storage.get('a')
        // console.log(value);

        axios(config)
            .then(function (response: any) {
                currentFarm = response.data
                setFarms(currentFarm)
                if (currentFarm) setSelectedValue(currentFarm[0]._id)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }


    const _getSensors = () => {
        const axios = require("axios");

        const config = {
            method: "get",
            url: APIConfig["api"]["get_sensor"].replace(
                "{owner_id}",
                "61baad92ac7a62194cb3983e"
            ),
            headers: {},
        };


        axios(config)
            .then(function (response: any) {
                currentSensors = response.data
                setSensors(currentSensors)
                if (currentSensors) setSensor(currentSensors[0]._id)
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }


    const _getMachines = () => {
        const axios = require("axios");

        const config = {
            method: "get",
            url: APIConfig["api"]["get_machine"].replace(
                "{owner_id}",
                "61baad92ac7a62194cb3983e"
            ),
            headers: {},
        };

        axios(config)
            .then(function (response: any) {
                currentMachine = response.data
                setMachines(currentMachine)
                if (currentMachine) setMachine(currentMachine[0]._id)
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
    };


    const [scrollEnabled, setScrollEnabled] = React.useState(true);

    const createOrUpdateRule = () => {
        // setModalVisible(!modalVisible)
        console.log(selectedValue)

        console.log(ruleID?"update":"create")

        var axios = require('axios');
        var data = {
            "_id": ruleID,
            "farm": selectedValue,
            "name": ruleName,
            "owner": "61baad92ac7a62194cb3983e",
            "sensor": selectedSensor,
            "sensorValue": threshold,
            "start_at": sh + ":" + sm,
            "end_at": eh + ":" + em,
            "duration": duration,
            "state": "false",
            "expr": selectedExpr,
            "target": selectedTarget,
            "machine": selectedMachine
        };

        var config = {
            method: 'post',
            url: ruleID?APIConfig["api"]["update_rule"]:APIConfig["api"]["create_rule"],
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        };

        // return

        axios(config)
            .then(function (response: { data: any; }) {
                console.log(JSON.stringify(response.data));
                setRuleID("")
                onRefresh() 
            })
            .catch(function (error: any) {
                console.log(error);
            });

        setModalVisible(!modalVisible)
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Ionicons size={30} name={"ios-create-outline"} color="#fff" onPress={onEditing} />
                // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
            ),
            headerRight: () => (<Ionicons size={30} name={"ios-add"} color="#fff" onPress={() => { setModalVisible(true) }} />),
        });
        _getFarms()
        _getSensors()
        _getMachines()
    }, [navigation]);

    const ruleForm = {
        setRuleID: setRuleID,
        setModalVisible: setModalVisible,
        setRuleName: setRuleName,
        setSelectedValue: setSelectedValue,
        setSH: setSH,
        setSM: setSM,
        setEH: setEH,
        setEM: setEM,
        setSensor: setSensor,
        setEpxr: setEpxr,
        setThreshold: setThreshold,
        setMachine: setMachine,
        setTarget: setTarget,
        setDuration: setDuration,
    }

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
                            <RuleList {...props} navigation={navigation} key={[editing, refreshing, ruleForm]} ruleForm={ruleForm} refreshing={refreshing} edit={editing} />
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
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                    <View style={styles.centeredView}>

                        <View style={{ zIndex: 3, elevation: 3, flexDirection: "row", justifyContent: "space-between", padding: 5, alignItems: "center", marginBottom: 20 }}>
                            <Pressable
                                onPress={() => setModalVisible(!modalVisible)}
                            >
                                <Text style={[styles.textStyle, {padding: 10}]}>Cancel</Text>
                            </Pressable>
                            <Text style={{ fontSize: 18, fontWeight: "500" }}>
                                Điều kiện chạy
                            </Text>
                            <Pressable
                                onPress={() => createOrUpdateRule()}
                            >
                                <Text style={[styles.textStyle, {padding: 10}]}>Done</Text>
                            </Pressable>
                        </View>

                        <KeyboardAvoidingView
                            behavior={"padding"}
                            style={{ flex: 1 }}
                            keyboardVerticalOffset={60}
                        >
                            <ScrollView
                                scrollEnabled={true}
                            >
                                <View style={{ margin: 5 }}>
                                    <View style={styles.modalView}>
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Tên điều kiện"
                                            value={ruleName}
                                            onChangeText={str => setRuleName(str)}
                                        />
                                    </View>
                                    <View style={{ marginVertical: 10 }}>
                                        <Picker
                                            selectedValue={selectedValue}
                                            onValueChange={(itemValue, itemIndex) => {
                                                setSelectedValue(itemValue)
                                            }}
                                            style={{ marginHorizontal: -10, marginVertical: 10, fontSize: 16 }}
                                            itemStyle={{ height: 45, fontSize: 16, paddingVertical: 10 }}
                                        >
                                            {farms.map((farm) => {
                                                return (
                                                    <Picker.Item style={{ fontSize: 16 }} key={farm._id} label={farm.name + ' - ' + farm.address} value={farm._id} />
                                                )
                                            })}
                                        </Picker>
                                    </View>
                                    <View style={[{ borderRadius: 7, padding: 10 }]}>
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                                <Text style={{ color: "gray", fontSize: 16 }}>Khung giờ</Text>
                                                <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <TextInput
                                                            style={{ fontSize: 16 }}
                                                            placeholder="00"
                                                            value={sh}
                                                            onChangeText={value => setSH(value)}
                                                            keyboardType="numeric"
                                                            maxLength={2}
                                                        />
                                                        <Text style={{ fontSize: 16 }}>:</Text>
                                                        <TextInput
                                                            style={{ fontSize: 16 }}
                                                            placeholder="00"
                                                            value={sm}
                                                            onChangeText={value => setSM(value)}
                                                            keyboardType="numeric"
                                                            maxLength={2}
                                                        />
                                                    </View>
                                                    <Text style={{ fontSize: 16 }}> - </Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <TextInput
                                                            style={{ fontSize: 16 }}
                                                            placeholder="10"
                                                            keyboardType="numeric"
                                                            value={eh}
                                                            onChangeText={value => setEH(value)}
                                                            maxLength={2}
                                                        />
                                                        <Text style={{ fontSize: 16 }}>:</Text>
                                                        <TextInput
                                                            style={{ fontSize: 16 }}
                                                            placeholder="00"
                                                            keyboardType="numeric"
                                                            value={em}
                                                            onChangeText={value => setEM(value)}
                                                            maxLength={2}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            {/* <Ionicons size={20} name={"ios-chevron-forward-outline"} color="rgba(225,225,225, 1)" /> */}
                                        </View>
                                        <View style={{ marginVertical: 10, borderBottomWidth: StyleSheet.hairlineWidth, borderColor: "rgba(225,225,225, 1)" }}></View>
                                        <TouchableOpacity disabled={true}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ color: "gray", fontSize: 16 }}>Cảm biến</Text>
                                                    <Text style={{ color: "gray", fontSize: 16 }}></Text>
                                                </View>
                                                {/* <Ionicons size={20} name={"ios-chevron-forward-outline"} color="rgba(225,225,225, 1)" /> */}
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{}}>
                                        <Picker
                                            selectedValue={selectedSensor}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setSensor(itemValue)
                                            }
                                            style={{ marginHorizontal: -10, fontSize: 16 }}
                                            itemStyle={{ height: 45, fontSize: 16, paddingVertical: 10 }}
                                        >
                                            {sensors.map((sensor) => {
                                                return (
                                                    <Picker.Item style={{ fontSize: 16 }} key={sensor._id} label={sensor.name} value={sensor._id} />
                                                )
                                            })}
                                        </Picker>
                                    </View>

                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                        <View style={{ borderRadius: 10, justifyContent: "center", flex: 1, borderWidth: StyleSheet.hairlineWidth, borderColor: "rgba(225,225,225, 1)" }}>
                                            <TouchableOpacity onPress={() => setEpxr(selectedExpr === ">=" ? "<=" : ">=")}>
                                                <View style={{ borderRadius: 10, padding: 10, flexGrow: 1 }}>
                                                    <Text style={{ color: "gray", fontSize: 16, textAlign: "center" }}> {selectedExpr} </Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: "row", justifyContent: "center", flex: 1 }}>
                                            <TextInput
                                                style={{ fontSize: 16, flex: 1, textAlign: "center" }}
                                                placeholder="00"
                                                keyboardType="numeric"
                                                value={threshold}
                                                onChangeText={value => setThreshold(value)}
                                            />
                                        </View>
                                    </View>

                                    <View style={[{ marginTop: 15, borderRadius: 7, padding: 10 }]}>
                                        <TouchableOpacity disabled={true}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ color: "gray", fontSize: 16 }}>Thiết bị</Text>
                                                    <Text style={{ color: "gray", fontSize: 16 }}></Text>
                                                </View>
                                                {/* <Ionicons size={20} name={"ios-chevron-forward-outline"} color="rgba(225,225,225, 1)" /> */}
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{}}>
                                        <Picker
                                            selectedValue={selectedMachine}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setMachine(itemValue)
                                            }
                                            style={{ marginHorizontal: -10, fontSize: 16 }}
                                            itemStyle={{ height: 45, fontSize: 16, paddingVertical: 10 }}
                                        >
                                            {machines.map((machine) => {
                                                return (
                                                    <Picker.Item style={{ fontSize: 16 }} key={machine._id} label={machine.name} value={machine._id} />
                                                )
                                            })}
                                        </Picker>
                                    </View>

                                    <View style={{}}>
                                        <Picker
                                            selectedValue={selectedTarget}
                                            onValueChange={(itemValue, itemIndex) =>
                                                setTarget(itemValue)
                                            }
                                            style={{ marginHorizontal: -10, fontSize: 16 }}
                                            itemStyle={{ height: 45, fontSize: 16, paddingVertical: 10 }}
                                        >
                                            <Picker.Item style={{ fontSize: 16 }} key="ON" label="ON" value="ON" />
                                            <Picker.Item style={{ fontSize: 16 }} key="OFF" label="OFF" value="OFF" />
                                        </Picker>
                                    </View>

                                    <View style={[{ marginTop: 15, borderRadius: 7, padding: 10 }]}>
                                        <TouchableOpacity disabled={true}>
                                            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
                                                    <Text style={{ color: "gray", fontSize: 16 }}>Tự động tắt sau</Text>
                                                    <Text style={{ color: "gray", fontSize: 16 }}></Text>
                                                </View>
                                                {/* <Ionicons size={20} name={"ios-chevron-forward-outline"} color="rgba(225,225,225, 1)" /> */}
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                        <TextInput
                                            style={{ fontSize: 16, flex: 1, textAlign: "center", padding: 5 }}
                                            value={duration}
                                            onChangeText={value => setDuration(value)}
                                            placeholder="00 (phút)"
                                            keyboardType="numeric"
                                            maxLength={2}
                                        />
                                    </View>

                                </View>
                            </ScrollView>
                        </KeyboardAvoidingView>

                    </View>

                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 16
    },
    centeredView: {
        flex: 1,
        marginTop: 60,
        borderRadius: 10,
        fontSize: 16,
        overflow: 'hidden',
        backgroundColor: 'white'
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
        shadowOpacity: 0.2,
        shadowRadius: 1.00,
        elevation: 1,
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
