import React from 'react';
import { Animated, Text, View } from 'react-native';
export default class rotateInView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rotateAnim: new Animated.Value(transform([{ rotateX: '0deg' }, { translateX: 400}, { rotateX: '0deg' }])),

    }
  }

  
  

  componentDidMount() {
    Animated.timing(                  // Animate over time
      this.state.rotateAnim,            // The animated value to drive
      {
        toValue: transform([{ rotateX: '360deg' }, { translateX: 400}, { rotateX: '-360deg' }]), // Change to the new value
        duration: 10000,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { rotateAnim } = this.state.rotateAnim;

    return (
      <Animated.View                 // Special Animated View
        style={{
          ...this.props.style,
          transform: rotateAnim,         
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}