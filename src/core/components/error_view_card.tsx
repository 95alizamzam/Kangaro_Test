import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../app/colors';
import { AppAssets } from '../app/images';

export default function ErrorViewCard(probs: {
    errorMessage?: string | null,
    retry: () => void,
}) {
    return (
        <View style={{
            backgroundColor: AppColors.lightGrey,
            flex: 1,
            justifyContent: 'center',
        }}>

            <View style={syles.view}>
                <LottieView
                    source={AppAssets.errorAnimatedIcon}
                    autoPlay
                    loop
                    style={syles.animationFile}
                />
                <Text style={syles.headline}>
                    {probs.errorMessage ?? "UnExpected Error !!"}

                </Text>
                <Text style={syles.body}>
                    Oops Something went wrong !!, please try again
                </Text>
                <TouchableOpacity
                    style={syles.button}
                    onPress={() => { probs.retry() }}
                >
                    <Text style={syles.buttonText}>Try Again</Text>
                </TouchableOpacity >
            </View>
        </View>

    )
}

const syles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: AppColors.white,
        borderColor: AppColors.lightGrey,
        borderWidth: 1,
        borderRadius: 10,
        margin: 20,
        padding: 16,
    },

    animationFile: {
        height: 140,
        width: 250,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    headline: {
        fontWeight: 'bold',
        color: AppColors.black,
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    body: {
        fontWeight: '400',
        color: AppColors.grey,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: AppColors.red,
        padding: 10,
        borderRadius: 15,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        color: AppColors.white,
        fontSize: 16,
        textAlign: 'center',
    },
});