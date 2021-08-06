import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Text, Alert, ScrollView, Keyboard, Dimensions, Modal, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

import {
    Page_Title, Input_Icon, Input, Dynamic_Button
} from '../components/elements'

import { connect } from 'react-redux';
import { register, getProfile, insertDefultPermission } from '../Store/actions/index';

const { width, height } = Dimensions.get('window');

class Register_Screen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            codePassModel: false,
            textInput: '',
            formData: {}

        }
    }


    handleChange = (name, value) => {
        let newFormData = { ...this.state.formData }
        newFormData[name] = value
        this.setState({
            formData: newFormData
        }, () => { console.log(this.state.formData) })
    }
    codePassModel() {


        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={styles.centeredView}>
                    <Image style={{ width: width / 2, height: height / 4, bottom: height / 3 }} source={require('../components/images/EV.png')} />

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.codePassModel}
                        onRequestClose={() => {
                            this.setState({ codePassModel: false, });
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {!this.state.showWarning ?
                                    <Text style={[styles.dont_have_acc_Container, { width: '90%', color: 'black' }]} >Tapez le code de vérifcation </Text>
                                    : <Text style={[styles.dont_have_acc_Container, { width: '90%', color: 'red' }]} >Le code n'est pas correct</Text>
                                }
                                <View style={{
                                    height: '30%',
                                    width: '95%',
                                    borderRadius: 16,
                                    backgroundColor: '#F5F5F5',
                                    justifyContent: 'center', paddingLeft: 16,
                                    marginVertical: 30
                                }}>

                                    <TextInput
                                        style={styles.Input_text}
                                        placeholder='X X X X'
                                        clearTextOnFocus='true'
                                        placeholderTextColor="lightgray"
                                        value={this.state.textInput}
                                        keyboardType='numeric'
                                        onChangeText={text => {
                                            this.handleChange('code', text), this.setState({ textInput: text })
                                        }}
                                    />
                                </View>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {
                                        alert('state.code : ' + this.state.formData.code + '? = code : ' + this.props.code)
                                        this.props.code == this.state.formData.code ?
                                            this.setState({ codePassModel: false, textInput: '', showWarning: false }, this.props.navigation.navigate('interests'))
                                            : this.setState({ codePassModel: true, textInput: '', showWarning: true })
                                        Keyboard.dismiss();

                                    }}
                                >
                                    <Text style={styles.textStyle}>Vérifier</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>


                </View>
            </View>
        )
    }

    handleSubmit = () => {
        const { navigation } = this.props;
        Keyboard.dismiss();

        this.props.dispatch(register(this.state.formData))
            .then(res => {
                console.log('res == ' + this.props.token)
                AsyncStorage.setItem('token', this.props.token)
                this.props.dispatch(getProfile(this.props.token)).then((res) => {
                    AsyncStorage.setItem('id', this.props.userProfile.id.toString())
                    AsyncStorage.setItem('username', this.props.userProfile.username)
                    AsyncStorage.setItem('email', this.props.userProfile.email)
                    AsyncStorage.setItem('tel', this.props.userProfile.tel)
                    AsyncStorage.setItem('fromRegister', 'true')
                    this.props.dispatch(insertDefultPermission(this.props.userProfile.id)).then(
                        console.log('done')
                    )
                })

                Alert.alert(
                    'Succès!',
                    "un code de vérification de l'e-mail vous a été envoyé",
                    [
                        {
                            text: 'Continuer', onPress: () => {
                                this.setState({ codePassModel: true })

                            }
                        }
                    ],
                    { cancelable: false }
                )
            })
            .catch(() => {

                Alert.alert(
                    'échec de création!',
                    this.props.errMessage,
                    [
                        {
                            text: 'Continuer', onPress: () => {
                                navigation.navigate('Register_Screen')
                            }
                        }
                    ],
                    { cancelable: false }
                )
            })

    }

    render() {

        return (


            <>
                {this.state.codePassModel ?
                    this.codePassModel()
                    :
                    <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#fff', }}>
                        <View style={styles.Container_View}>
                            <View style={{
                                width: '80%',
                                justifyContent: 'center',
                                alignItems: 'flex-start',
                            }}>
                                <Page_Title Page_Title='Créer un nouveau compte' />
                            </View>
                            <Input input_text="Nom d'utilisateur" type='username' onChangeText={this.handleChange} />
                            <Input input_text='Adresse e-mail (ex: user@email.com ) ' type='email' onChangeText={this.handleChange} />
                            <Input input_text='Numéro de téléphone ( ex: 06 00 00 00 00 )' type='tel' onChangeText={this.handleChange} tel />
                            <Input_Icon icon_name='eye-outline'
                                type='password'
                                input_text='Mot de passe (au moins 8 caractères)' onChangeText={this.handleChange}

                            />
                            <View style={{
                                height: height / 10,
                                width: '83%',
                                marginTop: '13%',
                                borderRadius: 16,
                            }}>

                                <Dynamic_Button title='Créer le compte' onPress={() => this.handleSubmit()} isLoading={this.props.isLoading} />
                            </View>
                            <View style={styles.have_acc_Container}>
                                <Text style={styles.have_acc_Text}>Avoir un compte? <Text style={{ color: '#FF7F4F', textDecorationLine: 'underline' }}
                                    onPress={() => this.props.navigation.navigate('Login_Screen')} >S'identifier</Text> </Text>
                            </View>
                        </View>
                    </ScrollView>
                }
            </>


        )
    }
}
const styles = StyleSheet.create({
    Container_View: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
        height: height,
    },

    have_acc_Container: {
        position: 'relative',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        top: "3%",


    },
    have_acc_Text: {
        fontFamily: 'Product Sans',
        // fontWeight: "600",
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 1.5,


    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: width / 1.2,
        height: height / 3
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#FF7F4F",
    },
    buttonClose: {
        backgroundColor: "#FF7F4F",
    },
    textStyle: {
        fontFamily: 'Product Sans',
        color: "white",
        fontWeight: "bold",
        textAlign: "center",

    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    Input_icon: {
        backgroundColor: '#F5F5F5',
        height: '100%',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        right: 15,
        position: 'absolute'

    },
})
const mapStatetoProps = state => {
    return {
        token: state.Authentification_Reducer.token,
        userProfile: state.Authentification_Reducer.userProfile,
        isLoading: state.Authentification_Reducer.isLoading,
        errMessage: state.Authentification_Reducer.errMessage,
        code: state.Authentification_Reducer.code,


    }
}




export default connect(mapStatetoProps)(Register_Screen);