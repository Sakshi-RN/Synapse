import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// import ProductsDescription from '../Screens/ProductsDescription/ProductsDescription';
// import BTabNavigation from './BTabNavigation';
// import Cart from '../Screens/Cart/Cart';
// import Categories from '../Screens/Categories';
// import SavedAddresses from '../Screens/SavedAddresses';
// import SetLocationMap from '../Screens/SetLocationMap';
// import AboutUs from '../Screens/AboutUs';
// import EditProfile from '../Screens/EditProfile';


const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BTabNavigation"
        screenOptions={{
          headerShown: false
        }}>
        {/* <Stack.Screen
          name="BTabNavigation"
          component={BTabNavigation}
        />
        <Stack.Screen
          name="ProductsDescription"
          component={ProductsDescription}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
        />
        <Stack.Screen
          name="Categories"
          component={Categories}
          options={{
            headerShown:true
          }}
        />
        <Stack.Screen
          name="SavedAddresses"
          component={SavedAddresses}
          options={{
            title: 'Saved Addresses',
            headerShown:true
          }}
        />
        <Stack.Screen
          name="SetLocationMap"
          component={SetLocationMap}
          options={{
            title: 'Set Location in Map',
            headerShown:true
          }}
        />
            <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            headerShown:false
          }}
        />
            <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            headerShown:false
          }}
        /> */}
       
      </Stack.Navigator>
    </NavigationContainer>
  );
}
