import React, { Component } from 'react'
import { View, Text, Dimensions, Alert ,LogBox} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { Container, BookMark_Item } from '../components/elements'
import { connect } from 'react-redux';
import {
    getBookmarkedByUser
} from '../Store/actions/index';
import { ScrollView } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('window');
/* LogBox.ignoreLogs(['Warning: Encountered two children with the same key, `key[object Object]`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.']);
LogBox.ignoreLogs(['Animated.event now requires a second argument for options']);
 */

class BookMark_Page extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount = () => {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            AsyncStorage.getItem('id').then(v => {
                this.props.dispatch(getBookmarkedByUser(v)).then(() => {
                    //alert(JSON.stringify(this.props.bookmarkedC))
                    if (this.props.bookmarkedC.length == 0 && this.props.bookmarkedB.length == 0 && this.props.bookmarkedE.length == 0) {
                        alert('Pas encore de favoris')

                    }
                } )
            });
        })

    }

    componentWillUnmount() {
        if (this.focusListener != null && this.focusListener.remove) {
            this.focusListener.remove();
        }
    }


    render() {
        return (
            <Container>

                <View style={{
                    flex: 1, height: height, flexWrap: 'wrap', flexDirection: 'row'
                }}>

                    <BookMark_Item title='Concours' list={this.props.bookmarkedC} navigation={this.props.navigation} />
                    <BookMark_Item title='Bourses' list={this.props.bookmarkedB} navigation={this.props.navigation} />
                    <BookMark_Item title='Evenements' list={this.props.bookmarkedE} navigation={this.props.navigation} />
                </View>
            </Container >
        )
    }
}
const mapStatetoProps = state => {
    return {
        bookmarkedC: state.announcements.bookmarkedC,
        bookmarkedB: state.announcements.bookmarkedB,
        bookmarkedE: state.announcements.bookmarkedE
    }
}

export default connect(mapStatetoProps)(BookMark_Page)