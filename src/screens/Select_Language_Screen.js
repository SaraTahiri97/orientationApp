import React, { Component } from 'react'
import { View, FlatList, Text } from 'react-native'
import { Container, Select_Language } from '../components/elements'
import { connect } from 'react-redux';
import {
    selectLanguage
} from '../Store/actions/index';

class Select_Language_Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lan: this.props.languages

        };
    }
    componentDidMount = () => {
        let list =this.state.lan
        list.map(elm => {
            if (elm.language === this.props.langue) {
                elm.isSelected= true 
            }  
            else elm.isSelected= false
        });
       
        this.setState({lan:list})
    }
    onSelect=(name, isSelected)=>{
        this.props.selectLanguage(name,isSelected,this.props.permissionId).then(res=>{
            //alert(JSON.stringify(res.value.data.data))
            let list =this.state.lan
            list.map(elm => {
                if (elm.language === res.value.data.data) {
                    elm.isSelected= true      
                }  
                else elm.isSelected= false
            });
            this.setState({lan:list})
            //alert(JSON.stringify(list))
        }

        )
        

    }        
    render() {


            return (
                <Container>
                    <View style={{ flex: 1, width: '100%' }} >
                        <FlatList
                            data={this.props.languages}
                            renderItem={({ item }) => {
                                return <Select_Language
                                    id={item.id}
                                    flag={item.flag}
                                    language={item.language}
                                    isSelected={item.isSelected}
                                    selectLanguage={this.onSelect} />
                            }}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item) => item.id.toString()}
                        />
                    </View>
                </Container>
            );
        };
    }

const mapStatetoProps = state => {
    return {
        languages: state.permissions.languages,
        langue: state.permissions.langue,
        permissionId: state.permissions.permissionId,



    }
}

const mapDispatchToProps = dispatch => {
    return {
        selectLanguage: (id, isSelected,permissionId) => dispatch(selectLanguage(id, isSelected,permissionId)),
    };
}


export default connect(mapStatetoProps, mapDispatchToProps)(Select_Language_Screen);