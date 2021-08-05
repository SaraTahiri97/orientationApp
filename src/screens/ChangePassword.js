import React from 'react'
import { View, Keyboard, Alert, Dimensions } from 'react-native'
import { Input_Icon, Container, Dynamic_Button, } from '../components/elements'
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window');

import {
    updatePassword
} from '../Store/actions/index';
import AsyncStorage from '@react-native-community/async-storage'


class ChangePassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            formData: {}
        }
    }
    componentDidMount = () => {
        AsyncStorage.getItem('id').then(v => { this.setState({ userId: v }) })
    }
    handleChange = (name, value) => {
        let newFormData = { ...this.state.formData }
        newFormData[name] = value
        this.setState({
            formData: newFormData
        }, () => { console.log(this.state.formData) })
    }


    handleSubmit = () => {
        const { navigation } = this.props;
        Keyboard.dismiss();
        // alert(this.state.userId)
        this.props.dispatch(updatePassword(this.state.userId, this.state.formData))
            .then(res => {
                Alert.alert(
                    'Succès!',
                    'Votre mot de passe a été mis à jour',
                    [
                        {
                            text: 'Continue', onPress: () => {
                                navigation.navigate('Profile')
                            }
                        }
                    ],
                    { cancelable: false }
                )
            })
            .catch(() => {

                Alert.alert(
                    'Echec!',
                    this.props.errMessage,
                    [
                        {
                            text: 'Continue', onPress: () => {
                                navigation.navigate('ChangePassword')
                            }
                        }
                    ],
                    { cancelable: false }
                )
            })

    }

    render() {
        return (
            <Container>
                <View style={{ flex: 1, width: '100%', alignItems: 'center', marginTop: '10%' }}>
                    <Input_Icon icon_name='eye-outline' type='password' input_text="entrez l'ancien mot de passe"
                        name='oldPassword'
                        onChangeText={this.handleChange} />
                    <Input_Icon icon_name='eye-outline' type='password' input_text='Entrez un nouveau mot de passe'
                        name='newPassword1'
                        onChangeText={this.handleChange} />
                    <Input_Icon icon_name='eye-outline' type='password' input_text='Répété le nouveau mot de passe'
                        name='newPassword2'
                        onChangeText={this.handleChange} />
                    <View style={{
                        height: height / 10,
                        width: '83%',
                        marginTop: '13%',
                        borderRadius: 16,
                    }}>
                        <Dynamic_Button title='Continuer' onPress={() => this.handleSubmit()} />
                    </View>
                </View>
            </Container>
        )
    }
}

const mapStatetoProps = state => {
    return {

        errMessage: state.Authentification_Reducer.errMessage,
    }
}

export default connect(mapStatetoProps)(ChangePassword)