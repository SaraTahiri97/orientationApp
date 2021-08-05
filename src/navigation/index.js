import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'



import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


import { Ionicons as Icon } from '@expo/vector-icons';
import { Feather as IconF } from '@expo/vector-icons';
import Result_Screen from '../screens/Result_Screen'


import LoadingScreen from '../screens/LoadingScreen';
import SplashScreen from '../screens/splash';
import SignInScreen from '../screens/Login_Screen';
import SignUpScreen from '../screens/Register_Screen';
import Interests from '../screens/Interests';


import Home_screen from '../screens/Home_screen';
import Single_Article_Screen from '../screens/Single_Article_Screen';

import Profile from '../screens/Profile';
import updateInterests from '../screens/updateInterests';
import Edit_Profile from '../screens/Edit_Profile';
import ChangePassword from '../screens/ChangePassword';

import Notifications from '../screens/Notifications';
import NotificationSetting from '../screens/NotificationSetting';

import BookMark_Page from '../screens/BookMark_Page';
import BookMark_Details from '../screens/BookMark_Details';

import Settings from '../screens/Setting'
import Select_Language_Screen from '../screens/Select_Language_Screen'

import not_found_screen from '../screens/404_Screen'
import DrawerContent from '../screens/DrawerContent'


const Tab = createMaterialBottomTabNavigator();

const HomeStack = createStackNavigator();
const SettingStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const NotificationStack = createStackNavigator();
const bookMarkStack = createStackNavigator();
const AuthNavi = createStackNavigator();
const auth = createStackNavigator();

const Drawer = createDrawerNavigator();



export const MainTabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="black"
      labeled={false}
      barStyle={{ backgroundColor: 'rgb(242, 242, 242)' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <Icon name="home-outline" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Book_Mark"
        component={bookMarkStackScreen}
        options={{
          tabBarLabel: 'saved',
          labeled: false,
          tabBarIcon: ({ color }) => (
            <Icon name="bookmark-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          labeled: false,
          tabBarIcon: ({ color }) => (
            <Icon name="person-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationStackScreen}
        options={{
          tabBarLabel: 'Updates',
          labeled: false,
          tabBarIcon: ({ color }) => (
            <Icon name="notifications-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export const authScreen = ({ navigation }) => (
  <auth.Navigator headerMode='none'>
    <auth.Screen name="SplashScreen" component={SplashScreen} />
    <auth.Screen name="Login_Screen" component={SignInScreen} />
    <auth.Screen name="Register_Screen" component={SignUpScreen} />
  </auth.Navigator>
);

export const screens = () => (
  <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
    <Drawer.Screen name="Home" component={MainTabScreen} />
    <Drawer.Screen name="Settings" component={SettingStackScreen} />
    <Drawer.Screen name="authScreen" component={authScreen} options={{ headerShown: false }} />
    <Drawer.Screen name="not_found_screen" component={not_found_screen} options={{ headerShown: false }} />
  </Drawer.Navigator>
);



export const AuthNavigator = () => (
  <NavigationContainer>
    <AuthNavi.Navigator >
      <AuthNavi.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      <AuthNavi.Screen name="auth" component={authScreen} options={{ headerShown: false }} />
      <AuthNavi.Screen name="screens" component={screens} options={{ headerShown: false }} />
      <auth.Screen name='interests' component={Interests} options={{ headerShown: false }} />
    </AuthNavi.Navigator>
  </NavigationContainer>

);

export const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator /* headerMode = 'none' */>
      <HomeStack.Screen name="Home" component={Home_screen}
        options={
          {
            headerStyle: { elevation: 0, shadowOpacity: 0, borderBottomWidth: 0, },
            headerTitle: null,
            headerLeft: null,
            headerRight: null,
            headerShown: false
          }}
      />

      <HomeStack.Screen name="Single_Article_Screen" component={Single_Article_Screen}

        options={{
          title: "détails de l'annonce",
          headerTitleAlign: 'center',
          headerStyle: { elevation: 0, color: 'white', },
          headerTitleStyle: { fontFamily: 'Product Sans bold' }

        }}
      />
      <HomeStack.Screen name="resultPage" component={Result_Screen}
        options={
          { headerShown: false }

        }
      />
    </HomeStack.Navigator>
  )
}

export const SettingStackScreen = ({ navigation }) => {
  return (
    <SettingStack.Navigator>
      <SettingStack.Screen name="Settings" component={Settings}
        options={
          {
            title: 'Paramètres',
            headerTitleAlign: 'center',
            headerStyle: { borderBottomColor: 'white', elevation: 0 },
            headerTitleStyle: { fontFamily: 'Product Sans bold' },

            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{ left: '80%', top: '7%' }}
              >
                <IconF name='arrow-left'
                  size={22}
                  color='black' />
              </TouchableOpacity>
            ),

          }}
      />


      <SettingStack.Screen name='NotificationSetting' component={NotificationSetting}
        options={{
          title: "Paramètres de notification",
          headerTitleAlign: 'center',
          headerStyle: { elevation: 0, color: 'white', },
          headerTitleStyle: { fontFamily: 'Product Sans bold' }

        }}
      />
      <SettingStack.Screen name='Select_Language_Screen' component={Select_Language_Screen}
        options={{
          title: "Choisir une langue",
          headerTitleAlign: 'center',
          headerStyle: { elevation: 0, color: 'white', },
          headerTitleStyle: { fontFamily: 'Product Sans bold' }

        }}
      />


    </SettingStack.Navigator>
  )
}

export const ProfileStackScreen = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={Profile}
        options={
          {
            title: 'Profile',
            headerTitleAlign: 'left',
            headerStyle: { borderBottomColor: 'white', elevation: 0 },
            headerLeft: null,
            headerTitleStyle: { fontFamily: 'Product Sans bold' },



          }}
      />
      <ProfileStack.Screen name='interests' component={updateInterests}
        options={
          {
            headerStyle: { borderBottomColor: 'white', elevation: 0 },
            title: 'intérêts',
            headerTitleStyle: { fontFamily: 'Product Sans bold' }
          }}
      />
      <ProfileStack.Screen name='Edit_Profile' component={Edit_Profile}
        options={
          {
            headerStyle: { borderBottomColor: 'white', elevation: 0 },
            title: 'Editer le profil',
            headerTitleStyle: { fontFamily: 'Product Sans bold' }

          }}
      />

      <ProfileStack.Screen name='ChangePassword' component={ChangePassword}
        options={
          {
            headerStyle: { borderBottomColor: 'white', elevation: 0 },
            title: 'Changer le mot de passe',
            headerTitleStyle: { fontFamily: 'Product Sans bold' },
            headerTitleAlign: 'center',
          }}
      />
      <ProfileStack.Screen name="authScreen" component={authScreen} options={{ headerShown: false }} />

    </ProfileStack.Navigator>
  )
}

const NotificationStackScreen = ({ navigation }) => {
  return (
    <NotificationStack.Navigator>
      <NotificationStack.Screen name="Notifications" component={Notifications}
        options={
          {
            title: 'Notifications',
            headerTitleAlign: 'center',
            headerStyle: { borderBottomColor: 'white', elevation: 0 },
            headerLeftContainerStyle: { left: 15 },
            headerTitleStyle: { fontFamily: 'Product Sans bold' },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{ left: '40%' }}
              >
                <IconF name='arrow-left'
                  size={22}
                  color='black' />
              </TouchableOpacity>
            ),

          }}
      />
      <HomeStack.Screen name="Single_Article_Screen" component={Single_Article_Screen}

        options={{
          title: "détails de l'annonce",
          headerTitleAlign: 'center',
          headerStyle: { borderBottomColor: 'white', elevation: 0, color: 'white' },
          headerTitleStyle: { fontFamily: 'Product Sans bold' }

        }}
      />
    </NotificationStack.Navigator>
  )
}
const bookMarkStackScreen = ({ navigation }) => {
  return (
    <bookMarkStack.Navigator>
      <bookMarkStack.Screen name="BookMarks" component={BookMark_Page}
        options={
          {
            title: 'Book Marks',
            headerTitleAlign: 'center',
            headerStyle: { borderBottomColor: 'white', elevation: 0 },
            headerLeftContainerStyle: { left: 15 },
            headerTitleStyle: { fontFamily: 'Product Sans bold' },
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Home')}
                style={{ left: '40%' }}
              >
                <IconF name='arrow-left'
                  size={22}
                  color='black' />
              </TouchableOpacity>
            ),

          }}
      />
      <HomeStack.Screen name="BookMark_Details" component={BookMark_Details}

        options={{
          title: "Book Mark Detailes",
          headerTitleAlign: 'center',
          headerStyle: { borderBottomColor: 'white', elevation: 0, color: 'white' },
          headerTitleStyle: { fontFamily: 'Product Sans bold' }

        }}
      />
      <HomeStack.Screen name="Single_Article_Screen" component={Single_Article_Screen}

        options={{
          title: "détails de l'annonce",
          headerTitleAlign: 'center',
          headerStyle: { elevation: 0, color: 'white', },
          headerTitleStyle: { fontFamily: 'Product Sans bold' }

        }}
      />
    </bookMarkStack.Navigator>
  )
}

const styles = StyleSheet.create({
  Default_Title: {
    fontFamily: 'Product Sans',
    fontSize: 24,
    fontStyle: 'normal',
    fontWeight: "700",
    lineHeight: 27,
    letterSpacing: 1,
    textAlign: 'center',
  },
  Menu_view: {

    height: "auto",
    position: 'relative',
    left: '150%',
  },
  Search_view: {
    justifyContent: 'center',
    alignItems: 'center',
    right: 40,

  },
  headerTitleStyle: {
    fontFamily: 'Product Sans',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: "400",
    position: 'relative',
    left: '30%',

  }
})
