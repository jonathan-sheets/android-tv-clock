/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform, ReactNative, BackHandler, Alert, TVEventHandler } from 'react-native';

const dayjs = require('dayjs');
dayjs().format();

const StatusBar = Platform.isTV ? View : ReactNative.StatusBar;

export default class App extends Component {

  date = dayjs();

  constructor(props) {
    super(props);
    this.state = {
      time: dayjs().format('h:mm:ss'),
      date: dayjs().format('MM-DD-YYYY'),
    };
  }

  _tvEventHandler;
  _enableTVEventHandler() {
    this._tvEventHandler = new TVEventHandler();
    this._tvEventHandler.enable(this, function (cmp, evt) {
      if (evt && evt.eventType === 'right') {
        cmp.setState({ board: cmp.state.board.move(2) });
      } else if (evt && evt.eventType === 'up') {
        cmp.setState({ board: cmp.state.board.move(1) });
      } else if (evt && evt.eventType === 'left') {
        cmp.setState({ board: cmp.state.board.move(0) });
      } else if (evt && evt.eventType === 'down') {
        cmp.setState({ board: cmp.state.board.move(3) });
      }
    });
  }

  _disableTVEventHandler() {
    if (this._tvEventHandler) {
      this._tvEventHandler.disable();
      delete this._tvEventHandler;
    }
  }

  componentDidMount() {
    this._enableTVEventHandler();
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
    setInterval(() => {
      this.setState({
        time: dayjs().format(' h:mm:ss '),
        date: dayjs().format('MM-DD-YYYY'),
      });
    }, 1000);
  }

  componentWillUnmount() {
    this._disableTVEventHandler();
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    Alert.alert(
      'Exit App',
      'Do you wish to exit?',
      [
        {text: 'No', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Yes', onPress: () => BackHandler.exitApp()},
      ],
      { cancelable: false });
      return true;
  }

  render() {
    return (
      <View style={styles.container}>
        {/* eslint-disable-next-line react-native/no-inline-styles */}
        <StatusBar style={{ backgroundColor: 'transparent' }} />
        <Text style={styles.timeText}>{this.state.time}</Text>
        <Text style={styles.dateText}>{this.state.date}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeText: {
    color: '#999999',
    fontSize: 150,
    textShadowColor: '#BF3B86',
    textShadowRadius: 15,
    textShadowOffset: {
      width: 6,
      height: 6,
    },
  },
  dateText: {
    color: '#BF3B86',
    fontSize: 30,
    textShadowColor: '#999999',
    textShadowRadius: 15,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
