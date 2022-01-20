import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Dimensions, FlatList, RefreshControl, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';

import { View, Text } from '../components/Themed';
import { RuleList } from "../components/RuleList";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get("window");

const wait = (timeout: any) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
};

export default function RuleScreen({ navigation, props }: any) {
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = React.useState(false);
    let [editing, setEditing] = React.useState(false);
    const insets = useSafeAreaInsets();


    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        wait(2000).then(() => {
            setRefreshing(false)
        });
    }, []);

    const onEditing = () => {
        editing = !editing
        setEditing(!editing);
        navigation.setOptions({
          headerLeft: () => (
            <Ionicons size={30} name={editing?"checkmark-outline":"ios-create-outline"} color="#fff" onPress={onEditing} />
            // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
          ),
        });
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            <Ionicons size={30} name={"ios-create-outline"} color="#fff" onPress={onEditing} />
            // <Button onPress={() => setCount(c => c + 1)} title="Update count" />
          ),
          headerRight: () => (<Ionicons size={30} name={"ios-add"} color="#fff" onPress={ () => { setModalVisible(true) }} />),
        });
      }, [navigation]);

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
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Hello World!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Hide Modal</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 300
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
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
