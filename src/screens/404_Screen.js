import React from 'react'
import { View, Image, StyleSheet,Dimensions } from 'react-native'
import { Caption, Title } from 'react-native-paper'
import { Dynamic_Button, Container } from '../components/elements'
import RotateView from '../components/rotateInView'
import Emoji from 'react-native-emoji';
import { Svg, Circle } from 'react-native-svg';
const { width, height } = Dimensions.get('window');





const not_found_screen = ({ navigation }) => {
    const [lorenzPlotData, setslorenzPlotData] = React.useState([1,2])
    let bubbles = React.ReactNode = () => {
        var elements = [];
        for (let tuple of lorenzPlotData) {
            let color = tuple === lorenzPlotData.tail ? "red" : "black";
            // We need to normalize data 
            elements.push(<Circle key={tuple[0]} cx={tuple[1]} cy={tuple[2]} r="4" fill={color} fillOpacity="1" />);
        }
        return elements;
    }

return (
    <Container>
        <View style={styles.View}>
            <Image style={styles.image}
                    source={require('../components/images/NotFoundImage.png')} />
            {/*  <View style={{ alignContent: 'center', padding: 4, backgroundColor: 'green' }}>
                    <RotateView>
                        <Svg style={{ backgroundColor: 'yellow', alignContent: 'center', position: 'relative', paddingHorizontal: 4 }}
                            height="250"
                            width="250">

                            <Circle
                                cx="120"
                                cy="120"
                                r="120"
                                stroke="gray"
                                strokeWidth="2"
                                strokeDasharray="8,3"
                                strokeOpacity="2"
                                fillOpacity="0"
                            />
                            {
                                /// Bubules (little circles) goes here
                                bubbles()
                            }
                        </Svg>
                    </RotateView>
                </View> */}
            <Title style={styles.title}>
                Oops! You are lost <Emoji name=":cry:" style={{ fontSize: 20 }} />
            </Title>
            <Caption style={styles.caption}> The page you are looking for could not be found.</Caption>
            <View style={{
                        height: height / 10,
                        width: '83%',
                        marginTop: '13%',
                        borderRadius: 16,
                    }}>
            <Dynamic_Button title='Go back' onPress={() => navigation.goBack()} />
            </View>
        </View>

    </Container >
);

};
export default not_found_screen
const styles = StyleSheet.create({
    View: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        position: 'relative',
        width: 179,
        height: 173,
        marginBottom: '10%'
    },
    title: {
        fontFamily: 'Product Sans bold',
    },
    caption: {
        width: '58%',
        textAlign: 'center',
    }
})