import * as React from 'react';
import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { Chip } from 'react-native-elements';

export default function SearchScreen() {

  return (
    <View style={styles.container}>
        <View style={styles.block}>
            <Chip
                buttonStyle={styles.chip}
                containerStyle={styles.chipContainer}
                titleStyle={styles.chipTitle}
                title="Soudouki tensei isekai"
                type="outline"
            />
            <Chip
                buttonStyle={styles.chip}
                containerStyle={styles.chipContainer}
                titleStyle={styles.chipTitle}
                title="Goblin Slayer"
                type="outline"
            />
            <Chip
                buttonStyle={styles.chip}
                containerStyle={styles.chipContainer}
                titleStyle={styles.chipTitle}
                title="Konosuba"
                type="outline"
            />
            <Chip
                buttonStyle={styles.chip}
                containerStyle={styles.chipContainer}
                titleStyle={styles.chipTitle}
                title="Material Peak"
                type="outline"
            />
            <Chip
                buttonStyle={styles.chip}
                containerStyle={styles.chipContainer}
                titleStyle={styles.chipTitle}
                title="Nozomanu Fushi no Boukensha"
                type="outline"
            />
            <Chip
                buttonStyle={styles.chip}
                containerStyle={styles.chipContainer}
                titleStyle={styles.chipTitle}
                title="Dungeon Meshi"
                type="outline"
            />
        </View>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
    block: {
        width: '100%',
        minWidth: '100%',
        flexDirection: "row",
        flexWrap: "wrap",
        margin: 10,
        // backgroundColor: 'red'
    },
    chip: {
        // backgroundColor: 'red',
        borderColor: 'gray',
    },
    chipContainer: {
        marginLeft: 5,
        marginBottom: 5,
        // backgroundColor: 'blue',
    },
    chipTitle: {
        // backgroundColor: 'green',
        color: 'gray',
    },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 3,
    height: 1,
      width: '100%',
      minWidth: '100%',
  },
});
