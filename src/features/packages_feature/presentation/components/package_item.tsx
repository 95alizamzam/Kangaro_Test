import React from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import { AppColors } from '../../../../core/app/colors'
import { AppAssets } from '../../../../core/app/images'
import { PackageModel } from '../../data/models/package_model'
import { DeletePackageUseCase } from '../../domain/usecases/delete_package_usecase'

function showDeletionDialog(
    probs: {
        model: PackageModel,
        callback: () => void,
    }): void {
    Alert.alert(
        "Delete Package",
        `Are you sure about Deleting ${probs.model.packageName}?`,
        [
            {
                text: "Ok",
                onPress: async () => {
                    let usecase = new DeletePackageUseCase();
                    await usecase.call({ packageId: probs.model.id })
                    probs.callback();
                },
                style: 'default',
            },
            {
                text: "Cancel",
                onPress: () => { },
                style: 'cancel',
            }
        ],
        {
            cancelable: true,
        }
    );
}




const packageItem = (probs: {
    model: PackageModel,
    refresh: () => void,
}) => {
    return (
        <View style={styles.itemViewStyle}>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={AppAssets.openBoxImage}
                ></Image>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.packageName}>{probs.model.packageName}</Text>
                <Text style={styles.packageCode}>{probs.model.code}</Text>
            </View>

            <Pressable onPress={() => {
                showDeletionDialog({
                    model: probs.model,
                    callback: () => { probs.refresh() }
                });
            }}>
                <View >
                    <Image
                        style={styles.deleteImage}
                        source={AppAssets.deleteIcon}
                    ></Image>
                </View>
            </Pressable>
        </View >

    );
}



export default packageItem;

const styles = StyleSheet.create({
    itemViewStyle: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: AppColors.white,
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
        backgroundColor: AppColors.white,
        borderColor: AppColors.lightGrey,
        borderWidth: 1,
        alignItems: 'center',
        overflow: "hidden",
        marginEnd: 14,
        justifyContent: 'center',
    },
    image: {
        width: 30,
        height: 30,
    },
    packageName: {
        fontSize: 14,
        fontWeight: '800',
    },
    packageCode: {
        fontSize: 12,
        fontWeight: '600',
    },
    deleteImage: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
        marginEnd: 6,
    }

})


