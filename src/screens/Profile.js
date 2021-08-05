import React from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Profil_Item } from '../components/elements'
import { connect } from 'react-redux';
import { refresh } from '../Store/actions/index';
import { ExpUrl } from '../config'




class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      image :''
    }
  }
  componentDidMount = () => {
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.setState({ userName: this.props.userProfile.username, image:this.props.userProfile.image })
    });
  }

  componentWillUnmount() {
    if (this.focusListener != null && this.focusListener.remove) {
      this.focusListener.remove();
    }
  }
  render() {
    const signOut = () => {
      AsyncStorage.clear();
      this.props.dispatch(refresh())
      this.props.navigation.navigate('Login_Screen');

    }

    return (
      <Container>
        <View style={{
          flexDirection: 'row', width: "90%", height: '15%', borderColor: 'gray',
          alignItems: 'center', paddingLeft: '5%', borderBottomWidth: 0.5,
        }}>
          <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={this.state.image?{uri : this.state.image }:{uri : `${ExpUrl}/src/components/images/user.png`}} />
          <Text style={{ fontFamily: 'Product Sans bold', fontSize: 24, marginLeft: 13 }}>{this.state.userName}</Text>
        </View>
        <Profil_Item text='Intérêts' screen='interests' navigation={this.props.navigation} />
        <Profil_Item text='Editer le profil' screen='Edit_Profile' navigation={this.props.navigation} />
        <Profil_Item text='Changer le mot de passe' screen='ChangePassword' navigation={this.props.navigation} />
        <TouchableOpacity style={styles.Profile_Item_Container} onPress={() => { signOut() }}>
          <Text style={styles.Profile_Item_text}>Se déconnecter</Text>
        </TouchableOpacity>
      </Container>
    )
  }
}




const styles = StyleSheet.create({
  Profile_Item_Container: {
    height: 25,
    width: "90%",
    height: '15%',
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: "6%",
    borderBottomWidth: 0.5,
    borderColor: '#999',

  },
  Profile_Item_text: {
    fontFamily: 'Product Sans',
    color: 'red',
    position: 'absolute',
    marginLeft: '5%',
    fontSize: 20,
    fontWeight: '100'

  },
})
const mapStatetoProps = state => {
  return {
    userProfile: state.Authentification_Reducer.userProfile,

  }
}

export default (connect(mapStatetoProps)(Profile))