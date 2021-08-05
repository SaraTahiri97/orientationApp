import React, { Component } from 'react'

import { Setting_Item_With_Plus, Setting_Item, Container } from '../components/elements'

import { connect } from 'react-redux';
import { getAllPermissionsByUserId } from '../Store/actions/index';
import AsyncStorage from '@react-native-community/async-storage'


class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(v => {
                this.props.dispatch(getAllPermissionsByUserId(v))
            })
        })

    }


    render() {
        return (

            <Container>
                {/*<Setting_Item_With_Plus text='Langue' slectedLanguage={this.props.langue} navigation={this.props.navigation} screen='Select_Language_Screen' />*/}
                <Setting_Item text='Paramètre de notification' screen='NotificationSetting' navigation={this.props.navigation} />
                <Setting_Item text='Aide et soutient' screen='not_found_screen' navigation={this.props.navigation} />
                <Setting_Item text='Termes et conditions' screen='not_found_screen' navigation={this.props.navigation} />

            </Container>
        );
    };
}
const mapStatetoProps = state => {
    return {
        selectedLanguage: state.Languages_Reducer.selectedLanguage,
        permissions: state.permissions.permissions,
        langue: state.permissions.langue

    }
}




export default connect(mapStatetoProps)(Settings);