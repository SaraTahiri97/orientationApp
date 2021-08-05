import React, { Component } from 'react'
import { ScrollView, View, StyleSheet, Dimensions,Text } from 'react-native'
import {  Feed_Flatlist } from '../components/elements'
import { connect } from 'react-redux';
import {
    handleBookmark,
    ckeckBookmark,
} from '../Store/actions/index';
import AsyncStorage from '@react-native-community/async-storage'
const { width, height } = Dimensions.get('window');


class BookMark_Details extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: ''
        }
        this.list = []
        this.title = ''
    }

    componentDidMount() {
        this.list = this.props.route.params.list;
        this.title = this.props.route.params.title;


        AsyncStorage.getItem('id').then(v => { this.setState({ userId: v }) })
    }

    handleBookmark_T = (idAnn, bookmarked) => {
        this.props.handle_Bookmark(this.state.userId, idAnn, bookmarked)
        this.props.ckeckBookmark(idAnn, bookmarked)
    }
    render() {
        return (
            <View style={styles.Container_View}>
                
                <ScrollView style={{ width: width, height: height, }}>
                    <View style={styles.Latest_news_View}>
                        <Text style={styles.Latest_news}>{this.title}</Text>
                    </View>
                    <View style={{ flex: 1, right: '5%',  }}>
                        <Feed_Flatlist feed={this.list} navigation={this.props.navigation}
                            bookDetail='1' />
                    </View>
                </ScrollView>
            </View>

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
        height: height
    },
    Latest_news_View: {
        width: '60%',
        height: 'auto',
        left: '5%',
        top: '3%',
        marginBottom: '7%',
        position: 'relative',

    },
    Latest_news: {
        fontSize: 20,
        fontFamily: "Product Sans bold",
    }
});
const mapStatetoProps = state => {
    return {



    }
}

const mapDispatchToProps = dispatch => {
    return {
        handle_Bookmark: (idUser, idAnn, bookmarked) => dispatch(handleBookmark(idUser, idAnn, bookmarked)),
        ckeckBookmark: (idAnn, bookmarked) => dispatch(ckeckBookmark(idAnn, bookmarked))
    };
}


export default connect(mapStatetoProps, mapDispatchToProps)(BookMark_Details)