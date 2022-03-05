// https://reactnativeelements.com/docs/searchbar

import * as React from "react";
import { SearchBar } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default class SearchBarHeader extends React.Component {
  state = {
    search: "",
  };

  updateSearch = (search: string) => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      <View style={[styles.yellow]}>
        <SearchBar
          inputStyle={[styles.container, { marginLeft: 0 }]}
          inputContainerStyle={[
            styles.container,
            { margin: 0, padding: 0 },
            styles.blue,
          ]}
          containerStyle={[
            styles.container,
            { margin: 0, padding: 0 },
            styles.w100,
          ]}
          leftIconContainerStyle={[
            styles.container,
            { marginLeft: 1 },
            styles.pink,
          ]}
          placeholder={"Search everything here"}
          placeholderTextColor={"#f4f4f8"}
          // @ts-ignore
          searchIcon={
            <Ionicons
              size={22}
              style={{ marginBottom: -1, padding: 1, color: "white" }}
              name="ios-search-outline"
            />
          }
          rightIconContainerStyle={styles.container}
          // @ts-ignore
          onChangeText={this.updateSearch}
          value={search}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0,
    borderWidth: 0,
    height: "100%",
    color: "white",
    backgroundColor: "rgba(255,255,255,0)",
    shadowColor: "rgba(255,255,255,0)", //no effect
    borderTopColor: "rgba(255,255,255,0)",
  },
  red: {
    // backgroundColor: 'red',
    // color: 'white',
  },
  blue: {
    // backgroundColor: 'blue',
    // color: 'white',
  },
  yellow: {
    // backgroundColor: 'yellow',
    // minWidth: '100%',
    // width: '100%'
    // color: 'white',
  },
  pink: {
    // backgroundColor: 'pink',
    // color: 'white',
  },
  w100: {
    minWidth: "100%",
    width: "100%",
  },
});
