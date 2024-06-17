import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { AppColors } from './src/core/colors';
import { AppRoutes } from './src/core/routes';
import PackagesList from './src/screens/packages_list';
import { ScannerPage } from './src/screens/scanner';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={AppRoutes.PackagesListPage}>
        <Stack.Screen
          name={AppRoutes.PackagesListPage}
          component={PackagesList}
          options={({ navigation, route }) => ({
            title: "Packages List",
            headerTintColor: AppColors.blue,
            headerRight: (_) => (addPackageIcon(navigation)),
          })}

        />
        <Stack.Screen
          name={AppRoutes.ScannerPage}
          component={ScannerPage}
          options={({ navigation, route }) => ({
            title: "Scanner Page",
            headerTintColor: AppColors.blue,
            headerBackTitleVisible: false,
          })}
        />
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  )
}


function addPackageIcon(navigation: any) {
  return (
    <Pressable onPress={() => {
      navigation.navigate(AppRoutes.ScannerPage);

    }}>
      <Image
        style={styles.actionIcon}
        source={
          require("./assets/images/empty_box.png")
        }
      />
    </Pressable>
  );
}




const styles = StyleSheet.create({
  actionIcon: {
    width: 40,
    height: 40,
    alignContent: 'center',
    resizeMode: 'cover',
  },
});

export default App;