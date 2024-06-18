import React, { Component } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";
import CameraPermissionDeniedCard from "../../../../core/components/camera_permission_denied_card";
import CircularIndicator from "../../../../core/components/circular_indicator";
import { PermissionsServices } from "../../../../core/services/permissions_services";
import { PackageModel } from "../../data/models/package_model";
import { AddPackageUseCase } from "../../domain/usecases/add_package_usecase";
import AddNewPackageModal from "../components/modal";


type State = {
    packageCode: string | null,
    useFlash: boolean,
    showModal: boolean,
    textValue: string,
    hasCameraPermissons: boolean | null,
}


export class ScannerPage extends Component<any, State> {
    constructor(probs: any) {
        super(probs);
        this.state = {
            packageCode: null,
            useFlash: true,
            showModal: false,
            textValue: "",
            hasCameraPermissons: null,
        }
    }

    render(): React.ReactNode {
        let scanner: QRCodeScanner | null;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
            }}>
                {
                    this.state.hasCameraPermissons == null ? (
                        <CircularIndicator />
                    ) :
                        this.state.hasCameraPermissons === false ? (
                            <CameraPermissionDeniedCard />
                        ) :
                            (
                                <View>
                                    <View style={styles.scannerView}>
                                        <QRCodeScanner
                                            ref={(node) => { scanner = node }}
                                            reactivate={this.state.showModal ? false : true}
                                            reactivateTimeout={500}
                                            cameraType="back"
                                            fadeIn={true}
                                            onRead={(event) => {
                                                this.setState({
                                                    packageCode: event.data,
                                                    showModal: true,
                                                });
                                            }}
                                            cameraStyle={styles.cameraStyle}
                                            vibrate={true}
                                            flashMode={
                                                this.state.showModal ?
                                                    RNCamera.Constants.FlashMode.off :
                                                    RNCamera.Constants.FlashMode.torch
                                            }
                                            showMarker={true}
                                        />
                                    </View>


                                    <View>
                                        <Modal
                                            animationType="fade"
                                            transparent={true}
                                            visible={this.state.showModal}
                                        >
                                            <AddNewPackageModal
                                                packageCode={`${this.state.packageCode}`}
                                                confirm={async (packageName) => {
                                                    await this.AddNewPackage({ name: packageName });
                                                }}
                                                cancel={() => {
                                                    this.setState({ showModal: false });
                                                    if (scanner) {
                                                        scanner.reactivate();
                                                    }
                                                }}
                                            />
                                        </Modal>
                                    </View>
                                </View>
                            )
                }

            </View >
        );
    }


    async componentDidMount(): Promise<void> {
        let permissionService = new PermissionsServices();
        let result = await permissionService.requestCameraPermission();
        this.setState({ hasCameraPermissons: result });
    }

    // Functions 
    async AddNewPackage(probs: { name: string }): Promise<void> {
        if (this.state.packageCode != null) {
            let usecase = new AddPackageUseCase();
            let item = new PackageModel({
                id: 0,
                packageName: probs.name,
                code: this.state.packageCode,
            });
            await usecase.call({ item: item });
            this.setState({ showModal: false });
        }
    }
}




const styles = StyleSheet.create({
    scannerView: { height: '100%' },
    cameraStyle: { height: '100%' },
});