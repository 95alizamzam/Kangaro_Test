import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import CircularIndicator from '../components/circular_indicator';
import EmptyPackagesList from '../components/empty_packages_list';
import PackageItem from '../components/package_item';
import { AppColors } from '../core/colors';
import { PackageService } from '../core/package_service';
import { AppRoutes } from '../core/routes';
import showToast from '../core/toast_config';
import { PackageModel } from '../models/package_model';


type State = {
    isLoading: boolean,
    packagesList: Array<PackageModel>,
    errorMessage: string | null,
}


export class PackagesList extends Component<any, State> {
    service = new PackageService();

    constructor(probs: any) {
        super(probs);
        this.state = {
            isLoading: true,
            packagesList: [],
            errorMessage: null,
        }
    }

    render() {
        return (
            <View style={styles.page}>
                {
                    this.state.isLoading ? (<CircularIndicator />) :
                        this.state.errorMessage != null ? (<Text>Error</Text>) :
                            (
                                this.state.packagesList.length === 0 ? (
                                    <EmptyPackagesList scanPackage={() => this.goToScannerPage()} />
                                ) : (

                                    <View>
                                        <FlatList
                                            data={this.state.packagesList}
                                            renderItem={({ item }) => {
                                                return (
                                                    <PackageItem {
                                                        ...{
                                                            model: item,
                                                            refresh: () => { }
                                                        }
                                                    } />
                                                );
                                            }}
                                            keyExtractor={item => item.id.toString()}
                                        ></FlatList>

                                    </View>



                                )

                            )
                }

            </View>
        )
    }


    async componentDidMount(): Promise<void> {
        try {
            await this.service.init();
            let packages = await this.service.getPackagesList();
            if (packages) {
                this.setState({ packagesList: packages });
            }

        } catch (error) {
            this.setState({ errorMessage: "Something went wrong while fethching the packages" });
            showToast({
                title: "Fetching your packages",
                message: "Something went wrong while fethching the packages",
                type: "error",
            });

        } finally {
            this.setState({ isLoading: false });
        }
    }


    goToScannerPage(): void {
        this.props.navigation.navigate(AppRoutes.ScannerPage);
    }




}

const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: AppColors.white,
    },
});








export default PackagesList;