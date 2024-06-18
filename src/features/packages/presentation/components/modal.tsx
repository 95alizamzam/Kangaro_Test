import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../../../core/app/colors';

export default function AddNewPackageModal(probs: {
    packageCode: string,
    confirm: (value: string) => void,
    cancel: () => void,
}) {

    const [value, setValue] = useState("");
    const [borderColor, setBorderColor] = useState<string>(AppColors.lightGrey);
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
            }}>
            <KeyboardAvoidingView behavior='padding'>
                <ScrollView
                    scrollEnabled={true}
                    contentContainerStyle={{
                        flexGrow: 1,
                        height: '100%',
                        justifyContent: 'center',
                    }}
                >
                    <View style={styles.content}>
                        <Text style={styles.headlineText}>
                            Adding New Package
                        </Text>
                        <Text style={styles.smallText}>
                            {`Package Code:  ${probs.packageCode}`}
                        </Text>
                        <Text style={styles.bodyText}>
                            To add your package please set the package name
                        </Text>
                        <TextInput
                            style={[styles.textInput, { borderColor: borderColor }]}
                            placeholder="Package Name"
                            placeholderTextColor={AppColors.black}
                            secureTextEntry={false}
                            value={value}
                            autoFocus={true}
                            returnKeyType="done"
                            onChangeText={(value) => {
                                if (borderColor === AppColors.red) {
                                    setBorderColor(AppColors.lightGrey);
                                }
                                if (value.trim() === "") {
                                    setBorderColor(AppColors.red);
                                }
                                setValue(value);
                            }}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity
                                style={[styles.confirmBtnStyle]}
                                onPress={() => {
                                    if (value !== "") {
                                        probs.confirm(value);
                                    } else {
                                        setBorderColor(AppColors.red);
                                    }
                                }}
                            >
                                <Text style={styles.BtnTextStyle}>Confirm</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.cacnelBtnStyle]}
                                onPress={() => { probs.cancel() }}
                            >
                                <Text style={styles.BtnTextStyle}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View >

    )
}

const styles = StyleSheet.create({
    content: {
        padding: 16,
        flexDirection: 'column',
        backgroundColor: AppColors.white,
        marginHorizontal: 14,
        borderRadius: 10,
        alignContent: 'center',
        borderColor: AppColors.lightGrey,
    },
    headlineText: {
        fontSize: 20,
        fontWeight: '800',
        color: AppColors.black,
        opacity: .8,
        marginBottom: 4,

    },
    smallText: {
        fontSize: 12,
        fontWeight: '300',
        color: AppColors.black,
        opacity: .8,
        marginBottom: 16,

    },
    bodyText: {
        fontSize: 16,
        fontWeight: '400',
        color: AppColors.black,
        opacity: .6,
        marginBottom: 10,
    },
    textInput: {
        borderRadius: 5,
        marginBottom: 20,
        marginTop: 10,
        height: 40,
        borderWidth: 1,
        paddingHorizontal: 14,

    },
    confirmBtnStyle: {
        backgroundColor: AppColors.blue,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    BtnTextStyle: {
        color: AppColors.white,
        fontSize: 14,
        fontWeight: '600',
    },

    cacnelBtnStyle: {
        backgroundColor: AppColors.red,
        padding: 10,
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 4,

    },

});