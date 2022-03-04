import { ListItem, Icon } from "react-native-elements";

import React, { Component } from "react";
import { TouchableOpacity } from "react-native";
import Storage from "../libs/Storage";

interface Props {
  navigation: any;
}

export class LogoutComponent extends Component<Props> {
  _logout = async () => {
    console.log("sss");
    await Storage.remove("_id");
    this.props.navigation.replace("LoginScreen");
  };

  render() {
    return (
      <TouchableOpacity onPress={this._logout}>
        <ListItem>
          <Icon name={"logout"} color={"#ff7e5f"} />
          <ListItem.Content>
            <ListItem.Title style={{ color: "#ff7e5f" }}>
              Đăng xuất
            </ListItem.Title>
          </ListItem.Content>
        </ListItem>
      </TouchableOpacity>
    );
  }
}
