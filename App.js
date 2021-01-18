// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import 'react-native-gesture-handler';

import * as React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import FirstPage from './pages/FirstPage';
import SecondPage from './pages/SecondPage';
import ThirdPage from './pages/ThirdPage';

// Import Custom Sidebar
import CustomSidebarMenu from './CustomSidebarMenu';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{width: 25, height: 25, marginLeft: 5}}
        />
      </TouchableOpacity>
    </View>
  );
};

function firstScreenStack({navigation, route}) {
  return (
    <Stack.Navigator initialRouteName="FirstPage">
      <Stack.Screen
        name="FirstPage"
        component={FirstPage}
        initialParams = {{mobot: route.params.mobot}}
        options={{
          title: 'DuRaRaRa Mobot', //Set Header Title
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: '#3e3e44', //Set Header color
          },
          headerTintColor: '#fff', //Set Header text color
          headerTitleStyle: {
            fontWeight: 'bold', //Set Header text style
          },
        }}
      />
    </Stack.Navigator>
  );
}

function secondScreenStack({navigation}) {
  return (
    <Stack.Navigator
      initialRouteName="SecondPage"
      screenOptions={{
        headerLeft: () => (
          <NavigationDrawerStructure navigationProps={navigation} />
        ),
        headerStyle: {
          backgroundColor: '#3e3e44', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}>
      <Stack.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          title: 'DuRaRaRa Mobot Setting', //Set Header Title
        }}
      />
      <Stack.Screen
        name="ThirdPage"
        component={ThirdPage}
        options={{
          title: 'Third Page', //Set Header Title
        }}
      />
    </Stack.Navigator>
  );
}

class Mobot {
  constructor(){
    this.webview = null;
    this.chatloc = null;
  }

  setWebview(ref){
    this.webview = ref;
  }

  setChatloc(loc){
    this.chatloc = loc;
    alert(loc)
  }

  handleMessage(data){
    alert(data);
    // do something
  }

  handleLoadEnd = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url.includes('lounge')) {
      this.setChatloc("lounge");
      //this.mobot.webview.injectJavaScript(`
      //  alert("L ${nativeEvent.url}");
      //  true;
      //  `);
    }

    if (nativeEvent.url.includes('room')) {
      this.setChatloc("room");
      //this.mobot.webview.injectJavaScript(`
      //  alert("R ${nativeEvent.url}");
      //  true;
      //`);
      // window.ReactNativeWebView.postMessage
    }
  };

  handleMessage = (event) => {
    alert(event.nativeEvent.data)
  };

}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.mobot = new Mobot();
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          drawerContentOptions={{
            activeTintColor: '#e91e63',
            //activeBackgroundColor: '#aaaaaa',
            //backgroundColor: '#3e3e44',
            itemStyle: {marginVertical: 5},
          }}
          drawerContent={(props) => <CustomSidebarMenu {...props} />}>
          <Drawer.Screen
            name="FirstPage"
            options={{drawerLabel: 'Chatroom'}}
            component={firstScreenStack}
            initialParams = {{ mobot: this.mobot }}
          />
          <Drawer.Screen
            name="SecondPage"
            options={{drawerLabel: 'Mobot Setting'}}
            component={secondScreenStack}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  };
}
