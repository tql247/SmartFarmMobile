import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Switch,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Text } from "./Themed";
import { APIConfig } from "../config";

interface Props {
  navigation: any;
  refreshing: any;
  owner_id: any;
}

let itemIndex = 0;
let initState = true;
let updateMachineStateInterval: number | undefined = undefined;
const axios = require("axios");
let currentFarm = [
  {
    _id: "",
    name: "",
    address: "",
  },
];

let currentItem = [
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
    state: "-",
  },
];

export class MachineList extends Component<Props> {
  state = {
    refreshing: this.props.refreshing,
    owner_id: this.props.owner_id,
    selectedLanguage: "all",
    farms: currentFarm,
    items: currentItem,
    active: false,
  };

  async _mapData(data: any) {
    const newData = [];

    for (let machine of data) {
      machine.active = await this._getMachineValue(machine._id);
      machine.display = true;
      machine.state = "-";
      newData.push(machine);
    }

    this.setState({ items: newData });

    updateMachineStateInterval = setInterval(() => {
      this.updateMachineValue();
    }, 1000);
  }

  async updateMachineValue() {
    const newData = [];

    for (let machine of this.state.items) {
      machine.state = (await this._getMachineValue(machine._id)) ? "ON" : "OFF";
      newData.push(machine);
    }

    this.setState({ items: newData });
  }

  _getMachines() {
    const axios = require("axios");
    const config = {
      method: "get",
      url: APIConfig["api"]["get_machine"].replace(
        "{owner_id}",
        `${this.props.owner_id}`
      ),
      headers: {},
    };

    const self = this;

    axios(config)
      .then(function (response: any) {
        currentItem = response.data;
        self._mapData(response.data);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  async _getMachineValue(machine_id: string) {
    const config = {
      method: "get",
      url: APIConfig["api"]["get_machine_value"].replace(
        "{machine_id}",
        machine_id
      ),
      headers: {},
    };

    const value = await axios(config);

    return value.data;
  }

  _getFarms() {
    const axios = require("axios");
    console.log("this.props.owner_id", this.props.owner_id);

    const config = {
      method: "get",
      url: APIConfig["api"]["get_farms"].replace(
        "{owner_id}",
        `${this.props.owner_id}`
      ),
      headers: {},
    };

    const self = this;

    axios(config)
      .then(function (response: any) {
        currentFarm = response.data;
        self.setState({ farms: response.data });
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }

  updateMachineState(value: boolean, _id: string) {
    clearInterval(updateMachineStateInterval);

    const _itemIndex = this.state.items.findIndex((x) => x._id === _id);
    const cpyItems = this.state.items;

    cpyItems[_itemIndex].active = value;
    this.setState({ items: cpyItems });

    var data = JSON.stringify({
      _id: _id,
      state: value,
    });

    var config = {
      method: "post",
      url: APIConfig["api"]["set_machine_state"],
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const self = this;

    axios(config)
      .then(function (response: { data: any }) {})
      .catch(function (error: any) {
        console.log(error);
      })
      .done(function () {
        updateMachineStateInterval = setInterval(() => {
          self.updateMachineValue();
        }, 1000);
      });
  }

  filterValueByFarm(itemValue: string) {
    this.setState({ selectedLanguage: itemValue });

    const newData = [];
    for (let machine of this.state.items) {
      if (itemValue === "all") {
        machine.display = true;
      } else if (machine.located._id !== itemValue) {
        machine.display = false;
      } else {
        machine.display = true;
      }
      newData.push(machine);
    }

    this.setState({ items: newData });
  }

  componentDidMount() {
    if (initState || this.state.refreshing) {
      this._getFarms();
      this._getMachines();
      initState = false;
    }
    // if (this.state.refreshing) return
  }

  renderTitle(
    idx: string,
    name: string,
    located: { name: string; address: string },
    active: boolean,
    state: string,
    display: boolean
  ) {
    if (!display) return;
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
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text>
              {located.name} - {located.address}
            </Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={active ? "#f5dd4b" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              value={active}
              onValueChange={(value) => this.updateMachineState(value, idx)}
            />
            <Text style={styles.chapter}>Trạng thái: {state}</Text>
          </View>
        </View>
      </View>
    );
  }

  renderItem(item: any) {
    return (
      <View style={styles.imgContainer}>
        {this.renderTitle(
          item._id,
          item.name,
          item.located,
          item.active,
          item.state,
          item.display
        )}
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
              <Picker.Item
                key={farm._id}
                label={farm.name + " - " + farm.address}
                value={farm._id}
              />
            );
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
                disabled={true}
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
