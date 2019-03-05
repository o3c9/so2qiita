/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import { StyleSheet, Text, View, Button, NativeModules } from "react-native";

class ContainerApp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to So2Qiita on React Native!</Text>
      </View>
    );
  }
}

class Extension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      url: "",
      error: null,
    };
    this._onPress = this._onPress.bind(this);
  }

  componentDidMount() {
    try {
      const url = await NativeModules.ActionExtension.url();
      this.setState({ isLoading: false, url });
    } catch (error) {
      this.setState({ isLoading: false, error });
    }
  }

  _onPress() {
    NativeModules.ActionExtension.done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to So2QiitaExt on React Native!
        </Text>
        <Button onPress={this._onPress} title="Done" />
        {this.state.error && <Text style={styles.error}>{this.state.error}</Text>}
      </View>
    );
  }
}

export default class App extends Component {
  render() {
    const { isExtension } = this.props;
    if (isExtension) {
      return <Extension />;
    } else {
      return <ContainerApp />;
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
