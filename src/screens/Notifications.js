import React from 'react'
import { View, ScrollView, ActivityIndicator, Text } from 'react-native'
import { Container, Notification_Flatlist } from '../components/elements'
import AsyncStorage from '@react-native-community/async-storage'


import { connect } from 'react-redux';
import {
    getAllNotification,
    updateNotification
} from '../Store/actions/index';
import { _ } from 'lodash';


class Notifications extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userid: '',

        }
    }


    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(userid => {
                this.props.dispatch(getAllNotification(userid))
            })
        });
    }

    componentWillUnmount() {
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }
    _hundleOnPress = (idNotification) => {
        this.props.dispatch(updateNotification(idNotification))
    }

    render() {
        return (
            <Container>
                < ScrollView style={{ flex: 1, width: '100%', }}>
                    {this.props.isLoading ?
                        <View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="light-green" />
                        </View>

                        :
                        this.props.notificationList.length <= 0 ?
                            <>
                                <Text style={{left: '20%',fontFamily: "Product Sans",}}>vous n'avez pas encore reçu de notification</Text>
                            </>
                            :
                            this.props.notificationList.reverse().map(element => {
                                return <Notification_Flatlist key = {element.id} notifications={element.notifications.reverse()} time={element.heading} navigation={this.props.navigation}
                                    hundleOnPress={this._hundleOnPress}
                                />
                            })



                    }





                </ScrollView>
            </Container>
        )

    }
}


const mapStatetoProps = state => {
    return {
        notificationList: state.notifications.notificationList,
        isLoading: state.notifications.isLoading,


    }
}
export default connect(mapStatetoProps)(Notifications)
