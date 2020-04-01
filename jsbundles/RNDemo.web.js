import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    StyleSheet,
    TouchableHighlight,
    Text
} from 'react-native';

class RNDemo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight
                    underlayColor={'orange'}
                    style={styles.button}
                    onPress={() => { alert(`press`); }}
                >
                    <Text>Hello, Press Me</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
AppRegistry.registerComponent('RNDemo', () => RNDemo);



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#000',
        paddingHorizontal: 20,
        marginTop: 100
    }
})
var app = document.getElementById('m_common_content');
if (!app) {
    app = document.createElement('div');
    document.body.appendChild(app);
}
AppRegistry.runApplication('RNDemo', {
    rootTag: app
});