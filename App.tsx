import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { AppColors } from './src/core/app/colors';
import { AppAssets } from './src/core/app/images';
import { AppRoutes } from './src/core/app/routes';
import CircularIndicator from './src/core/components/circular_indicator';
import { LocalStorageService } from './src/core/services/local_storage_service';
import PackagesList from './src/features/packages/presentation/pages/packages_list';
import { ScannerPage } from './src/features/packages/presentation/pages/scanner';


const Stack = createNativeStackNavigator();

function App() {
  const [isOpened, markAsOpened] = useState(false);

  // Open Local DataBase once app starts 
  useEffect(() => {
    const openDatabase = async () => {
      let service = LocalStorageService.getInstance();
      return await service.openDataBase({ dbName: "KangaroDB.db" });
    };
    openDatabase().then((response) => {
      markAsOpened(response);
    });
  }, []);

  return (
    isOpened == false ? <CircularIndicator />
      :
      < NavigationContainer >
        <Stack.Navigator initialRouteName={AppRoutes.PackagesListPage}>
          <Stack.Screen
            name={AppRoutes.PackagesListPage}
            component={PackagesList}
            options={({ navigation, route }) => ({
              headerTitleAlign: 'center',
              title: AppRoutes.PackagesListPage,
              headerTintColor: AppColors.blue,
              headerRight: (_) => (addPackageIcon(navigation)),
            })}
          />
          <Stack.Screen
            name={AppRoutes.ScannerPage}
            component={ScannerPage}
            options={({ navigation, route }) => ({
              headerTitleAlign: 'center',
              title: AppRoutes.ScannerPage,
              headerTintColor: AppColors.blue,
              headerBackTitleVisible: false,
              headerLeft: (_) => (goBackIcon(navigation)),
            })}
          />
        </Stack.Navigator>
        <Toast />
      </ NavigationContainer>

  )
}

function addPackageIcon(navigation: any) {
  return (
    <Pressable onPress={() => {
      navigation.navigate(AppRoutes.ScannerPage);
    }}>
      <Image
        style={styles.actionIcon}
        source={AppAssets.openBoxImage}
      />
    </Pressable>
  );
}

function goBackIcon(navigation: any) {
  return (
    <Pressable onPress={() => { navigation.goBack() }}>
      <Image
        style={[
          styles.actionIcon,
          { tintColor: AppColors.blue, width: 20, height: 20 }
        ]}
        source={AppAssets.arrowBackIcon}
      />
    </Pressable>
  );
}


const styles = StyleSheet.create({
  actionIcon: {
    width: 30,
    height: 30,
    alignContent: 'center',
    resizeMode: 'cover',
  },

});

export default App;