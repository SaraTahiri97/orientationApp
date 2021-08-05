import React from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import { Avatar, Title, Caption, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { ExpUrl } from '../config'

import { Ionicons as Icon } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
    refresh,
    insertAnnoucements,
    insertNotification,
    updateNotification,
    getAnnouncementsOfInterests,
    getProfile,
    storeNotifToken
} from '../Store/actions/index';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

class DrawerContent extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            image:'',
            userid: '',
            expoPushToken: "",
            notification: false,
            idannouncement: ''

        }
        this._notificationListener = React.createRef();
        this._responseListener = React.createRef();
    }
    componentDidMount = () => {
        AsyncStorage.getItem('token').then(v => {
            this.props.dispatch(getProfile(v)).then((res) => {
            })
        })
        AsyncStorage.getItem('id', (err, data) => { this.setState({ userid: data }) })

        this.registerForPushNotificationsAsync().then(token => { 
            this.setState({ expoPushToken: token })
            //alert(token)
            //store token
            this.props.dispatch(storeNotifToken(this.state.userid,token))

     });

        this._notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            this.setState({ notification: notification });
        });

        this._responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            this.props.navigation.navigate('Single_Article_Screen', response.notification.request.content.data.idAnnouncement)
            this.props.dispatch(updateNotification(response.notification.request.content.data.idNotification))

        });
    }
    componentWillUnmount = () => {
        Notifications.removeNotificationSubscription(this._notificationListener.current);
        Notifications.removeNotificationSubscription(this._responseListener.current);
    }

    registerForPushNotificationsAsync = async () => {
        let token;
        if (Constants.isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        } else {
            alert('Must use physical device for Push Notifications');
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }
    sendPushNotification = async (expoPushToken, res) => {

        const message = {
            to: expoPushToken,
            sound: 'default',
            title: res.value.data.data.title,
            body: res.value.data.data.description,
            data: {
                idAnnouncement: res.value.data.data.idAnnouncement,
                idNotification: res.value.data.data.id
            },

        };

        await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message),
        });
    }


    createNotificationByAnnouncement = () => {
        const data = {
            title: "Concours d'accès en 1ère année de la Licence Fondamentale en Gestion de l'ISCAE 2021-2022",
            details: "<article><p>You'll see some detailes here </p> </article> ",
            estimated_time: '10 minutes',
            image: 'iscae.png',
            niveauEtude: 'licence fondamentale',
            dateFinAnnance: '20 mai 2021',
            idOrganisation: 6,
            idType: 1,
        }
        this.props.dispatch(insertAnnoucements(data))
            .then(res => {
                const notif = {
                    title: this.props.newAnouncement.idType == 1 ? 'Nouveau Concours 3' : data.idType == 2 ? 'Nouvelle Bourse' : 'Nouveau evenement',
                    description: this.props.newAnouncement.title,
                    isSeen: false,
                    idAnnouncement: this.props.newAnouncement.id,
                    userId: this.state.userid,
                    created: new Date(),
                }

                this.props.dispatch(insertNotification(notif))
                    .then(res => {
                        this.props.dispatch(getAnnouncementsOfInterests(this.state.userid))
                        this.props.notificationSittings[0].isChecked ?
                            this.sendPushNotification(this.state.expoPushToken, res)
                            : alert("Cannot get any notification! update your permissions")
                    })
            }

            )
    }


    signOut = () => {
        AsyncStorage.clear();
        this.props.dispatch(refresh())
        this.props.navigation.navigate('Login_Screen');

    }

    render() {


        return (
            <View style={{ flex: 1 }}>

                <DrawerContentScrollView {...this.props}>
                    <View style={styles.drawerContent}>
                        <View style={styles.userInfoSection}>
                            <View style={{ flexDirection: 'row', marginTop: 15 }}>
                                <Avatar.Image
                                    source={this.props.userProfile.image?{uri : this.props.userProfile.image}:{uri : `${ExpUrl}/src/components/images/user.png`}}
                                    size={50}
                                />
                                <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                                    <Title style={styles.title}>{this.props.userProfile.username}</Title>
                                    <Caption style={styles.caption} onPress={() => this.props.navigation.navigate('Profile')}>Voir profile </Caption>
                                </View>
                            </View>
                        </View>

                        <Drawer.Section style={styles.drawerSection}>
                            <DrawerItem
                                label="Accueil"
                                labelStyle={{ fontFamily: 'Product Sans' }}
                                onPress={() => { this.props.navigation.navigate('Home') }}
                            />
                            <DrawerItem
                                label="Paramètres"
                                labelStyle={{ fontFamily: 'Product Sans' }}
                                onPress={() => { this.props.navigation.navigate('Settings') }}
                            />
                            <DrawerItem
                                label="Aide"
                                labelStyle={{ fontFamily: 'Product Sans' }}
                                onPress={() => { this.props.navigation.navigate('not_found_screen') }}
                            />
                        </Drawer.Section>
                    </View>
                </DrawerContentScrollView>
                {/* <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="cube"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Envoyer une notification"
                        labelStyle={{ fontFamily: 'Product Sans', color: 'green' }}
                        onPress={() => { this.createNotificationByAnnouncement() }}
                    />
                </Drawer.Section> */}
                <Drawer.Section style={styles.bottomDrawerSection}>
                    <DrawerItem
                        icon={({ color, size }) => (
                            <Icon
                                name="exit-outline"
                                color={color}
                                size={size}
                            />
                        )}
                        label="Se déconnecter"
                        labelStyle={{ fontFamily: 'Product Sans' }}
                        onPress={() => { this.signOut() }}
                    />
                </Drawer.Section>
            </View>
        );
    }
}


const mapStatetoProps = state => {
    return {
        newAnouncement: state.announcements.newAnouncement,
        notification: state.notifications.notification,
        notificationSittings: state.permissions.permissions.notificationSittings,

        token: state.Authentification_Reducer.token,
        userProfile: state.Authentification_Reducer.userProfile,

    }
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1,
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontFamily: 'Product Sans bold',
        fontSize: 16,
        marginTop: 3,
        //fontWeight: 'bold',
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        color: '#DADADA',
        fontFamily: 'Product Sans'

    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15,
    },
    paragraph: {
        fontFamily: 'Product Sans bold',
        //fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },

});

export default (connect(mapStatetoProps)(DrawerContent))



