import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { AppColors } from './src/core/app/colors';
import { AppAssets } from './src/core/app/images';
import { AppRoutes } from './src/core/app/routes';
import SplashScreen from './src/core/app/splash_screen';
import PackagesList from './src/features/packages_feature/presentation/pages/packages_list';
import { ScannerPage } from './src/features/packages_feature/presentation/pages/scanner';


const Stack = createNativeStackNavigator();

function App() {
  return (
    < NavigationContainer >
      <Stack.Navigator initialRouteName={AppRoutes.SplashPage}>
        <Stack.Screen
          name={AppRoutes.SplashPage}
          component={SplashScreen}
          options={({ navigation, route }) => ({
            headerShown: false,
          })}
        />
        <Stack.Screen
          name={AppRoutes.PackagesListPage}
          component={PackagesList}
          options={({ navigation, route }) => ({
            headerTitleAlign: 'center',
            title: AppRoutes.PackagesListPage,
            headerTintColor: AppColors.blue,
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