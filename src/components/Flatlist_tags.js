import React, { useState, useRef } from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { Tag } from './elements'




const Flatlist_tags = ({ data, displayCorrespondedFeeds, navigation,selectedItem }) => {
    const mySlidetags = useRef();
    function onPressHandler(item) {
        displayCorrespondedFeeds(item.id, item.tag)
    };


    if (data && data.length) {
        return (
            <View style={{ width: '90%', position: 'relative', left: '10%', height: 'auto', flexGrow: 1, }} >
                <FlatList
                    data={data}
                    ref={mySlidetags}
                    keyExtractor={(item, index) => 'key' + index}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return <Tag tag={item.tag} 
                            onPressHandler={onPressHandler} item={item}
                            bar={selectedItem === item.id ? styles.selectedBar : undefined}
                            text={selectedItem === item.id ? styles.selectedText : styles.UnselectedText}

                        />
                    }}
                />
            </View>
        )
    }

    console.log('Please provide tags');
    return null;
}


const styles = StyleSheet.create({
    selectedBar: {
        backgroundColor: 'rgb(131, 212, 117)',
        height: 4,
        width: 30,
        borderRadius: 2.5,
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        top: 30,
        left:2
    },
    selectedText: {
        color: 'black',
        fontSize: 16,
        //fontWeight: 'bold',
        fontFamily: 'Product Sans bold',
    },

    UnselectedText:
    {
        color: '#DADADA',
        fontSize: 16,
        //fontWeight: 'bold',
        fontFamily: 'Product Sans bold'
    }
})

export default Flatlist_tags