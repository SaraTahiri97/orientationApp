import React from 'react'
import {
    SafeAreaView,
    Dimensions,
    StyleSheet,
    View,
    TextInput,
    Text,
    Image,
    TouchableHighlight,
    ScrollView,
    TouchableOpacity,
    Keyboard,
} from 'react-native'

import { Ionicons as Icon } from '@expo/vector-icons';
import { connect } from 'react-redux';
import {
    getAllOrganisationsANDCountries,
    getSearchedAnouncements
} from '../Store/actions/index';

// Import react-native-reanimated
// from "https://github.com/software-mansion/react-native-reanimated"
import Animated, { Easing } from 'react-native-reanimated'
const { Value, timing } = Animated

// Calculate window size
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

// Declare component 
class FBSearchBar extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            isFocused: false,
            keyword: '',
            UnResetSearch: false
        }
        this.inputRef = React.createRef()
        this._list = [];
        this._input_box_translate_x = new Value(width)
        this._input_box_translate_x_search = new Value(0)
        this._back_button_opacity = new Value(0)
        this._back_button_opacity_search = new Value(1)
        this._content_translate_y = new Value(height)
        this._content_height = new Value(0)
        this._content_opacity = new Value(0)

    }

    _onFocus = () => {
        this.setState({ isFocused: true })
        const input_box_translate_x_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }
        const content_translate_y_config = {
            duration: 0.1,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 1,
            easing: Easing.inOut(Easing.ease)
        }
        const content_height_config = {
            duration: 0.1,
            toValue: height,
            easing: Easing.inOut(Easing.ease)
        }
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_height, content_height_config).start()
        timing(this._content_opacity, content_opacity_config).start()
        this.inputRef.current.focus()

    }

    _onBlur = () => {

        this.setState({ isFocused: false })
        const input_box_translate_x_config = {
            duration: 200,
            toValue: width,
            easing: Easing.inOut(Easing.ease)
        }
        const back_button_opacity_config = {
            duration: 50,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const content_translate_y_config = {
            duration: 1,
            toValue: height,
            easing: Easing.inOut(Easing.ease)
        }
        const content_opacity_config = {
            duration: 200,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        const content_height_config = {
            duration: 0.1,
            toValue: 0,
            easing: Easing.inOut(Easing.ease)
        }
        timing(this._input_box_translate_x, input_box_translate_x_config).start()
        timing(this._back_button_opacity, back_button_opacity_config).start()
        timing(this._content_translate_y, content_translate_y_config).start()
        timing(this._content_height, content_height_config).start()
        timing(this._content_opacity, content_opacity_config).start()
        this.inputRef.current.blur();

    }

    _onDelete = () => {
        this.setState({ keyword: '' })
    }
    _Blur_GoBack = () => {

        this.props.navigation.goBack()
    }
    _onChange = (value) => {
        this._list = this.props.orgsAndCountries.filter(i => {
            return i.name.toLowerCase().includes(value.toLowerCase())
        });
        this.setState({ keyword: value })
    }

    _hundleSearch = (keyword) => {
        if (keyword != '') {
            this.props.dispatch(getSearchedAnouncements(keyword)).then(res => {
                console.log(JSON.stringify(res))
            })
            this.props.navigation.navigate("resultPage")
            this._onBlur()
        }
    }

    componentDidMount = () => {
        this.props.dispatch(getAllOrganisationsANDCountries()).then(res => {
            this._list = this.props.orgsAndCountries;
        })

    }

    render() {

        return (
            <>
                <SafeAreaView style={styles.header_safe_area}>
                    <View style={styles.header}>

                        <View style={styles.header_inner}>
                            <TouchableOpacity style={styles.Menu_view} onPress={() => { this.props.navigation.openDrawer() }}>
                                <View style={{ backgroundColor: 'black', height: 2, width: 25, margin: 2, }}></View>
                                <View style={{ backgroundColor: 'black', height: 2, width: 15, margin: 2, }}></View>
                                <View style={{ backgroundColor: 'black', height: 2, width: 20, margin: 2, }}></View>
                            </TouchableOpacity>

                            <Text style={styles.Default_Title}>Tawjeeh<Text style={{ fontSize: 36, color: '#08AA41' }}>.</Text></Text>

                            <TouchableHighlight
                                activeOpacity={1}
                                underlayColor={"#ccd0d5"}
                                onPress={this._onFocus}
                                style={styles.search_icon_box}

                            >
                                <Icon name="search-outline" size={22} color="#000000" />
                            </TouchableHighlight>
                            <Animated.View
                                style={[styles.input_box, {
                                    transform: this.props.isSearchPage ?
                                        [{ translateX: this._input_box_translate_x_search }]
                                        : [{ translateX: this._input_box_translate_x }]
                                }]}
                            >
                                <Animated.View style={{
                                    opacity: this.props.isSearchPage ?

                                        this._back_button_opacity_search

                                        : this._back_button_opacity
                                }}>
                                    <TouchableHighlight
                                        activeOpacity={1}
                                        underlayColor={"#ccd0d5"}
                                        onPress={this.props.isSearchPage ? this._Blur_GoBack : this._onBlur}
                                        style={styles.back_icon_box}
                                    >
                                        <Icon name="chevron-back" size={22} color="#000000" />
                                    </TouchableHighlight >

                                </Animated.View>

                                <TextInput
                                    ref={this.inputRef}
                                    placeholder="Search Tawjeeh"
                                    clearButtonMode="always"
                                    onFocus={this._onFocus}
                                    value={this.state.keyword}
                                    onChangeText={(value) => this._onChange(value)}
                                    style={styles.input}
                                    returnKeyType="search"
                                    onSubmitEditing={() => this._hundleSearch(this.state.keyword)}
                                />
                                {this.state.keyword !== '' ?
                                    <TouchableHighlight
                                        activeOpacity={1}
                                        onPress={this._onDelete}
                                        style={{ position: 'absolute', width: 20, height: 20, right: 10, }}>
                                        <Icon name='close-circle' size={20} color="#696969" />
                                    </TouchableHighlight>
                                    : null}

                            </Animated.View>
                        </View>
                    </View>
                </SafeAreaView>

                <Animated.View style={[styles.content, { opacity: this._content_opacity, height: this._content_height, transform: [{ translateY: this._content_translate_y }] }]}>
                    <SafeAreaView style={styles.content_safe_area}>
                        <View style={styles.content_inner}>
                            <View style={styles.separator} />
                            {
                                this.state.keyword === ''
                                    ?
                                    <View style={styles.image_placeholder_container}>
                                        <Image
                                            source={require('../components/images/search.jpg')}
                                            style={styles.image_placeholder}
                                        />
                                        <Text style={styles.image_placeholder_text}>
                                        Saisissez quelques mots pour rechercher sur Tawjeeh
                                        </Text>

                                    </View>
                                    : this._list.length == 0 ?
                                        <TouchableOpacity style={[styles.search_item]} onPress={() => this._hundleSearch(this.state.keyword)}  >
                                            <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                                            <Text style={{color:'#0041C2'}}> voir les resultats de  : {this.state.keyword}</Text>
                                        </TouchableOpacity>

                                        :
                                        <ScrollView>
                                            {this._list.map(item =>
                                                <TouchableOpacity style={[styles.search_item]} onPress={() => this._hundleSearch(item.name)}  >
                                                    <Icon style={styles.item_icon} name="search" size={16} color="#cccccc" />
                                                    <Text>{item.name}</Text>
                                                </TouchableOpacity>
                                            )}
                                        </ScrollView>


                            }
                        </View>
                    </SafeAreaView>
                </Animated.View>
            </>
        )
    }
}

const mapStatetoProps = state => {
    return {
        orgsAndCountries: state.organisations_interests.orgsAndCountries,


    }
}

export default connect(mapStatetoProps)(FBSearchBar)

const styles = StyleSheet.create({
    header_safe_area: {
        zIndex: 1000,
        width: width,
        top: '4%'
    },
    header: {
        height: 50,
        paddingHorizontal: 16,
    },
    header_inner: {
        flex: 1,
        overflow: 'hidden',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'relative'
    },
    search_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    Default_Title: {
        //styleName: Header/02;
        fontFamily: 'Product Sans bold',
        fontSize: 24,
        fontStyle: 'normal',
        //fontWeight: "700",
        lineHeight: 27,
        letterSpacing: 1,
        textAlign: 'center',
    },
    Menu_view: {

        height: "auto",
        position: 'relative',
        left: '40%',
    },
    input_box: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'white',
        width: width - 32,

    },
    back_icon_box: {
        width: 40,
        height: 40,
        borderRadius: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
    },
    input: {
        flex: 1,
        height: 40,
        backgroundColor: '#e4e6eb',
        borderRadius: 16,
        paddingHorizontal: 16,
        fontSize: 15
    },
    content: {
        width: width,
        position: 'relative',
        left: 0,
        bottom: 0,
        zIndex: 999,
    },
    content_safe_area: {
        flex: 1,
        backgroundColor: 'white',
    },
    content_inner: {
        flex: 1,
        paddingTop: 50
    },
    separator: {
        marginTop: 1,
        height: 1,
        backgroundColor: '#e6e4eb'
    },
    image_placeholder_container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: '-50%',
    },
    image_placeholder: {
        width: 150,
        height: 113,
        alignSelf: 'center',
    },
    image_placeholder_text: {
        fontFamily: 'Product Sans',
        textAlign: 'center',
        color: 'gray',
        marginTop: 5,
    },
    search_item: {
        zIndex: 2,
        flexDirection: 'row',
        height: 40,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e6e4eb',
        marginLeft: 16,
    },
    item_icon: {
        marginRight: 15
    }
})