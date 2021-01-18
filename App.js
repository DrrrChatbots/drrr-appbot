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

var roomscript = `
try{
  function handle_talks(msg){
    var event = {
      type: undefined,
      from: undefined,
      text: undefined,
      info: undefined,
      url: undefined,
      to: undefined
    };
    parser = {
      "me": function(msg, event){
        event.from = $(msg).find('.name').text();
        event.text = $(msg).contents().filter(function() {
          return this.nodeType == 3;
        }).get().pop().textContent;
        return event;
      },
      "music": function(msg, event){
        names = $(msg).find('.name');
        event.from = names[0].textContent;
        event.text = names[1].textContent;
        return event;
      },
      "leave": function(msg, event){
        event.from = $(msg).find('.name').text();
        event.text = $(msg).text();
        return event;
      },
      "join": function(msg, event){
        event.from = $(msg).find('.name').text();
        event.text = $(msg).text();
        return event;
      },
      "new-host": function(msg, event){
        event.from = $(msg).find('.name').text();
        event.text = $(msg).text();
        return event;
      },
      "new-description": function(msg, event){
        //event.from = $(msg).find('.name').text();
        event.text = $(msg)[0].childNodes[3].textContent
        return event;
      },
      "room-profile": function(msg, event){
        //event.from = $(msg).find('.name').text();
        event.text = $('.room-title-name').text()
        return event;
      },
      "secret": function(msg, event){
        dual = $(msg).find('.name span');
        if(dual.length > 1){
          event.to = dual[2].textContent;
          event.from = dual[0].textContent;
        } else event.from = $(msg).find('.name span').text();
        event.text = $(msg).find($('.bubble p'))
          .clone().children().remove().end().text();
        return event;
      },
      "kick": function(msg, event){
        event.from = $(msg).find('.name').text();
        event.text = $(msg).text();
        return event;
      },
      "ban": function(msg, event){
        event.from = $(msg).find('.name').text();
        event.text = $(msg).text();
        return event;
      }
    }

    wildcard = function(msg, event) {
      event.type = "talk"
      names = $(msg).find('.name');
      if(names.length){
        event.from = names[0].textContent;
        //event.text = $(msg).find('.select-text')[1].textContent
        event.text = $($(msg).find('.select-text')[1]).contents().filter(function() {
          return this.nodeType == Node.TEXT_NODE;
        }).text();
      }
      return event;
    }

    for(type in parser){
      if(msg.classList.contains(type)){
        event.type = type;
        event = parser[type](msg, event);
      }
    }

    if(!event.type) event = wildcard(msg, event);

    var ue = $(msg).find($('.bubble p a'));
    if(ue && ue.length) event.url = ue.attr('href');
    ue = $(msg).find($('img'));
    if(ue && ue.length) event.url = ue.attr('data-src');

    return event;
  }
}
catch (err) {
  alert(JSON.stringify(err));
}
window.ReactNativeWebView.postMessage(JSON.stringify(handle_talks($('#talks')[0])));
true;
`;

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
    this.setWebview = this.setWebview.bind(this);
    this.setChatloc = this.setChatloc.bind(this);
    this.handleLoadEnd = this.handleLoadEnd.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
  }

  setWebview(ref){
    this.webview = ref;
  }

  setChatloc(loc){
    this.chatloc = loc;
    //alert(loc)
  }

  handleLoadEnd = (syntheticEvent) => {
    const { nativeEvent } = syntheticEvent;
    if (nativeEvent.url.includes('lounge')) {
      this.setChatloc("lounge");
      this.webview.injectJavaScript(`
        //alert("L ${nativeEvent.url}");
        window.ReactNativeWebView.postMessage(JSON.stringify(profile))
        true;
        `);
    }

    if (nativeEvent.url.includes('room')) {
      this.setChatloc("room");
      this.webview.injectJavaScript(roomscript);
      //this.webview.injectJavaScript(`
      //  //alert("R ${nativeEvent.url}");
      //  alert("done");
      //  //window.ReactNativeWebView.postMessage(JSON.stringify(profile))
      //  //window.ReactNativeWebView.postMessage(JSON.stringify(room.talks[0].id))
      //  true;
      //`);
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
