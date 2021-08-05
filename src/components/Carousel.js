import React, { useState, useEffect, useRef } from 'react'
import { View, Text,StyleSheet, Dimensions, FlatList, Animated } from 'react-native'
import { News_Item } from './elements'
import { LinearGradient } from 'expo-linear-gradient';



const { width, height } = Dimensions.get('window');

function infiniteScroll(dataList, mySlide) {
    const numberOfData = dataList.length
    let scrollValue = 0, scrolled = 0

    setInterval(function () {
        scrolled++
        if (scrolled < numberOfData)
            scrollValue = scrollValue + width
        else {
            scrollValue = 0
            scrolled = 0
        }
        if (mySlide.current) {
            mySlide.current.scrollToOffset({
                animated: true,
                offset: scrollValue
            });
        }

    }, 3000)
}

const Carousel = ({ data, navigation, handleBookmark }) => {
    const mySlide = useRef();
    const scrollX = new Animated.Value(0);
    let position = Animated.divide(scrollX, width);
    const [dataList, setDataList] = useState(data);

    useEffect(() => {
        setDataList(data);
       infiniteScroll(dataList, mySlide);
    })

    if (data && data.length) {
        return (
            <View style={{ position: 'relative', top: '2%', width: width,}} >
                <View style={[styles.View, { right: '95%', }]}>
                    <LinearGradient
                        colors={['rgba(0,0,0,0.8)', 'transparent']}
                        style={styles.View}
                    />
                </View>

                <FlatList
                    data={data}
                    ref={mySlide}
                    keyExtractor={(index) => 'key' + index}
                    horizontal
                    pagingEnabled
                    scrollEnabled
                    snapToAlignment="start"
                    scrollEventThrottle={16}
                    decelerationRate={"fast"}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => {
                        let sublink='';
                        if (item.idType ==1) sublink='Concours'
                        else if (item.idType ==2) sublink='Bourse'
                        else sublink='Evenement'
                        return <News_Item image={item.image}
                            Title={item.title}
                            Subtitle={item.estimated_time}
                            sublink={sublink}
                            item={item.id}
                            navigation={navigation}
                            bookmarked={item.bookmarked}
                            handleBookmark ={handleBookmark}
                        />
                    }}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        /* { useNativeDriver: false } */
                    )}
                />
                <View style={styles.dotView}>
                    {data.map((_, i) => {
                        let backgroundColor = position.interpolate({
                            inputRange: [i - 1, i, i + 1],
                            outputRange: ['#F3F2F2', 'black', '#F3F2F2'],
                            extrapolate: 'clamp',

                        })

                        return (
                            <Animated.View
                                key={i}
                                style={{ backgroundColor, height: 5, width: 5, margin: 8, borderRadius: 2.5 }}
                            >
                            </Animated.View>
                        )
                    })}

                </View>

                <View style={[styles.View, { left: '95%' }]}>
                    <LinearGradient
                        colors={[' rgba(0,0, 0, 0.8)', 'transparent']}
                        style={styles.View}
                    />
                </View>
            </View>
        )
    }

    console.log('Please provide Images');
    return null;
}

const styles = StyleSheet.create({
    dotView: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        top: height/4.5,
        left: '40%',
    },
    View: {
        width: 311,
        height: height/4,
        borderRadius: 20,
        opacity: 0.5,
        position: 'absolute',
        elevation: 5,
        backgroundColor: 'white'
    }
})


export default Carousel