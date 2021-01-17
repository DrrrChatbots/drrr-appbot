import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class App extends React.Component {
  webview = null;

  render() {
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{ uri: 'https://drrr.com' }}
        style={{ marginTop: 20 }}
        onNavigationStateChange={this.handleWebViewNavigationStateChange}
      />
    );
  }

  handleWebViewNavigationStateChange = (newNavState) => {
    // newNavState looks something like this:
    // {
    //   url?: string;
    //   title?: string;
    //   loading?: boolean;
    //   canGoBack?: boolean;
    //   canGoForward?: boolean;
    // }
    const { url } = newNavState;
    if (!url) return;

    // handle certain doctypes
    if (url.includes('lounge')) {
      // lounge
      //this.webview.stopLoading();
      this.webview.injectJavaScript('alert("welcome to lounge")');
    }

    // one way to handle a successful form submit is via query strings
    if (url.includes('room')) {
      this.webview.injectJavaScript('alert("welcome to room")');
      // room
      //this.webview.stopLoading();
    }

    // redirect somewhere else
    //if (url.includes('google.com')) {
    //  const newURL = 'https://reactnative.dev/';
    //  const redirectTo = 'window.location = "' + newURL + '"';
    //  this.webview.injectJavaScript(redirectTo);
    //}
  };

}

//export default function App() {
//  return (
//    <View style={styles.container}>
//      <Text>Welcome to DuRaRaRa App</Text>
//      <StatusBar style="auto" />
//    </View>
//  );
//}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
