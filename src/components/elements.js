import React, { Component, useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, FlatList, Dimensions, ActivityIndicator, SafeAreaView } from 'react-native';
import { Switch, Checkbox } from 'react-native-paper';
import { Ionicons as Icon } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import { ExpUrl } from '../config'
import { forEach } from 'lodash';



const { width, height } = Dimensions.get('window');

/****************** Container ****************/
export class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container} >
        {this.props.children}
      </SafeAreaView>
    );
  }
}
/****************** END Container ****************/

/********************* News_Item *******************/
export const News_Item = ({ navigation, image, Title, Subtitle, sublink, item, handleBookmark, bookmarked, bookDetail, }) => {
  let link = `${ExpUrl}/src/components/images/${image}`
  const onPress = () => {
    handleBookmark(item, bookmarked)
  }
  return (

    <TouchableOpacity style={navigation ? styles.Image_View : styles.Image_View1} onPress={navigation ? () => navigation.navigate('Single_Article_Screen', item) : null} disabled={navigation ? false : true}>
      <Image style={navigation ? styles.News_Item_Image : styles.News_Item_Image1} source={{ uri: link }} />
      {bookDetail ? null : <TouchableOpacity style={{ position: 'absolute', right: "3%", top: "3%" }} onPress={() => onPress()}>
        <Icon name={bookmarked == 0 ? "bookmark-outline" : "bookmark"} color='black' size={20} />
      </TouchableOpacity>}


      {navigation ?
        <Text style={styles.News_Item_Title}>{Title}</Text>
        :
        <Text style={[styles.News_Item_Title]}>{Title}</Text>
      }
      {
        navigation ?
          <View style={{ marginVertical: 6, }}>
            <Text style={styles.News_Item_Subtitle}> {Subtitle} |<Text style={styles.News_Item_sublink}> {sublink}</Text></Text>
          </View>

          :
          <View style={{ marginVertical: 6, height: 20 }}>
            <Text style={styles.News_Item_Subtitle1}>{Subtitle}  <Text style={{ color: 'black' }}>|</Text>
              <Text style={styles.News_Item_sublink}> {sublink}</Text>
            </Text>
          </View>
      }

    </TouchableOpacity>
  )

}

/******************************************************/

/********************* Feed_Item *******************/
export const Feed_Item = ({ navigation, Item_Image, Item_Title, Item_Subtitle, Item_sublink, id, isRecommened, handleBookmark, bookmarked, bookDetail }) => {

  let link = `${ExpUrl}/src/components/images/${Item_Image}`

  const onPress = () => {
    handleBookmark(id, bookmarked)
  }

  return (

    <>
      {isRecommened ?
        <View style={{ width: "95%", }}>
          <Text style={{ color: 'rgb(131, 212, 117)', }}>Rocommandé</Text>
        </View>
        : null}
      <View style={[styles.Feed_Item_View, isRecommened ? { borderLeftWidth: 5, borderLeftColor: '#F3FFE5' } :
        { backgroundColor: 'white' }]} onPress={() => navigation.navigate('Single_Article_Screen', id)}>

        <Image style={styles.Feed_Item_Image} source={{ uri: link }} />
        <TouchableOpacity style={styles.Feed_Item_Wrapper} onPress={() => navigation.navigate('Single_Article_Screen', id)}>
          <Text style={styles.Feed_Item_Title}
          >{Item_Title}</Text>



          <Text style={[styles.Feed_Item_Subtitle,]}>{Item_Subtitle} |
            <Text style={styles.Feed_Item_sublink}> {Item_sublink}</Text>
          </Text>
          {
            bookDetail ? null :
              <TouchableOpacity style={{ position: 'absolute', right: 0, bottom: -3 }} onPress={() => onPress()}>
                <Icon name={bookmarked == 0 ? "bookmark-outline" : "bookmark"} color='black' size={20} />
              </TouchableOpacity>
          }

        </TouchableOpacity>
      </View>

    </>
  )

}

/********************************************************************/

/********************* Feed_Flatlist*******************/
export class Feed_Flatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let sublink = ''
    this._finalData = []
    if (this.props.rec == false) {
      this.props.feed.forEach(el => {
        if (el.isRecommened == false)
          this._finalData.push(el)
      })
    }
    else this._finalData = this.props.feed


    return (

      <View style={{ position: 'relative', top: '1%', left: '10%', width: '85%' }}>
        <FlatList
          style={{ paddingBottom: 10 }}
          data={this._finalData}
          renderItem={({ item }) => {
            if (item.idType == 1) sublink = 'Concours'
            else if (item.idType == 2) sublink = 'Bourse'
            else sublink = 'Evenement'
            return <Feed_Item Item_Image={item.image}
              Item_Title={item.title}
              Item_Subtitle={item.estimated_time}
              Item_sublink={sublink}
              id={item.id}
              isRecommened={item.isRecommened}
              navigation={this.props.navigation}
              bookmarked={item.bookmarked}
              handleBookmark={this.props.handleBookmark}
              bookDetail={this.props.bookDetail}
            />
          }}
          contentContainerStyle={{ paddingBottom: 30 }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}

/********************************************************************/
/*************************Notification_Item*************************/
export const Notification_Item = ({ navigation, id, Notif_Image, Notif_Title, Notif_State, Notif_descreption, Notif_Time, idannouncement, hundleOnPress }) => {
  let link = `${ExpUrl}/src/components/images/${Notif_Image}`

  return (
    <TouchableOpacity style={styles.Notif_Item_View} onPress={() => {
      navigation.navigate('Single_Article_Screen', idannouncement)
      hundleOnPress(id)

    }
    } >
      <Image style={styles.Notif_Image} source={{ uri: link }} />
      <View style={{
        marginLeft: "5%", width: width / 1.4,
        flexWrap: 'wrap',
        alignItems: 'flex-start',

      }}>
        <Text style={[styles.Notif_Profil_Name, Notif_State == 1 ? { color: 'gray' } : { color: 'black' }]}>{Notif_Title}</Text>

        <Text style={styles.Notif_Element}> {Notif_descreption} </Text>
        <Text style={[styles.Notif_Element, { color: 'gray' }]}>{Notif_Time.substring(12, 16)}</Text>
      </View>
    </TouchableOpacity>
  )
}

/********************* Notification_Flatlist*******************/
export class Notification_Flatlist extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render() {

    return (

      <View>
        <View style={styles.notif_View}>
          <Text style={styles.notif_Time}>{this.props.time}</Text>
        </View>

        <FlatList
          style={{ paddingBottom: 10 }}
          data={this.props.notifications}
          renderItem={({ item }) => {
            return <Notification_Item
              id={item.id}
              Notif_Image={item.image}
              Notif_Title={item.title}
              Notif_State={item.isSeen}
              Notif_descreption={item.description}
              Notif_Time={item.created}
              idannouncement={item.idAnnouncement}
              navigation={this.props.navigation}
              hundleOnPress={this.props.hundleOnPress}

            />
          }}
          showsVerticalScrollIndicator={false}
        // keyExtractor={(item) => item.id.toString()}
        />
      </View>
    )
  }
}

/********************************************************************/
/*************************Input with Icon*************************/
export const Input_Icon = ({ input_text, onChangeText, type, islogout, logoutFullfiled, name }) => {

  const [isSecure, setIsSecure] = React.useState(true)
  const inputRefPass = React.useRef()
  let Type = ''
  name ? Type = name : Type = type

  if (islogout) {
    //  alert('hi ' + inputRefPass.current.clear())
    inputRefPass.current.clear();
    logoutFullfiled()
  }

  return (
    <View style={styles.Input_Container}>
      <TextInput
        style={styles.Input_text}
        placeholder={input_text}
        secureTextEntry={isSecure}
        clearTextOnFocus='true'
        placeholderTextColor="lightgray"
        autoCompleteType={type}
        onChangeText={text => onChangeText(Type, text)}
        ref={inputRefPass}
      />
      <TouchableOpacity style={styles.Input_icon} onPress={() => setIsSecure(!isSecure)}>
        <Icon name={isSecure ? 'eye' : 'eye-off'}
          size={20}
          color='lightgray' />
      </TouchableOpacity>
    </View>
  )
}

/*************************Input without Icon*************************/
export const Input = ({ input_text, onChangeText, type, value, tel }) => {
  const [textInput, setTextInput] = value ? useState(value) : useState()

  return (
    <View style={styles.Input_Container}>
      {tel ? <TextInput
        style={styles.Input_text}
        placeholder={input_text}
        clearTextOnFocus='true'
        placeholderTextColor="lightgray"
        autoCompleteType={type}
        value={textInput}
        onChangeText={text => { onChangeText(type, text), setTextInput(text) }}
        keyboardType='phone-pad'
      /> :
        <TextInput
          style={styles.Input_text}
          placeholder={input_text}
          clearTextOnFocus='true'
          placeholderTextColor="lightgray"
          autoCompleteType={type}
          value={textInput}
          onChangeText={text => { onChangeText(type, text), setTextInput(text) }}

        />}
    </View>


  )
}
/*************************Dynamic_Button*************************/
export const Dynamic_Button = ({ onPress, title, isLoading }) => {
  return (
    <TouchableOpacity style={styles.Button_Container} onPress={() => onPress()} >
      {isLoading ?
        <ActivityIndicator size="small" color="white" /> :
        <Text style={styles.Button_text}>{title}</Text>
      }
    </TouchableOpacity>
  )
}

/*************************PAGE_TITILE*************************/
export const Page_Title = ({ Page_Title, login }) => {

  return (
    <View style={styles.Page_Title_Container}>
      <Text style={styles.Page_Title}>{Page_Title}{login ? <Text style={{ fontSize: 36, color: '#08AA41' }}>.</Text> : undefined}
      </Text>
    </View>
  )
}

/*************************Setting_Item*************************/
export const Setting_Item = ({ navigation, text, screen, }) => {

  return (
    <View style={styles.Sitting_Item_Container}>

      <Text style={styles.Sitting_Item_text}>{text}</Text>

      <TouchableOpacity style={styles.Sitting_Item_icon} onPress={() => navigation.navigate(screen)}>
        <AntDesign name="right" size={16} color="lightgray" />
      </TouchableOpacity>
    </View>
  )

}
/*************************Setting_Item_With_Plus*************************/
export const Setting_Item_With_Plus = ({ navigation, text, screen, slectedLanguage, }) => {

  return (
    <View style={styles.Sitting_Item_Container}>

      <Text style={styles.Sitting_Item_text}>{text}</Text>

      <TouchableOpacity style={styles.Sitting_Plus_icon} onPress={() => navigation.navigate(screen)}>

        <Icon name='md-add-sharp'
          size={22}
          color='#08AA41' />
        <Text style={styles.Sitting_Plus_icon_Text}> {slectedLanguage} </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.Sitting_Item_icon} onPress={() => navigation.navigate(screen)}>
        <AntDesign name="right" size={16} color="lightgray" />
      </TouchableOpacity>
    </View>
  )
}
/************************Splash Container***********************/
export class Splash_Container extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.Splash_Container} >
        {this.props.children}
      </View>


    );
  }
}
/******************************************************************************/
/************************Splash Title***********************/
export class Splash_Title extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.Splash_Title_Container}>
        <Text style={styles.Splash_SubTitle}>{this.props.Splash_SubTitle}</Text>
        <Text style={styles.Splash_Title}>{this.props.Splash_Title}</Text>
      </View>


    );
  }
}
/*****************************SPLASH IMAGE and Text********************************/
export class Splash_Image_Text extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.Splash_Image_Container}>
        <Image style={styles.Splash_Image} source={this.props.Splash_Image} />
        <Text style={styles.Splash_Text}>{this.props.Splash_Text} </Text>
      </View>


    );
  }
}
/*****************************Tag item********************************/
export const Tag = ({ navigation, onPressHandler, item, text, bar, tag }) => {

  return (
    <TouchableOpacity style={styles.tag_View}
      onPress={() => onPressHandler(item)} >
      <Text style={text}  >{tag} </Text>
      <View style={bar}></View>
    </TouchableOpacity>
  );
}

/*************************Setting_Notification*************************/
export const Setting_Notification = ({ permission, checkPermission, updatePermissions, permissions }) => {
  const onToggleSwitch = () => {
    checkPermission(permission.id, permission.name, permission.isChecked)
    updatePermissions(permission.id, permissions)

  };
  return (
    <View style={styles.Sitting_Item_Container}>
      <Text style={{ fontFamily: 'Product Sans' }}>{permission.name}</Text>
      <Switch value={permission.isChecked} onValueChange={onToggleSwitch}
        color="#08AA41" />
    </View>
  )
}
/*************************Select_Language*************************/
export const Select_Language = ({ language, flag, isSelected, selectLanguage }) => {


  return (
    <TouchableOpacity style={styles.Sitting_Item_Container} onPress={() => selectLanguage(language, isSelected)}>
      <View style={{ flexDirection: 'row' }}>
        <Image style={{ width: 24, height: 24, borderRadius: 12 }} source={flag} />
        <Text style={{ marginLeft: 10 }}>{language}</Text>
      </View>
      {
        isSelected ?
          <Checkbox status='checked' color="#08AA41" style />
          : undefined}

    </TouchableOpacity>
  )
}


/*************************Profil_Item*************************/
export const Profil_Item = ({ navigation, text, screen, userData }) => {

  return (
    <View style={styles.Profile_Item_Container}>

      <Text style={styles.Profile_Item_text}>{text}</Text>

      <TouchableOpacity style={styles.Sitting_Item_icon} onPress={() => { userData ? navigation.navigate(screen, { data: userData }) : navigation.navigate(screen) }}>
        <AntDesign name="right" size={16} color="lightgray" />
      </TouchableOpacity>
    </View>
  )

}
/*************************Interest_Item*************************/
export const Interest_Item = ({ interests, onBtnClick }) => {

  return (

    interests.map((interest) => {

      return (
        <TouchableOpacity style={[{
          width: 'auto',
          height: 50,
          borderWidth: 0.5,
          borderRadius: 15,
          borderColor: '#999',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: '6%',
          marginRight: '3%',
          marginTop: '2%',

        },
        interest.ischosen ? { backgroundColor: '#08AA41' } : { backgroundColor: 'white' }

        ]}
          onPress={ /* alert(interest.name+'--'+interest.ischosen), */
            () => onBtnClick(interest.id, interest.name, interest.ischosen)}
        >
          <Text style={{ fontFamily: 'Product Sans', }}>{interest.name}</Text>
        </TouchableOpacity>
      )

    }

    )

  )

}
/****test */


export const BookMark_Item = ({ title, list, navigation }) => {
  let image1 = ''
  let image2 = ''
  let image3 = ''
  if (list.length >= 3) {
    image1 = list[0].image
    image2 = list[1].image
    image3 = list[2].image
  }
  else if (list.length == 2) {
    image1 = list[0].image
    image2 = list[1].image
  }
  else if (list.length == 1) {
    image1 = list[0].image
  }

  return (
    <View style={{ width: '40%', height: '23%', borderWidth: 1, borderColor: '#eeeee4', marginLeft: '7%', marginVertical: '5%', borderRadius: 10, }}>
      <View style={{ width: '100%', height: '80%', flexDirection: 'row', backgroundColor: '#eeeee4', borderRadius: 10, }}>
        <View style={{ width: '60%', height: '100%', }}>
          {image1 !== '' ? <Image style={{ width: '100%', height: '100%', borderRadius: 10, }} source={{ uri: `${ExpUrl}/src/components/images/${image1}` }} /> : null}

        </View>
        <View style={{ width: '40%', height: '100%' }}>
          <View style={{ width: '100%', height: '50%', }}>
            {image2 != '' ? <Image style={{ width: '100%', height: '100%', borderRadius: 10, }} source={{ uri: `${ExpUrl}/src/components/images/${image2}` }} /> : null}

          </View>
          <View style={{ width: '100%', height: '50%', }}>
            {image3 != '' ? <Image style={{ width: '100%', height: '100%', borderRadius: 10, }} source={{ uri: `${ExpUrl}/src/components/images/${image3}` }} /> : null}

          </View>

        </View>
      </View>
      <TouchableOpacity style={{ alignItems: 'center', marginVertical: '5%', }}>
        <Text style={{
          fontFamily: 'Product Sans',
          fontWeight: "600",
          fontSize: 16,
          lineHeight: 18,
          letterSpacing: 1.5,
        }}
          onPress={() => navigation.navigate('BookMark_Details', { list, title })}
        >{title}</Text>
      </TouchableOpacity>
    </View>

  )

}

/********************STYLES*************************/
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: '100%',
    height: '100%',

  },

  //*******************News_Item****************** */
  Image_View1: {
    width: width - 80,
    height: 'auto',
    position: 'relative',
    marginHorizontal: '10%',
    marginTop: '5%'
  },
  Image_View: {
    width: width - 80,
    height: 'auto',
    marginHorizontal: 40,
    position: 'relative',
  },
  News_Item_Image: {
    width: "100%",
    height: height / 4,
    borderRadius: 20,
  },
  News_Item_Image1: {
    width: "100%",
    height: 250,
    borderRadius: 20,
  },
  News_Item_Title: {
    height: 'auto',
    width: '100%',
    fontSize: 18,
    fontFamily: "Product Sans bold",
    //fontWeight: "bold",
    lineHeight: 24,
    marginTop: '3%',

  },
  News_Item_Subtitle: {
    fontSize: 12,
    fontFamily: "Product Sans",
    marginTop: '1%',
    position: 'relative'
  },
  News_Item_Subtitle1: {
    fontSize: 12,
    fontFamily: "Product Sans",
    marginTop: '1%',
    position: 'relative',
    color: 'red'
  },
  News_Item_sublink: {
    color: "rgb(131, 212, 117)",

  },
  /******************Feed_Item******************/
  Feed_Item_View: {
    height: 'auto',
    width: "97%",
    paddingBottom: 7,
    flexDirection: 'row',
    position: 'relative',
    left: '2%',
    alignItems: 'center',
  },
  Feed_Item_Image: {
    height: height / 9.5,
    width: width / 3.5,
    borderRadius: 24,
    marginVertical: "2%",

  },
  Feed_Item_Wrapper: {
    marginHorizontal: "3%",
    marginVertical: "5%",
    width: '60%',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  Feed_Item_Title: {
    fontSize: 16,
    fontFamily: "Product Sans bold",
  },
  Feed_Item_Subtitle: {
    fontFamily: 'Product Sans',
    fontSize: 13,
    position: 'relative',
    top: "10%",
  },
  Feed_Item_sublink: {
    color: "rgb(131, 212, 117)"
  },
  /******************Notification item style**********************/
  Notif_Item_View: {
    height: 'auto',
    width: "97%",
    marginTop: 7,
    flexDirection: 'row',
    position: 'relative',
    left: 32,
    alignItems: 'center',

  },
  Notif_Image: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginLeft: "1%",
    backgroundColor: 'gray'
    /* float: 'left', */
  },
  Notif_Profil_Name: {
    fontSize: 16,
    fontFamily: 'Product Sans bold',

  },
  Notif_Element: {
    fontSize: 13,
    fontFamily: 'Product Sans',
    fontWeight: "100",
  },
  Notif_Time: {
    fontSize: 13,
    marginTop: "1%",
    marginLeft: "5%",
    fontFamily: 'Product Sans',
    color: "rgb(177, 172, 172)",
    fontWeight: "100",

  },
  /*************************SPLASH *******************************/
  Splash_Container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgb(232, 232, 232)',
    width: '100%',
    height: '100%',

  },
  Splash_Title_Container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
    top: '7%',
    width: '70%',
    height: 114
  },
  Splash_SubTitle: {
    fontSize: 20,
    fontFamily: 'Product Sans',
    color: "rgb(14, 204, 73)",
  },
  Splash_Title: {
    fontSize: 50,
    fontFamily: 'Product Sans bold',
    color: "rgb(14, 204, 73)",
/*         whiteSpace: 'inherit',
 */      },
  Splash_Image_Container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    height: '70%',
    position: 'relative',
    top: '20%'
  },
  Splash_Image: {
    height: '70%',
    width: '100%',
  },
  Splash_Text: {
    fontSize: 15,
    height: '30%',
    width: '67%',
    fontFamily: 'Product Sans',
    textAlign: 'center',
    color: 'gray'
  },

  /******************INPUTs (w/o icon)**********************/
  Input_Container: {
    height: '9%',
    width: '83%',
    marginTop: '5%',
    /* display : 'block', */
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    /* padding :20,24,20,24, */

  },
  Input_text: {
    height: '100%',
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    /* float: 'left', */
    paddingLeft: 20,
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
  /******************Dynamic_Button ***************/
  Button_Container: {
    height: '100%',
    width: '100%',
    borderRadius: 16,
    backgroundColor: "#08AA41",
    justifyContent: 'center',
    alignItems: 'center'
  },
  Button_text: {
    color: 'white',
    fontFamily: 'Product Sans'
  },
  /***************Page_Title********************* */
  Page_Title_Container: {
    width: "90%",
    height: 'auto',
    position: 'relative',
    top: '5%',
    marginBottom: '10%',
  },
  Page_Title: {
    fontFamily: 'Product Sans bold',
    fontSize: 36,
    lineHeight: 43.67,
    letterSpacing: 1,

  },
  /***********Profile_Item************/
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
    color: 'black',
    position: 'absolute',
    marginLeft: '5%',
    fontFamily: 'Product Sans',
    fontSize: 20,
    fontWeight: '100'

  },

  /*************Sitting_Item************/
  Sitting_Item_Container: {
    height: 25,
    width: "90%",
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '3%',
    marginHorizontal: "6%",
  },
  Sitting_Item_text: {
    color: 'black',
    position: 'absolute',
    fontFamily: 'Product Sans',


  },
  Sitting_Item_icon: {
    width: '30%',
    position: 'absolute',
    left: '91%'
  },
  Sitting_Plus_icon: {
    width: '30%',
    fontSize: 12,
    position: 'absolute',
    right: '5%',
  },
  Sitting_Plus_icon_Text: {
    fontFamily: 'Product Sans',
    position: 'absolute',
    right: '25%',


  },
  Switch: {
    height: 25,
    width: "80%",
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: '3%',
    marginHorizontal: "10%",
    backgroundColor: 'pink'

  },
  /******************FlatList_Notifs ***************/
  notif_View: {
    position: 'relative',
    width: '45%',
    height: 36,
    left: 32,
    justifyContent: 'center',
  },
  notif_Time: {
    fontFamily: 'Product Sans bold',
    fontStyle: 'normal',
    //fontWeight: 'bold',
    fontSize: 18,

  },
  /****************Tag View **************** */
  tag_View: {
    flex: 1,
    flexDirection: 'column',
    width: "auto",
    height: 37,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,

  }

})