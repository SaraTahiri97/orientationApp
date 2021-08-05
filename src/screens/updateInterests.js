import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions, Alert } from 'react-native'
import { Container, Page_Title, Interest_Item, Dynamic_Button } from '../components/elements'
import { Ionicons as Icon } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage'


const { width, height } = Dimensions.get('window');
import { connect } from 'react-redux';
import {
    checkBourse,
    checkConcours,
    selectBourse,
    selectConcours,
    getOrganisationsByUserId,
    updateInterests,
    selectAutres,
    getAnnouncementsOfInterests
} from '../Store/actions/index';

class Interests extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: ''
        };
    }
    componentDidMount = () => {
        AsyncStorage.getItem('id').then(data => {

            data ? this.props.getOrganisationsByUserId(data) : null
            this.setState({ userId: data })
        })
    }

    hundleSubmit = () => {
        const { navigation } = this.props

        if (!this.props.Boursechecked && !this.props.Concourschecked && !this.props.Autrescheckeds) {
            console.log('IMPORTANT' + this.props.Boursechecked + '__' + this.props.Concourschecked)

            Alert.alert(
                'IMPORTANT!',
                'Vous devez choisir au moins un intérêt',
                [
                    {
                        text: 'Continue', onPress: () => {
                            navigation.navigate('interests')
                        }

                    }
                ],
                { cancelable: false }
            )

            s
        }
        else {

            this.props.updateInterests(this.state.userId, this.props.selectedconcours, this.props.selectedbourses, this.props.selectedautres)
                .then(() => {
                    Alert.alert(
                        'Succès!',
                        "Vos centres d'intérêt ont été mis à jour",
                        [
                            {
                                text: 'Continue', onPress: () => {
                                    navigation.navigate('Profile')
                                    this.props.getAnnouncementsOfInterests(this.state.userId)

                                }
                            }
                        ],
                        { cancelable: false }
                    )

                })
                .catch(() => {

                    Alert.alert(
                        'Failed!',
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

    }
    render() {
        return (

            <View style={{ backgroundColor: 'white', }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} >
  
                    <Container>
                        <View style={styles.Title_View}>
                            <Page_Title Page_Title='Choisissez vos intérêts.' />
                        </View>

                        <View style={styles.checkBox_View}>
                            <TouchableOpacity style={styles.check_Box}
                                onPress={() => this.props.checkBourse(!this.props.Boursechecked)}>
                                {this.props.Boursechecked ? <Icon name='checkmark' size={24} color='#08AA41' /> : undefined
                                }
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20,fontFamily: 'Product Sans' }}>Bourse</Text>
                        </View>

                        <View style={styles.intrestes_container}>
                            <Interest_Item interests={this.props.selectedbourses} onBtnClick={this.props.onBourseBtnClick} />

                        </View>
                        <View style={styles.checkBox_View}>
                            <TouchableOpacity style={styles.check_Box}
                                onPress={() => this.props.checkConcours(!this.props.Concourschecked)}>
                                {this.props.Concourschecked ? <Icon name='checkmark' size={24} color='#08AA41' /> : undefined
                                }
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20,fontFamily: 'Product Sans' }}>Concours</Text>
                        </View>

                        <View style={styles.intrestes_container}>
                            <Interest_Item interests={this.props.selectedconcours} onBtnClick={this.props.onConcoursBtnClick} />

                        </View>

                        <View style={styles.checkBox_View}>
                            <TouchableOpacity style={styles.check_Box}
                                onPress={() => this.props.checkAutres(!this.props.Autreschecked)}>
                                {this.props.Autreschecked ? <Icon name='checkmark' size={24} color='#08AA41' /> : undefined
                                }
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontFamily: 'Product Sans',}}>Autres intérêts </Text>
                        </View>

                        <View style={styles.intrestes_container}>
                            <Interest_Item interests={this.props.selectedautres} onBtnClick={this.props.onAutresBtnClick} />

                        </View>
                        <View style={{
                            height: height/10,
                            width: '83%',
                            marginVertical: '13%',
                            borderRadius: 16,
                        }}>
                            <Dynamic_Button title='Submit' onPress={() => this.hundleSubmit()} />
                        </View>



                    </Container>
                    {/*                     </View>
 */}
                </ScrollView>
            </View >
        )

    }
}



const styles = StyleSheet.create({
    Container_View: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
        width: '100%',
    },
    Title_View: {
        height: height / 7,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    checkBox_View: {
        width: '87%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '6%',
        paddingLeft: 4,

    },
    intrestes_container: {
        width: '80%',
        marginTop: '3%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        right: '1%',

    },
    check_Box: {
        width: '8%',
        height: '100%',
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#08AA41',
        marginHorizontal: '2%'
    }

})

const mapStatetoProps = state => {
    return {

        Boursechecked: state.organisations_interests.Boursechecked,
        Concourschecked: state.organisations_interests.Concourschecked,
        Autreschecked: state.organisations_interests.Autreschecked,
        selectedbourses: state.organisations_interests.bourses,
        selectedconcours: state.organisations_interests.concours,
        selectedautres: state.organisations_interests.autres,
        errMessage: state.Authentification_Reducer.errMessage,



    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkConcours: (Concourschecked) => dispatch(checkConcours(Concourschecked)),
        checkBourse: (Boursechecked) => dispatch(checkBourse(Boursechecked)),
        checkAutres: (Autreschecked) => dispatch(checkAutres(Autreschecked)),
        onBourseBtnClick: (id, name, ischosen) => dispatch(selectBourse(id, name, ischosen)),
        onConcoursBtnClick: (id, name, ischosen) => dispatch(selectConcours(id, name, ischosen)),
        onAutresBtnClick: (id, name, ischosen) => dispatch(selectAutres(id, name, ischosen)),
        getAllTags: () => dispatch(getAllTags()),

        getOrganisationsByUserId: (data) => dispatch(getOrganisationsByUserId(data)),
        updateInterests: (userId, concours, bourses, autres) => dispatch(updateInterests(userId, concours, bourses, autres)),
        getAnnouncementsOfInterests: (id) => dispatch(getAnnouncementsOfInterests(id)),

    };
}


export default connect(mapStatetoProps, mapDispatchToProps)(Interests);