// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';
import { WebView } from 'react-native-webview';

export default class FirstPage extends React.Component {
  webview = null;
  chatloc = "lounge";
  render() {
    return (
      <WebView
        ref={(ref) => (this.webview = ref)}
        source={{ uri: 'https://drrr.com' }}
        originWhitelist={['https://drrr.com', 'https://drrr.com/*']}
        style={{ marginTop: 0 }}
        onLoadEnd={this.handleLoadEnd}
        onMessage={this.handleMessage}
      />
    );
  }

  ref = (bind) => { bind(this); }

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

  //return (
    //<SafeAreaView style={{flex: 1}}>
    //  <View style={{flex: 1, padding: 16}}>
    //    <View
    //      style={{
    //        flex: 1,
    //        alignItems: 'center',
    //        justifyContent: 'center',
    //      }}>
    //      <Text
    //        style={{
    //          fontSize: 25,
    //          textAlign: 'center',
    //          marginBottom: 16,
    //        }}>
    //        This is the First Page under First Page Option
    //      </Text>
    //      <Button
    //        onPress={() => navigation.navigate('SecondPage')}
    //        title="Go to Second Page"
    //      />
    //      <Button
    //        onPress={() => navigation.navigate('ThirdPage')}
    //        title="Go to Third Page"
    //      />
    //    </View>
    //    <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
    //      Custom React Navigate Drawer
    //    </Text>
    //    <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
    //      www.aboutreact.com
    //    </Text>
    //  </View>
    //</SafeAreaView>
  //);
};

//export default FirstPage;
