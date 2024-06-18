import React, { Component } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AppColors } from '../../../../core/app/colors';
import { AppRoutes } from '../../../../core/app/routes';
import CircularIndicator from '../../../../core/components/circular_indicator';
import ErrorViewCard from '../../../../core/components/error_view_card';
import { PackageLocalDataSource } from '../../data/local_data_source/package_local_data_source';
import { PackageModel } from '../../data/models/package_model';
import { FetchAllPackagesUseCase } from '../../domain/usecases/fetch_all_packages_usecase';
import EmptyPackagesList from '../components/empty_packages_list';
import PackageItem from '../components/package_item';

type State = {
    isLoading: boolean,
    packagesList: Array<PackageModel>,
    errorMessage: string | null,
    isRfreshing: boolean,
}

type Probs = { navigation: any }

export class PackagesList extends Component<Probs, State> {
    unsubscribe: any;

    constructor(probs: any) {
        super(probs);
        this.state = {
            isLoading: true,
            packagesList: [],
            errorMessage: null,
            isRfreshing: false,
        }
    }

    render() {
        return (
            <View style={styles.page}>
                {
                    this.state.isLoading ? <CircularIndicator /> :
                        this.state.errorMessage != null ? <ErrorViewCard {
                            ...{
                                errorMessage: this.state.errorMessage,
                                retry: () => { this.loadPackages() }
                            }
                        }> </ErrorViewCard> :
                            (
                                this.state.packagesList.length === 0 ? (
                                    <EmptyPackagesList navigation={this.props.navigation} />
                                ) : (

                                    <View style={{ flex: 1, paddingVertical: 10 }}>
                                        <FlatList
                                            refreshControl={
                                                <RefreshControl
                                                    refreshing={this.state.isRfreshing}
                                                    onRefresh={async () => { await this.onRefresh() }}
                                                    colors={[AppColors.blue]}
                                                    tintColor={AppColors.blue}
                                                />
                                            }
                                            data={this.state.packagesList}
                                            renderItem={({ item }) => {
                                                return (
                                                    <PackageItem {
                                                        ...{
                                                            model: item,
                                                            refresh: () => {
                                                                this.loadPackages();
                                                            }
                                                        }
                                                    } />
                                                );
                                            }}
                                            keyExtractor={item => item.id.toString()}
                                        ></FlatList>

                                        <View style={styles.buttonContainer}>
                                            <TouchableOpacity
                                                style={styles.button}
                                                onPress={() => {
                                                    this.props.navigation.navigate(AppRoutes.ScannerPage);
                                                }}>
                                                <Text style={styles.buttonText}>Scan Packages</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                )
                            )
                }
            </View>
        )
    }


    async componentDidMount(): Promise<void> {
        try {
            let localDataSource = new PackageLocalDataSource();
            await localDataSource.init();
            await this.loadPackages();
            this.unsubscribe = this.props.navigation.addListener('focus', async () => {
                console.log("subscribe ...");
                await this.loadPackages();

            });
        } catch (error) {
            this.setState({ errorMessage: "Something went wrong while fethching the packages" });
        } finally {
            this.setState({ isLoading: false });
        }

    }



    // Functions
    async loadPackages(): Promise<void> {
        let usecase = new FetchAllPackagesUseCase();
        let response = await usecase.call();
        this.setState({ packagesList: response });

    }

    async onRefresh(): Promise<void> {
        this.setState({ isRfreshing: true });
        await this.loadPackages();
        this.setState({ isRfreshing: false });
    }
}


const styles = StyleSheet.create({
    page: {
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        backgroundColor: AppColors.white,
    },

    buttonContainer: {
        padding: 10,
        backgroundColor: '#F8F8F8',
        width: '100%',
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
});

export default PackagesList;