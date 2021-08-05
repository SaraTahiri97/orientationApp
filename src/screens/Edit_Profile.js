import React, { Component } from 'react'
import { StyleSheet, View, Text, Alert, ScrollView, Keyboard, Dimensions, Image, TouchableOpacity, Platform, TouchableHighlightBase } from 'react-native';
import axios from 'axios'
import { URL } from '../config'
import { Input, Dynamic_Button } from '../components/elements'
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import { ExpUrl } from '../config'
import { Ionicons as Icon } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window');

class Edit_Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formData: this.props.userProfile,
            image: this.props.userProfile.image

        }
        this.link = `${ExpUrl}/src/components/images/user.png`

    }

    componentDidMount = () => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        });
    }

    pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ image: result.uri });
        }


    };



    handleChange = (name, value) => {
        let newFormData = this.state.formData
        newFormData[name] = value
        this.setState({
            formData: newFormData
        }, () => { console.log(this.state.formData) })
    }



    handleSubmit = () => {
        const { navigation } = this.props;
        Keyboard.dismiss();
        this.state.formData.image = this.state.image
        axios.post(`${URL}/users/update/user/${this.state.formData.id}`, this.state.formData)
            .then(res => {
                Alert.alert(
                    'Succès!',
                    'Vos informations ont été mises à jour',
                    [
                        {
                            text: 'Continuer', onPress: () => {

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
                            text: 'Continuer', onPress: () => {
                                navigation.navigate('Edit_Profile')
                            }
                        }
                    ],
                    { cancelable: false }
                )
            })




    }





    render() {

        return (

            <ScrollView style={{ flex: 1, width: '100%', backgroundColor: '#fff', }}>
                <View style={styles.Container_View}>

                    <Image style={{ width: 125, height: 125, borderRadius: 62.5, bottom: '4%' }} source={this.state.image ? { uri: this.state.image } : { uri: this.link }} />
                    <TouchableOpacity style={{ backgroundColor: 'green', borderRadius: 17.5, bottom: "7%", left: "10%" }} onPress={() => { this.pickImage() }}>
                        <Icon name='add' size={25} color='white' />
                    </TouchableOpacity>

                    <Input type='username' onChangeText={this.handleChange} value={this.state.formData.username} />
                    <Input type='email' onChangeText={this.handleChange} value={this.state.formData.email} />
                    <Input type='tel' onChangeText={this.handleChange} value={this.state.formData.tel} tel />
                    <View style={{
                        height: height / 10,
                        width: '83%',
                        marginTop: '13%',
                        borderRadius: 16,
                    }}>
                        <Dynamic_Button title='Save changes' onPress={() => this.handleSubmit()} isLoading={this.props.isLoading} />
                    </View>
                </View>
            </ScrollView>

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
        fontWeight: "600",
        fontSize: 14,
        lineHeight: 18,
        letterSpacing: 1.5,


    }
})
const mapStatetoProps = state => {
    return {
        token: state.Authentification_Reducer.token,
        userProfile: state.Authentification_Reducer.userProfile,
        errMessage: state.Authentification_Reducer.errMessage,
        isLoading: state.Authentification_Reducer.isLoading,
    }
}




export default connect(mapStatetoProps)(Edit_Profile);