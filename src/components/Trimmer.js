import React from "react";
import {
  View,
  Animated,
  Dimensions,
  Image,
  PanResponder,
} from 'react-native';
const width = Dimensions.get('window').width;
const trimmerHeight =  (width/10);
export default class Camera extends React.Component {
  constructor(props) {
    super(props);
    const position = new Animated.Value(-trimmerHeight/2)
    const position2 = new Animated.Value(width - (trimmerHeight/2 + 40))
    const panResponder = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: (event, gesture) => {
           console.log('asd');
            var newValue = this.state.newX + gesture.dx;
            if(newValue > (-trimmerHeight/2) && newValue < this.state.position2._value - 50) {
              position.setValue(newValue);
              this.setState({dx: gesture.dx});
            }
         },
         onPanResponderRelease: () => {
            this.setState({newX: this.state.newX + this.state.dx})
            var posa = trimmerHeight/2 + this.state.position._value;
            console.log(posa / 320);
         }
      });
    const panResponder2 = PanResponder.create({
         onStartShouldSetPanResponder: () => true,
         onPanResponderMove: (event, gesture) => {
            var newValue = this.state.newX2 + gesture.dx;
            if(newValue > 0 && newValue < (width - (trimmerHeight/2 + 40)) && newValue > this.state.position._value + 50) {
              position2.setValue(newValue);
              this.setState({dx2: gesture.dx});
            }
         },
         onPanResponderRelease: () => {
            this.setState({newX2: this.state.newX2 + this.state.dx2})
            var posb = trimmerHeight/2 + this.state.position2._value;
            console.log(posb / 320);
         }
      });
    this.state = {
      newX: 0,
      newX2: width - 64,
      dx:0,
      dx2:0,
      teste: [1,2,3,4,5,6,7,8,9,0],
      position,
      position2,
      panResponder,
      panResponder2,
    }
  }
  render() {
    var cPos = trimmerHeight/2 + this.state.position._value;
    var cPos2 = trimmerHeight/2 + this.state.position2._value;
    return (
      <View style={[this.props.style, {paddingLeft: 20, paddingRight: 20, paddingTop: 2}]}>
        <View style={{height: trimmerHeight - 2,
                      flexDirection: 'row',
                      borderColor: 'red',
                      width: width}}>
            { this.props.teste.map((value, index) => {
              return <Image  style={{width: (width - 40)/10,
                                    height: (width - 40)/10,
                                    backgroundColor: 'green'}}
                             key={index}
                             source={{uri: value}}/>
            })}
            <Animated.View style={{position: 'absolute',
                                   width: cPos2 - cPos,
                                   left: cPos,
                                   height: trimmerHeight,
                                   top: -2,
                                   borderWidth: 2, borderColor: 'white'}}>
            </Animated.View>
            <Animated.View style={{width: trimmerHeight - 2,
                                   height: trimmerHeight-2,
                                   position: 'absolute',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   left: this.state.position}}
                       {...this.state.panResponder.panHandlers}>
              <View style={{backgroundColor: 'white',
                            borderRadius: 15,
                            width: 15, height:15}}/>
            </Animated.View>
            <Animated.View style={{width: trimmerHeight - 2,
                                   height: trimmerHeight - 2 ,
                                   position: 'absolute',
                                   justifyContent: 'center',
                                   alignItems: 'center',
                                   left: this.state.position2}}
                       {...this.state.panResponder2.panHandlers}>
              <View style={{backgroundColor: 'white',
                            borderRadius: 15,
                            width: 15, height:15}}/>
            </Animated.View>
        </View>
      </View>
    );
  }
}