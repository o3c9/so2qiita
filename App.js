/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  NativeModules,
  SafeAreaView
} from "react-native";
import NavigationBar from "react-native-navbar";
import { WebView } from "react-native-webview";
import StackOverflow from "./StackOverflow";

class ContainerApp extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.welcome}>Welcome to So2Qiita on React Native!</Text>
      </SafeAreaView>
    );
  }
}

class Extension extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      uri: "",
      error: null
    };
  }

  async componentDidMount() {
    try {
      const url = await NativeModules.ActionExtension.url();
      const tags = await new StackOverflow(url).getTags();
      const query = encodeURIComponent(tags.map(t => `tag:${t}`).join(" "));
      const uri = `https://qiita.com/search?utf8=%E2%9C%93&q=${query}`;
      this.setState({ isLoading: false, uri });
    } catch (error) {
      this.setState({ isLoading: false, error });
    }
  }

  _onPress() {
    NativeModules.ActionExtension.done();
  }

  render() {
    const { isLoading, uri, error } = this.state;

    if (isLoading) {
      return (
        <SafeAreaView style={styles.container}>
          <ActivityIndicator size="large" color="#0000ff" />
        </SafeAreaView>
      );
    } else if (uri) {
      return (
        <SafeAreaView style={styles.extension}>
          <NavigationBar
            title={{ title: "So2QiitaExt" }}
            leftButton={{ title: "Done", handler: this._onPress }}
          />
          <WebView style={styles.webview} source={{ uri }} />
        </SafeAreaView>
      );
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <Text style={styles.error}>{error}</Text>
        </SafeAreaView>
      );
    }
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
  extension: {
    flex: 1,
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
  },
  error: {
    color: "red",
    marginBottom: 5
  },
  webview: {
    marginTop: 5
  }
});
