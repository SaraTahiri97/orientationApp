import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, BackHandler, Alert, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Container, Feed_Flatlist } from '../components/elements'
import Search_screen from './Search_Screen'
import AsyncStorage from '@react-native-community/async-storage'

import { connect } from 'react-redux';
import { Ionicons as Icon } from '@expo/vector-icons';
const height = Dimensions.get('window').height
import {
    handleBookmark,
    ckeckBookmark,
} from '../Store/actions/index';

class Result_Screen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId:''
        };

    }
    componentDidMount() {
        AsyncStorage.getItem('id').then(v => {
            this.setState({ userId: v })
        })
    }
    handleBookmark_T = (idAnn,bookmarked) => {
        this.props.dispatch(handleBookmark(this.state.userId, idAnn,bookmarked))
        this.props.dispatch(ckeckBookmark(idAnn,bookmarked)) 
    }
    render() {

        return (
            <View style={{ height: height, backgroundColor: 'white' }}>
                <Search_screen navigation={this.props.navigation} isSearchPage={true} />

                <Container>

                    {this.props.isSearchRejected ?

                        <View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' ,}}>
                            <Icon name="search-outline" size={160} color="lightgray" />
                            <Text style={{ color: 'gray' }}>Désolé, nous n'avons trouvé aucun résultat{"\n"}     correspondant à cette recherche</Text>
                        </View>
                        : this.props.isSearchLoading ?
                            <View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="light-green" />
                            </View>

                            :
                            <ScrollView style={styles.ScrollView_Style} >



                                <View style={styles.Latest_news_View}>
                                    <Text style={styles.Latest_news}>
                                        Resultat de recheche
                                    </Text>
                                </View>
                                <Feed_Flatlist feed={this.props.searchedList} navigation={this.props.navigation} handleBookmark={this.handleBookmark_T} bookDetail='1' />
                            </ScrollView>
                    }
                </Container>
            </View>
        )
    }
}

const mapStatetoProps = state => {
    return {
        searchedList: state.announcements.searchedList,
        isSearchLoading: state.announcements.isSearchLoading,
        isSearchRejected: state.announcements.isSearchRejected,
    }
}

export default connect(mapStatetoProps)(Result_Screen)
const styles = StyleSheet.create({
    ScrollView_Style: {
        flex: 1,
        width: '100%',
        top: '4%',
    },
    Latest_news_View: {
        width: '60%',
        height: 'auto',
        left: '10%',
        top: '3%',
        marginBottom: '2%',

    },
    Latest_news: {
        fontSize: 16,
        fontFamily: "Product Sans bold",
       // fontWeight: "700"

    }
})
