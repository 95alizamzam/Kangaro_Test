import React, { Component } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

export default class CircularIndicator extends Component {
    render() {
        return (
            <View style={styles.view}>
                <ActivityIndicator />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
    },
})