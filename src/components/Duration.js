import React from "react";
import {
  View,
  Dimensions,
} from 'react-native';

const width = Dimensions.get('window').width;

export default class Duration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  render() {

    var pointerPos = (this.props.duration/this.props.total)*(width-20);

    return (
      <View style={[this.props.style, {width: '100%',
                                       marginTop: 10,
                                       paddingVertical: 10,
                                       height: 30, paddingHorizontal: 10}]}>
        <View style={{flex: 1}}>
          <View style={{backgroundColor: 'grey',
                        opacity: 0.4, flex: 1}}></View>
          <View style={{height: 10, width: pointerPos,
                      borderRightWidth: 5,
                      borderRightColor: 'white',
                      position: 'absolute', backgroundColor: '#f9d809'}}></View>
          <View style={{height: 10, width: 2,
                      left: width*0.25,
                      opacity: 0.5,
                      position: 'absolute',
                      backgroundColor: this.props.duration > this.props.total*0.25 ? 'black' : 'grey'}}></View>        
        </View>
      </View>
    );
  }
}