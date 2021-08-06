import React, { Component } from 'react';
import { StyleSheet, View, Text, Alert, Keyboard, Dimensions, TextInput, Modal, Pressable, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons as Icon } from '@expo/vector-icons';

import {
    Container, Page_Title, Input_Icon, Input, Dynamic_Button
} from '../components/elements'

import { connect } from 'react-redux';
import {
    login,
    getProfile,
    logoutFullfiled,
    forgotPassword,
    ResetPassword
} from '../Store/actions/index';
const { width, height } = Dimensions.get('window');


class Login_Screen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            forgotPassModel: false,
            codeModel: false,
            resetPassModel: false,
            showWarning: false,
            isSecure: true,
            textInput: '',
            error: '',

            formData: {
                email: '',
                password: '',
            }
        }
    }


    handleChange = (name, value) => {
        let newFormData = { ...this.state.formData }
        newFormData[name] = value
        this.setState({
            formData: newFormData
        }, () => { console.log("here:", this.state.formData) })
    }


    handleSubmit = () => {

        const { navigation } = this.props;
        Keyboard.dismiss();

        this.props.dispatch(login(this.state.formData))
            .then(res => {

                AsyncStorage.setItem('token', this.props.token)
                this.props.dispatch(getProfile(this.props.token)).then((res) => {
                    AsyncStorage.setItem('id', this.props.userProfile.id.toString())
                    /*  AsyncStorage.setItem('username', this.props.userProfile.username)
                     AsyncStorage.setItem('tel', this.props.userProfile.tel)
                     AsyncStorage.setItem('email', this.props.userProfile.email) */
                    AsyncStorage.setItem('fromRegister', 'false')

                })

                Alert.alert(
                    'Succès!',
                    'connecté avec succès!',

                    [
                        {
                            text: 'Continuer', onPress: () => {

                                navigation.navigate('screens', { screen: 'Home' })
                            }
                        }
                    ],
                    { cancelable: false }
                )

            })
            .catch(() => {
                Alert.alert(
                    'échec de connexion!',
                    this.props.errMessage,
                    [
                        {
                            text: 'Continuer', onPress: () => {
                                navigation.navigate('Login_Screen')
                            }
                        }
                    ],
                    { cancelable: false }
                )
            })


    }
    forgotPassModel() {

        return (
            <View style={styles.centeredView}>
                <Image style={{ width: width / 2, height: height / 4, bottom: height / 3 }} source={require('../components/images/Forgotpassword.png')} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.forgotPassModel}
                    onRequestClose={() => {
                        this.setState({ forgotPassModel: false, formData: { email: '' } });
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {this.props.isRejected ?
                                <Text style={[styles.dont_have_acc_Container, { width: '90%', color: 'red' }]} >échec de connexion :
                                    {this.props.errMessage}</Text> :
                                <Text style={[styles.dont_have_acc_Container, { width: '90%' }]} >tapez votre email ci-dessous
                                    et nous vous enverrons des instructions sur la façon de le réinitialiser</Text>

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
                                    placeholder='Adresse e-mail'
                                    clearTextOnFocus='true'
                                    placeholderTextColor="lightgray"
                                    autoCompleteType='email'
                                    value={this.state.textInput}
                                    onChangeText={text => { this.handleChange('email', text), this.setState({ textInput: text }) }}
                                />
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose,]}
                                onPress={() => {
                                    this.props.dispatch(forgotPassword(this.state.formData.email)).then(() => {
                                        this.setState({ forgotPassModel: false, codePassModel: true, textInput: '', })
                                        Keyboard.dismiss();

                                    })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }}
                            >
                                <Text style={styles.textStyle}>Envoyez-moi le code</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>


            </View>
        )
    }

    codePassModel() {


        return (
            <View style={styles.centeredView}>
                <Image style={{ width: width / 2, height: height / 4, bottom: height / 3 }} source={require('../components/images/Forgotpassword.png')} />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.codePassModel}
                    onRequestClose={() => {
                        this.setState({ codePassModel: false, formData: { email: '' } });
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {!this.state.showWarning ?
                                <Text style={[styles.dont_have_acc_Container, { width: '90%', color: 'black' }]} >Tapez le code </Text>
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
                                    onChangeText={text => {
                                        this.handleChange('code', text), this.setState({ textInput: text })
                                    }}
                                />
                            </View>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    // alert('state.code : ' + this.state.formData.code + '? = code : ' + this.props.code)
                                    this.props.code == this.state.formData.code ?
                                        this.setState({ codePassModel: false, resetPassModel: true, textInput: '', showWarning: false })
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
        )
    }
    resetPassModel() {
        return (
            <View style={styles.centeredView}>
                <Image style={{ width: width / 2, height: height / 4, bottom: height / 3 }} source={require('../components/images/Forgotpassword.png')} />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.resetPassModel}
                    onRequestClose={() => {
                        this.setState({ resetPassModel: false, formData: { email: '' } });
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            {this.props.isRejected ?
                                <Text style={[styles.dont_have_acc_Container, { width: '90%', color: 'red' }]} >Erreur : {this.props.errMessage} </Text> :
                                <Text style={[styles.dont_have_acc_Container, { width: '90%', color: 'black' }]} >Insérer un nouveau mot de passe (au moins 8 caractères ou chiffres) </Text>
                            }
                            <View style={{
                                height: '30%',
                                width: '95%',
                                borderRadius: 16,
                                backgroundColor: '#F5F5F5',
                                justifyContent: 'center', paddingLeft: 16,
                                marginVertical: 30,
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}>

                                <TextInput
                                    style={styles.Input_text}
                                    placeholder='le nouveau mot de passe'
                                    clearTextOnFocus='true'
                                    placeholderTextColor="lightgray"
                                    secureTextEntry={true}
                                    value={this.state.textInput}

                                    onChangeText={text => {
                                        this.handleChange('newPassword', text), this.setState({ textInput: text })
                                    }}
                                />
                                <Pressable style={styles.Input_icon} onPress={() => this.setState({ isSecure: !this.state.isSecure })}>
                                    <Icon name={this.state.isSecure ? 'eye' : 'eye-off'} size={20} color='lightgray' />
                                </Pressable>
                            </View>


                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => {
                                    this.props.dispatch(ResetPassword(this.state.formData.email, this.state.formData.newPassword)).then(() => {
                                        this.setState({ resetPassModel: false, textInput: '', })
                                        Keyboard.dismiss();
                                        Alert.alert(
                                            'Succès!',
                                            'vous avez réussi à réinitialiser votre mot de passe !',

                                            [
                                                {
                                                    text: 'Ok', onPress: () => {

                                                        console.log('ok')
                                                    }
                                                }
                                            ],
                                            { cancelable: true }
                                        )
                                    })
                                        .catch((err) => {
                                            console.log(err)
                                        })
                                }}
                            >
                                <Text style={styles.textStyle}> Sauvegarder </Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>


            </View>
        )
    }



    render() {
        return (
            <Container>

                {this.state.forgotPassModel ? this.forgotPassModel() : this.state.codePassModel ? this.codePassModel() : this.state.resetPassModel ? this.resetPassModel() :
                    <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', }}>
                        <View style={{
                            width: '80%',
                            justifyContent: 'center',
                            alignItems: 'flex-start',
                        }}>
                            <Page_Title Page_Title='Bienvenue à Tawjeeh' login='true' />
                        </View>
                        <Input input_text='Adresse e-mail' type='email' onChangeText={this.handleChange} />
                        <Input_Icon
                            type='password'
                            input_text='Mot de passe' onChangeText={this.handleChange}
                            islogout={this.props.islogout}
                            logoutFullfiled={() => this.props.dispatch(logoutFullfiled())} />
                        <Pressable style={styles.forgot_pass_Container} onPress={() => { this.setState({ forgotPassModel: true }) }}>
                            <Text style={styles.forgot_pass_text}> Mot de passe oublié?</Text>
                        </Pressable>
                        <View style={{
                            height: height / 10,
                            width: '83%',
                            marginTop: '13%',
                            borderRadius: 16,
                        }}>

                            <Dynamic_Button title="S'identifier" onPress={() => this.handleSubmit()} isLoading={this.props.isLoading} />
                        </View>
                        <View style={styles.dont_have_acc_Container}>
                            <Text style={styles.dont_have_acc_Text}>Vous n'avez pas de compte ?
                                <Text style={{ color: '#FF7F4F', textDecorationLine: 'underline' }}
                                    onPress={() => this.props.navigation.navigate('Register_Screen')} > S'inscrire </Text>
                            </Text>
                        </View>
                    </View>
                }
            </Container>
        )
    }
}







const styles = StyleSheet.create({
    forgot_pass_Container: {
        height: 'auto',
        width: "40%",
        position: 'relative',
        top: "2%",
        left: "22%",



    },
    forgot_pass_text: {
        fontFamily: 'Product Sans',
        fontSize: 14,
        fontStyle: 'normal',
        lineHeight: 21,
        letterSpacing: 1,
        textAlign: 'right',
        color: '#FF7F4F',
        // fontWeight: "500",

    },
    dont_have_acc_Container: {
        fontFamily: 'Product Sans',
        position: 'relative',
        width: '100%',
        height: 'auto',
        justifyContent: 'center',
        alignItems: 'center',
        top: "6%",



    },
    dont_have_acc_Text: {
        fontFamily: 'Product Sans',
        fontStyle: 'normal',
        //fontWeight: "600",
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 1,


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
        isRejected: state.Authentification_Reducer.isRejectedF,
        islogout: state.Authentification_Reducer.islogout,
        errMessage: state.Authentification_Reducer.errMessage,
        code: state.Authentification_Reducer.code,


    }
}
export default connect(mapStatetoProps)(Login_Screen)