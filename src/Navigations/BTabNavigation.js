import React from 'react';
import {StyleSheet, TouchableOpacity,View,Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import { FontSize, FontsWeights } from '../Themes/Fonts';

import Home from '../Screens/Home';
import Categories from '../Screens/Categories';
import Account from '../Screens/Account';
import Colors from '../Themes/Colors';
import Wholesale from '../Screens/Wholesale/Wholesale';

const Tab = createBottomTabNavigator();

export default function BTabNavigation() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.white,
        },
        tabBarHideOnKeyboard: true,
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: Colors.black,
        },
        tabBarActiveTintColor: Colors.error,
        tabBarInactiveTintColor: Colors.gray,
        headerRight: () => (
          <TouchableOpacity
            style={styles.cartContainer}
            onPress={() => navigation.navigate('Cart')}>
            <FontAwesome name="opencart" color={Colors.black} size={25} />
          </TouchableOpacity>
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Feather name="shopping-bag" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="Wholesale"
        component={Wholesale}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused,color }) => (
            <View style={styles.categoryIcon}>
              <Feather name="box" color={focused?Colors.error:Colors.white} size={30} />
            </View>
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.categoryLabel,{ fontWeight: focused?FontsWeights.FW600:FontsWeights.FW500,}]}>WholeSale</Text>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
          tabBarIcon: ({color}) => (
            <Octicons name="person" color={color} size={20} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  cartContainer: {
    marginHorizontal: 15,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 20,
    borderRadius: 30,
    backgroundColor: Colors.black,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 8,
    borderColor: Colors.white,
  },
  categoryLabel: {
    color: Colors.black,
    fontSize: FontSize.FS14,
  },
});
