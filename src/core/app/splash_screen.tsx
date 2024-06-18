import LottieView from 'lottie-react-native';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { LocalStorageService } from '../services/local_storage_service';
import { AppUtils } from '../utils/utils';
import { AppColors } from './colors';
import { AppAssets } from './images';
import { AppRoutes } from './routes';


interface Props {
    navigation: any
}
export default class SplashScreen extends Component<Props> {

    constructor(probs: any) {
        super(probs);
    }

    render() {
        return (
            <View style={styles.view}>
                <View style={styles.animationView}>
                    <LottieView
                        source={AppAssets.splashLoader}
                        autoPlay
                        loop
                        style={styles.animationFile}
                    />
                </View>
            </View>
        )
    }


    async componentDidMount(): Promise<void> {
        let service = LocalStorageService.getInstance();
        await service.openDataBase({ dbName: "KangaroDB.db" });
        await AppUtils.sleep(2000); // wait 2 second
        this.props.navigation.replace(AppRoutes.PackagesListPage);
    }
}

const styles = StyleSheet.create({
    view: {
        justifyContent: 'center',
        backgroundColor: AppColors.white,
    },
    animationView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        alignContent: 'center',
    },
    animationFile: {
        flex: 1,
        width: '100%',
    },
});