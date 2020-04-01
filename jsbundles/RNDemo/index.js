import React, { PureComponent } from 'react';
import {
    View,
    StyleSheet,
    Text
} from 'react-native';

export default class RNDemo extends PureComponent{
  render() {
    return (
      <View style={styles.container}>
          <Text>Hello, react-native-web-demo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

module.exports = RNDemo;
