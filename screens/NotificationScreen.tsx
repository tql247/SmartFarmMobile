import * as React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import { NotificationList } from "../components/NotificationList";
import { View } from "../components/Themed";

const wait = (timeout: any) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
};

export default function NotificationScreen({ navigation, props }: any) {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={[1]}
        numColumns={1}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <NotificationList
            {...props}
            navigation={navigation}
            key={refreshing}
            refreshing={refreshing}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 0,
    borderColor: "transparent",
    shadowColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
