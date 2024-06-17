import React, { Component } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { RNCamera } from "react-native-camera";
import QRCodeScanner from "react-native-qrcode-scanner";
import AddNewPackageModal from "../components/model";
import { PackageService } from "../core/package_service";
import { PackageModel } from "../models/package_model";


type State = {
    barcode: string | null,
    useFlash: boolean,
    showModal: boolean,
    textValue: string,
}


export class ScannerPage extends Component<any, State> {
    constructor(probs: any) {
        super(probs);
        this.state = {
            barcode: null,
            useFlash: true,
            showModal: false,
            textValue: "",
        }
    }

    async AddNewPackage(probs: { name: string }): Promise<void> {
        let service = new PackageService();
        let newPackage = {
            id: 0,
            packageName: probs.name,
            barcode: this.state.barcode,

        } as PackageModel;
        await service.addPackage(newPackage);
    }



    render(): React.ReactNode {
        let scanner: QRCodeScanner | null;
        return (
            <View style={{
                flexDirection: 'column',
            }}>
                <View style={styles.scannerView}>
                    <QRCodeScanner
                        ref={(node) => { scanner = node }}
                        reactivate={this.state.showModal ? false : true}
                        reactivateTimeout={0}
                        cameraType="back"
                        fadeIn={true}
                        onRead={(event) => {
                            this.setState({
                                barcode: event.data,
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
                <View >
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.showModal}
                        onRequestClose={() => {
                            this.setState({ showModal: false });
                        }}
                    >
                        <AddNewPackageModal
                            packageCode={`${this.state.barcode}`}
                            confirm={async (packageName) => {
                                await this.AddNewPackage({ name: packageName });
                                this.setState({ showModal: false });
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

            </View >
        );
    }
}




const styles = StyleSheet.create({
    scannerView: { height: '100%' },
    cameraStyle: { height: '100%' },
});