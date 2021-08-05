import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'

const LoadingScreen = props => {

	useEffect(() => {
		AsyncStorage.getItem('token')
			.then(value => {
				if (value.length > 0) {
					props.navigation.navigate('screens');
				}
			})
			.catch(() => props.navigation.navigate('auth'))
	}, [])

	return(
		<View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
			<Text>Loading.....</Text>
		</View>
	)
}

export default LoadingScreen;