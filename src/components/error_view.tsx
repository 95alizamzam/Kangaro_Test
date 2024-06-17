import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const ErrorView = (probs: { errorMessage: string }) => {
    return (
        <View>
            <Text>{probs.errorMessage}</Text>
        </View>
    )
}

export default ErrorView

const styles = StyleSheet.create({})