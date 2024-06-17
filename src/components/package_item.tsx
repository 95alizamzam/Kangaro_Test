import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../core/colors'
import { PackageService } from '../core/package_service'
import showToast from '../core/toast_config'
import { PackageModel } from '../models/package_model'

const packageItem = (probs: {
    model: PackageModel,
    refresh: () => void,
}) => {
    return (
        <View style={styles.itemViewStyle}>
            <View style={styles.imageView}>
                <Image source={
                    require('../../assets/images/empty_box.png')
                }
                    style={styles.image}
                ></Image>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.packageName}>{probs.model.packageName}</Text>
                <Text style={styles.packageCode}>{probs.model.barcode}</Text>
            </View>
        </View>

    );
}



export default packageItem;

const styles = StyleSheet.create({
    itemViewStyle: {
        flexDirection: 'row',
        backgroundColor: AppColors.white,
        opacity: .5,
        padding: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        borderColor: AppColors.lightGrey,
        borderWidth: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    imageView: {
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: AppColors.lightGrey,
        marginHorizontal: 10,
        borderColor: AppColors.lightGrey,
        borderWidth: 1,
        alignItems: 'center',
        overflow: "hidden",
    },
    image: {
        resizeMode: "cover",
        width: 50,
        height: 50,
    },
    packageName: {
        fontSize: 14,
        fontWeight: '800',
    },
    packageCode: {
        fontSize: 12,
        fontWeight: '600',
    },

})

async function deletePackage(id: number): Promise<void> {
    let service = new PackageService();
    let response = await service.deletePackage({ packageId: id });
    if (response) {
        // refresh 
    } else {
        showToast({
            title: "Delete Package",
            message: "Something went wrong while deleting your packages",
            type: "error",
        });
    }
}
