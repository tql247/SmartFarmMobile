import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    View,
    Dimensions,
    Switch,
    FlatList,
    TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ListItem, Icon } from "react-native-elements";
import { Text } from "./Themed";
import { APIConfig } from "../config";
import { alignItems, display, height } from "styled-system";

interface Props {
    navigation: any;
    refreshing: any;
}

let itemIndex = 0;
const axios = require("axios");

export class RuleList extends Component<Props> {
    state = {
        selectedLanguage: 'all',
        refreshing: this.props.refreshing,
        farms: [
            {
                _id: '',
                name: '',
                address: ''
            }
        ],
        items: [
            {
                duration: 10,
                state: false,
                _id: "61e7712ae5e2904ecc3534ab",
                name: 'dieukienchaytest1',
                located: {
                    _id: "61d8a1f56af3d133b457bc14",
                    name: 'sf4',
                    address: 'Tp. Hồ Chí Minh',
                    owner: "61baad92ac7a62194cb3983e"
                },
                owner: {
                    _id: "61baad92ac7a62194cb3983e",
                    email: 'username@email.com',
                    full_name: 'Người Dùng'
                },
                sensor: {
                    _id: "61dad0b6358dcd2a40913e2b",
                    name: 'st1',
                    owner: "61baad92ac7a62194cb3983e"
                },
                threshold: 50,
                start_at: '10:00',
                end_at: '18:00',
                expr: '>=',
                target_value: 'ON',
                machine: {
                    _id: "61e51ec211066b3468da3bd0",
                    name: 'mca1',
                    owner: "61baad92ac7a62194cb3983e"
                },
                value: '-',
                display: true,
            },
        ],
    };

    _mapData(data: any) {
        const newData = [];

        for (let machine of data) {
            machine.display = true;
            newData.push(machine);
        }

        this.setState({ items: newData });
    }

    _getRules() {
        const axios = require("axios");

        const config = {
            method: "get",
            url: APIConfig["api"]["get_rule"].replace(
                "{owner_id}",
                "61baad92ac7a62194cb3983e"
            ),
            headers: {},
        };

        const self = this;

        axios(config)
            .then(function (response: any) {
                self._mapData(response.data);
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    _getFarms() {
        const axios = require("axios");

        const config = {
            method: "get",
            url: APIConfig["api"]["get_farms"].replace(
                "{owner_id}",
                "61baad92ac7a62194cb3983e"
            ),
            headers: {},
        };

        const self = this;

        axios(config)
            .then(function (response: any) {
                self.setState({ farms: response.data });
            })
            .catch(function (error: any) {
                console.log(error);
            });
    }

    updateRuleState(value: boolean, _id: string) {
        const _itemIndex = this.state.items.findIndex((x) => x._id === _id);
        const cpyItems = this.state.items;
        console.log(_itemIndex);
        cpyItems[_itemIndex].state = value;
        this.setState({ items: cpyItems });

        var data = JSON.stringify({
            "_id": _id,
            "state": value
        });

        var config = {
            method: 'post',
            url: APIConfig["api"]["set_rule_state"],
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response: { data: any; }) {
                console.log('JSON.stringify(response.data)');
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error: any) {
                console.log(error);
            });

    }

    filterValueByFarm(itemValue: string) {
        this.setState({ selectedLanguage: itemValue })

        const newData = [];
        for (let machine of this.state.items) {
            if (itemValue === "all") {
                machine.display = true;
            }
            else if (machine.located._id !== itemValue) {
                machine.display = false;
            } else {
                machine.display = true;
            }
            newData.push(machine);
        }

        this.setState({ items: newData });
    }

    componentDidMount() {
        // if (this.state.refreshing) return
        this._getFarms()
        this._getRules();
    }

    renderTitle(
        item: any
    ) {
        if (!item.display) return;
        itemIndex++;

        return (
            <View
                style={{
                    backgroundColor:
                        itemIndex % 2 === 0 ? "rgba(225,225,225,0.45)" : "transparent",
                    padding: 5,
                }}
            >
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                    <View style={{ flex: 1, flexDirection: "column", justifyContent: "space-between" }}>
                        <Text style={styles.title} numberOfLines={1}>
                            {item.name}
                        </Text>
                        <Text>
                            {item.located.name} - {item.located.address}
                        </Text>
                        <Text>Nếu {item.sensor.name} {item.expr} {item.threshold} thì {item.machine.name} {item.target_value}</Text>
                        <Text>{item.start_at} - {item.end_at}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={item.state ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            value={item.state}
                            onValueChange={(value) => this.updateRuleState(value, item._id)}
                        />
                    </View>

                </View>
            </View>
        );
    }

    renderItem(item: any) {
        return (
            <View style={styles.imgContainer}>
                {this.renderTitle(item)}
            </View>
        );
    }

    render() {
        return (
            <View style={styles.flatListContainer}>
                <Picker
                    selectedValue={this.state.selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        this.filterValueByFarm(itemValue)
                    }
                    style={styles.picker}
                    itemStyle={{ height: 44 }}
                >
                    <Picker.Item label="All" value="all" />
                    {this.state.farms.map((farm) => {
                        return (
                            <Picker.Item key={farm._id} label={farm.name + ' - ' + farm.address} value={farm._id} />
                        )
                    })}
                </Picker>
                <FlatList
                    style={styles.scrollView}
                    data={this.state.items}
                    extraData={this.state}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.imgContainer}>
                            <TouchableOpacity
                            // onPress={() =>
                            //     this.props.navigation.navigate(
                            //         item.forwardScreen || "ComicDetailScreen",
                            //         {
                            //             mangaProviderId: item.mangaProviderId,
                            //             mangaTitle: item.title,
                            //         }
                            //     )
                            // }
                            >
                                {this.renderItem(item)}
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    picker: {
        borderColor: "#666",
    },
    flatListContainer: {
        flex: 1,
        marginBottom: 20,
    },
    title: {
        color: "#666666",
        fontSize: 23,
        fontWeight: "400",
        flexWrap: "wrap",
    },
    chapter: {
        color: "#767676",
        fontWeight: "400",
        flexWrap: "wrap",
        marginRight: 3,
    },
    time: {
        color: "#767676",
        fontWeight: "400",
        flexWrap: "wrap",
    },
    scrollView: {
        borderWidth: 0,
        borderColor: "transparent",
        shadowColor: "transparent",
        flex: 1,
    },
    imgContainer: {
        flexGrow: 1,
    },
    image: {
        maxHeight: 160,
        maxWidth: 120,
        minHeight: 160,
        minWidth: 120,
        borderRadius: 5,
        flex: 1,
        flexGrow: 1,
        borderWidth: 2,
        borderColor: "#feb47b",
        color: "#feb47b",
        overflow: "hidden",
        alignItems: "center",
    },
});
