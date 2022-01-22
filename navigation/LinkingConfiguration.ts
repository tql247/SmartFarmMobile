/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import * as Linking from 'expo-linking';
import { useLinkTo } from '@react-navigation/native';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Main: {
            screens: {
              MainScreen: 'main',
              ComicDetailScreen: 'main2',
            },
          },
          Search: {
            screens: {
              SearchScreen: 'two',
            },
          },
          Profile: {
            
          }
        },
      },
      NotFound: '*',
    },
  },
};
