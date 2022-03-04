import { ListItem, Icon } from "react-native-elements";

import React, { Component } from "react";
import { StyleSheet, View, Dimensions, TouchableOpacity } from "react-native";

interface Props {
  navigation: any;
}

export class SettingList extends Component<Props> {
  state = {
    screenHeight: 0,
    settings: [
      {
        title: "Thông tin tài khoản",
        icon: "account-circle",
        navigate: "ProfileDetailScreen",
      },
    ],
  };

  render() {
    return (
      <View style={{ paddingVertical: 10 }}>
        {this.state.settings.map((item, i) => (
          <TouchableOpacity
            key={i}
            onPress={() => this.props.navigation.navigate(item.navigate)}
          >
            <ListItem key={i} style={styles.item}>
              <Icon name={item.icon} />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "transparent",
    width: "100%",
    minWidth: "100%",
    margin: 0,
    padding: 0,
  },
  item: {
    marginTop: 1,
    width: "100%",
    minWidth: "100%",
  },
});
