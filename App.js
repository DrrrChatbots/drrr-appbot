import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  webview = null;
  chatloc = "lounge"

  render() {
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{ uri: 'https://drrr.com' }}
        originWhitelist={['https://drrr.com', 'https://drrr.com/*']}
        style={{ marginTop: 20 }}
        onLoadEnd={this.handleLoadEnd}
        onMessage={this.handleMessage}
      />
    );
  }

  handleLoadEnd = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url.includes('lounge')) {
      this.chatloc = "lounge";
      this.webview.injectJavaScript(`
        alert("L ${nativeEvent.url}");
        true;
        `);
    }

    if (nativeEvent.url.includes('room')) {
      this.chatloc = "room";
      this.webview.injectJavaScript(`
        alert("R ${nativeEvent.url}");
        true;
      `);
      // window.ReactNativeWebView.postMessage
    }
  };

  handleMessage = (event) => {
    alert(event.nativeEvent.data);
  };

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
