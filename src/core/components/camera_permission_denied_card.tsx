import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../app/colors';
import { AppAssets } from '../app/images';
import { PermissionsServices } from '../services/permissions_services';

export default function CameraPermissionDeniedCard() {
    return (
        <View style={{
            backgroundColor: AppColors.lightGrey,
            flex: 1,
            justifyContent: 'center',
        }}>

            <View style={syles.view}>
                <LottieView
                    source={AppAssets.settingsAnimatedIcon}
                    autoPlay
                    loop
                    style={syles.animationFile}
                />
                <Text style={syles.headline}>
                    Camera Permission Blocked
                </Text>
                <Text style={syles.body}>
                    To Enable Camera Permission, please ckick on the button to open app settings
                </Text>
                <TouchableOpacity
                    style={syles.button}
                    onPress={async () => {
                        let service = new PermissionsServices();
                        await service.openAppSettings();
                    }}
                >
                    <Text style={syles.buttonText}>Open Settings</Text>
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
        fontSize: 24,
        marginBottom: 10,
    },
    body: {
        fontWeight: '400',
        color: AppColors.grey,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center',
    },
    button: {
        backgroundColor: AppColors.blue,
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