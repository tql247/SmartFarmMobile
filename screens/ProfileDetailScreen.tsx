import * as React from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

import { Text, View } from "../components/Themed";
import { APIConfig } from "../config";
import Storage from "../libs/Storage";

export default function ProfileDetailScreen({ props, route, navigation }: any) {
  const [email, setEmail] = React.useState("");
  const [name, setName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [newpassword, setNewPassword] = React.useState("");
  const [_id, setID] = React.useState("");

  const [role, setRole] = React.useState("user");

  const _getAccountInfor = async () => {
    const axios = require("axios");
    const owner_id = await Storage.get("_id");
    console.log("owner_id", owner_id);

    const config = {
      method: "get",
      url: APIConfig["api"]["get_account"].replace("{owner_id}", `${owner_id}`),
      headers: {},
    };

    axios(config)
      .then(function (response: any) {
        setID(response.data._id);
        setEmail(response.data.email);
        setName(response.data.full_name);
        setPhone(response.data.phone);
        setAddress(response.data.address);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  const _updateAccount = async () => {
    var axios = require("axios");
    var data = {
      email: email,
      full_name: name,
      phone: phone,
      address: address,
      role: role,
      old_password: password,
      password: newpassword,
      _id: _id,
    };

    var config = {
      method: "post",
      url: APIConfig["api"]["update_account"],
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    };

    axios(config)
      .then(function (response: { data: any }) {
        console.log(JSON.stringify(response.data));
        Alert.alert("Thành công", "Thông tin đã cập nhật thành công", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      })
      .catch(function (error: any) {
        Alert.alert("Có lỗi xảy ra", "Mật khẩu nhập sai hoặc lỗi hệ thống", [
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]);
      });
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Thông tin tài khoản" });
    _getAccountInfor();
  }, [navigation]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAvoidingView
        behavior={"padding"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={30}
      >
        <View style={styles.container}>
          <ScrollView scrollEnabled={true} style={{}}>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 20, fontWeight: "300" }}>
                Email: {email}
              </Text>
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Tên người dùng:{" "}
              </Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  placeholder="Họ và tên"
                  value={name}
                  onChangeText={(str) => setName(str)}
                />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Số điện thoại:{" "}
              </Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  placeholder="09xxxxxxx"
                  value={phone}
                  onChangeText={(str) => setPhone(str)}
                />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>Địa chỉ: </Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  placeholder="Địa chỉ"
                  value={address}
                  onChangeText={(str) => setAddress(str)}
                />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Mật khẩu cũ:{" "}
              </Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu cũ"
                  secureTextEntry={true}
                  value={password}
                  onChangeText={(str) => setPassword(str)}
                />
              </View>
            </View>
            <View style={{ margin: 10 }}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Mật khẩu mới:{" "}
              </Text>
              <View style={styles.inputField}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập mật khẩu mới"
                  secureTextEntry={true}
                  value={newpassword}
                  onChangeText={(str) => setNewPassword(str)}
                />
              </View>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#ff7e5f",
                padding: 10,
                margin: 10,
                borderRadius: 5,
              }}
              onPress={_updateAccount}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  fontWeight: "400",
                  color: "white",
                }}
              >
                Cập nhật
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    fontSize: 20,
    fontWeight: "300",
    margin: 5,
    borderRadius: 10,
  },
  inputField: {
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 1.01,
    elevation: 3,
  },
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
  },
});
