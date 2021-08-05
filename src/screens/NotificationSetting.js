import React, { Component } from 'react'
import { View } from 'react-native'
import { Setting_Notification, Container } from '../components/elements'

import { connect } from 'react-redux';
import {
  checkPermission,
  getAllPermissionsByUserId,
  updatePermissions
} from '../Store/actions/index';
import AsyncStorage from '@react-native-community/async-storage'


class NotificationSetting extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  componentDidMount = () => {
    AsyncStorage.getItem('id').then(data => {
      this.props.getAllPermissionsByUserId(data).then(
        console.log('notificationSittings : ' + JSON.stringify(this.props.notificationSittings))
      )
    })

  }

  render() {


    return (
      <Container>
        <View style={{ flex: 1, width: '100%', alignItems: 'center', marginTop: '5%' }}>
          {this.props.notificationSittings.map((permission) => {
            return (
              <Setting_Notification permission={permission} 
              checkPermission={this.props.checkPermission} 
              updatePermissions={this.props.updatePermissions} 
              permissions={this.props.permission} />
            )
          })}


        </View>
      </Container>
    );
  };
}
const mapStatetoProps = state => {
  return {
    permission: state.permissions.permissions,
    notificationSittings: state.permissions.permissions.notificationSittings


  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkPermission: (id, name, isChecked) => dispatch(checkPermission(id, name, isChecked)),
    getAllPermissionsByUserId: (data) => dispatch(getAllPermissionsByUserId(data)),
    updatePermissions: (permissionId,notificationSittings) => dispatch(updatePermissions(permissionId,notificationSittings))
  };
}


export default connect(mapStatetoProps, mapDispatchToProps)(NotificationSetting);