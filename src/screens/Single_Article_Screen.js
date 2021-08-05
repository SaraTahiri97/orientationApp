import React, { Component } from 'react'
import { Container, News_Item } from '../components/elements'
import HTMLView from 'react-native-htmlview';
import { View, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import {
  getAnnouncementById
} from '../Store/actions/index';


class Single_Article_Screen extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }


  componentDidMount = () => {
    let idItem = this.props.route.params;
    this.props.dispatch(getAnnouncementById(idItem))
    //  alert('HEARTBREAKER :'+ JSON.stringify(this.props.Announcement))
  }
  render() {
    return (

      <Container>
        < ScrollView style={{ flex: 1, width: '100%', backgroundColor: 'while'}}>
          {this.props.isLoading ?
            <View style={{ height: "100%", width: "100%", justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color="light-green" />
            </View>

            :
            this.props.Announcement.map((el) => {
              return (
                <>
                    <News_Item image={el.image}
                      Title={el.title}
                      Subtitle={'Dernier délai : ' + el.dateFinAnnance}
                      sublink={el.niveauEtude}
                      key = {el.id}
                      bookDetail='1'
                    />
                  
                  <View style={{ width: '80%', marginHorizontal: '10%', position: 'relative' }}>
                    <HTMLView
                      value={el.details}
                      stylesheet={styles}
                    />
                  </View>
                </>)
            }
            )
          }

        </ ScrollView>
      </Container>

    )
  }
}
const mapStatetoProps = state => {
  return {
    Announcement: state.announcements.Announcement,
    isLoading: state.announcements.isLoading,


  }
}

export default connect(mapStatetoProps)(Single_Article_Screen);
const styles = StyleSheet.create({
  p: {
    fontFamily: 'Product Sans',
  },
  b:{
    fontFamily: 'Product Sans bold',
  },
  h4:{
    fontFamily: 'Product Sans',
    fontSize:17
  },
  a:{
    fontFamily: 'Product Sans',
  }

});