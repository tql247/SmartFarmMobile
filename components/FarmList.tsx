import React, { Component } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Text } from "./Themed";
import { APIConfig } from "../config";

interface Props {
  navigation: any;
}

let itemIndex = 0;
const axios = require("axios");

export class FarmList extends Component<Props> {
  state = {
    items: [
      {
        _id: "0",
        name: "Comage",
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
      },
      {
        _id: "1",
        name: "Grand blue",
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
      },
    ],
    active: false,
  };

  _mapData(data: any) {
    this.setState({ items: data });
    this.updateFarmValue();
  }

  _getFarms() {
    const axios = require("axios");

    const config = {
      method: "get",
      url: APIConfig["api"]["get_sensor"].replace(
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

  async _getFarmValue(sensor_id: string) {
    const config = {
      method: "get",
      url: APIConfig["api"]["get_sensor_value"].replace(
        "{sensor_id}",
        "Humidity"
      ),
      headers: {},
    };

    const value = await axios(config);

    return value.data;
  }

  async updateFarmValue() {
    const newData = [];
    for (let sensor of this.state.items) {
      sensor.value = await this._getFarmValue(sensor._id);
      newData.push(sensor);
    }

    this.setState({ items: newData });
  }

  componentDidMount() {
    this._getFarms();
  }

  renderRowData(
    idx: string,
    name: string,
    located: { name: string; address: string },
    value: string
  ) {
    itemIndex++;

    return (
      <View
        style={{
          backgroundColor:
            itemIndex % 2 !== 0 ? "rgba(225,225,225,0.45)" : "transparent",
          padding: 6,
          height: 60,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.title} numberOfLines={1}>
              {name}
            </Text>
            <Text>
              {located.name} - {located.address}
            </Text>
          </View>
          <View>
            <Text> {value} %</Text>
          </View>
        </View>
      </View>
    );
  }

  renderItem(item: any) {
    return (
      <View style={styles.imgContainer}>
        {this.renderRowData(item.idx, item.name, item.located, item.value)}
      </View>
    );
  }

  render() {
    return (
      <View style={styles.flatListContainer}>
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
  flatListContainer: {
    flex: 1,
    marginBottom: 20,
  },
  title: {
    color: "#666666",
    fontSize: 18,
    fontWeight: "500",
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
    justifyContent: "center",
  },
});
