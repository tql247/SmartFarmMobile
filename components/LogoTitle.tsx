import * as React from 'react';
import { View, Text, Image } from 'react-native';

export default function LogoTitle() {
    return (
      <Image
        style={{ width: 42, height: 42 }}
        source={require('../assets/images/logo.png')}
      />
    );
}
