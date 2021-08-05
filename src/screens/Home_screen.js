import React, { Component } from 'react'
import { View, Text, ScrollView, StyleSheet, BackHandler, Alert, ActivityIndicator, Dimensions, LogBox } from 'react-native';
import { Container, Feed_Flatlist } from '../components/elements'
import Carousel from '../components/Carousel'
import Flatlist_tags from '../components/Flatlist_tags'
import Search_screen from './Search_Screen'

import { connect } from 'react-redux';
import {
    getAnnouncementsOfInterests,
    listCorrespondedFeeds,
    getSearchedAnouncements,
    getAllPermissionsByUserId,
    handleBookmark,
    ckeckBookmark,
} from '../Store/actions/index';
import AsyncStorage from '@react-native-community/async-storage'
import { Ionicons as Icon } from '@expo/vector-icons';
LogBox.ignoreLogs(['VirtualizedLists should never be nested inside plain ScrollViews with the same orientation - use another VirtualizedList-backed container instead.']);
LogBox.ignoreLogs(['Warning: Failed child context type: Invalid child context `virtualizedCell.cellKey` of type `number` supplied to `CellRenderer`, expected `string`.']);

const height = Dimensions.get('window').height





class Home_screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommened: false,
            userId: ''


        };

        this.isUpdate =  this.props.route.params;
    }



    backAction = () => {
        Alert.alert("Hold on!", "Are you sure you want to exit this app?", [
            {
                text: "Cancel",
                onPress: () => null,
                style: "cancel"
            },
            { text: "YES", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    componentDidMount() {
        this.backHandler = BackHandler.addEventListener("hardwareBackPress", this.backAction);
        AsyncStorage.getItem('id').then(v => {
            this.setState({ userId: v })
            this.props.getAllPermissionsByUserId(v).then((res) => {
                this.props.getAnnouncementsOfInterests(v)
                this.setState({ recommened: this.props.notificationSittings[1].isChecked })
            }
            )
        })

    }


    componentWillUnmount() {
        this.backHandler.remove();
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }

    }
    handleBookmark_T = (idAnn,bookmarked) => {
        this.props.ckeckBookmark(idAnn,bookmarked) //1 : handles the finalResultList, dataList updates
        this.props.handle_Bookmark(this.state.userId, idAnn,bookmarked)
    }

    render() {

        return (
            <View style={{ height: height, backgroundColor: 'white', flex: 1 }}>
                <Search_screen navigation={this.props.navigation} />
                <Container>
                    {this.props.isLoading ?
                        <View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color="light-green" />
                        </View>

                        :

                        <ScrollView style={styles.ScrollView_Style} >
                            <Flatlist_tags data={this.props.tags} displayCorrespondedFeeds={this.props.displayCorrespondedFeeds}
                            selectedItem={this.props.selectedItem} isUpdate={this.isUpdate} />
                            {this.props.finalResult.length == 0 ?
                                <View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center', }}>
                                    <Icon name="search-outline" size={160} color="lightgray" />
                                </View> :
                                <>
                                    {this.props.not_enough_data ? null :
                                        <Carousel data={this.props.dataList} navigation={this.props.navigation} handleBookmark={this.handleBookmark_T} />}

                                    <View style={styles.Latest_news_View}>
                                        <Text style={styles.Latest_news}> Actualié Récente</Text>
                                    </View>

                                    <Feed_Flatlist feed={this.props.finalResult} navigation={this.props.navigation}
                                        rec={this.props.notificationSittings != undefined ? this.props.notificationSittings[1].isChecked : this.state.recommened}
                                        handleBookmark={this.handleBookmark_T} />
                                </>
                            }
                        </ScrollView>
                    }
                </Container>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    ScrollView_Style: {
        flex: 1,
        width: '100%',
        height: 'auto',
        top: '4%',
    },
    Latest_news_View: {
        width: '60%',
        height: 'auto',
        left: '10%',
        top: '3%',
        marginBottom: '7%',
        position: 'relative',

    },
    Latest_news: {
        fontSize: 16,
        fontFamily: "Product Sans bold",
        //fontWeight: "700"

    }
})


const mapStatetoProps = state => {
    return {
        tags: state.announcements.tags,
        selectedItem: state.announcements.selectedItem,
        dataList: state.announcements.dataList,
        finalResult: state.announcements.finalResult,
        not_enough_data: state.announcements.not_enough_data,
        isLoading: state.announcements.isLoading,
        isRejected: state.announcements.isRejected,
        is_searching: state.announcements.is_searching,
        notificationSittings: state.permissions.permissions.notificationSittings

    }
}

const mapDispatchToProps = dispatch => {
    return {
        displayCorrespondedFeeds: (id, tag) => dispatch(listCorrespondedFeeds(id, tag)),
        getAnnouncementsOfInterests: (id) => dispatch(getAnnouncementsOfInterests(id)),
        getAllPermissionsByUserId: (id) => dispatch(getAllPermissionsByUserId(id)),
        getSearchedAnouncements: (search) => dispatch(getSearchedAnouncements(search)),
        handle_Bookmark: (idUser, idAnn, bookmarked) => dispatch(handleBookmark(idUser, idAnn,bookmarked)),
        ckeckBookmark: (idAnn, bookmarked) => dispatch(ckeckBookmark(idAnn,bookmarked))
    };
}


export default connect(mapStatetoProps, mapDispatchToProps)(Home_screen);