import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../../../core/app/colors';
import { AppAssets } from '../../../../core/app/images';
import { AppRoutes } from '../../../../core/app/routes';


const EmptyPackagesList = (probs: { navigation: any }) => {
    return (
        <View style={styles.page}>
            <Image
                style={styles.image}
                source={AppAssets.openBoxImage}
            />
            <View style={styles.headlineView}>
                <Text style={styles.headlineText}>No Packages found</Text>
                <View style={{ height: 10 }}></View>
                <Text style={styles.bodyText}>Click Scan Package And Try to add Your First Package</Text>
            </View>

            <View style={{ height: 10 }}></View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    probs.navigation.navigate(AppRoutes.ScannerPage);
                }}>
                <Text style={styles.buttonText}>Scan Package</Text>
            </TouchableOpacity>
        </View>
    );

}



export default EmptyPackagesList;

const styles = StyleSheet.create({
    page: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    image: {
        width: '100%',
        height: '30%',
        resizeMode: 'contain',
        backgroundColor: AppColors.white,
    },
    headlineView: {
        alignItems: 'center',
        padding: 14,
        textAlign: 'center',
    },

    headlineText: {
        fontSize: 20,
        fontWeight: '700',
        color: AppColors.black,
    },
    bodyText: {
        fontSize: 16,
        fontWeight: '500',
        color: AppColors.grey,
        textAlign: 'center',

    },

    button: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 50,
        borderRadius: 25,
        backgroundColor: AppColors.blue,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: '700',
        color: AppColors.white,
    }
})


