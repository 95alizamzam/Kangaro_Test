import { PermissionsAndroid, Platform } from "react-native";
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";

export class PermissionsServices {

    async requestCameraPermission(): Promise<boolean> {
        if (Platform.OS === 'android') {
            return this.askAndroidCameraPermission();
        } if (Platform.OS === 'ios') {
            return this.askIOSCameraPermission();
        } else {
            return false;
        }

    }

    // Android
    private async askAndroidCameraPermission(): Promise<boolean> {
        const isGranted = await PermissionsAndroid.check(
            PermissionsAndroid.PERMISSIONS.CAMERA,
        );

        if (isGranted === false) {
            return this.requestAndroidCameraPermissions();
        } else {
            return true;
        }

    }

    private async requestAndroidCameraPermissions(): Promise<boolean> {
        const status = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
                title: 'Device Camera Permission',
                message:
                    'The App needs access to your camera ' +
                    'so you can scan awesome packages.',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            }
        );

        if (status === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    }


    // IOS
    private async askIOSCameraPermission() {
        const status = await check(PERMISSIONS.IOS.CAMERA);
        if (status == RESULTS.GRANTED) {
            return true;
        } else {
            return this.requestIOSCameraPermission();
        }
    }

    private async requestIOSCameraPermission() {
        const result = await request(PERMISSIONS.IOS.CAMERA);
        if (result == RESULTS.GRANTED) {
            return true;
        } else {
            return false;
        }
    }


    async openAppSettings() {
        await openSettings();

    }
}