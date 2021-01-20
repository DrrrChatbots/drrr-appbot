// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import * as React from 'react';
import {Button, View, Text, Switch, SafeAreaView} from 'react-native';

const SecondPage = ({navigation, route}) => {
  const [enableKeep, setKeep] = React.useState(false);
  const toggleKeep = () => setKeep(prev => {
    return route.params.mobot.switchKeep(!prev);
  });
  route.params.mobot.toggleKeep = toggleKeep;
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            This is Second Page under Second Page Option
          </Text>
          <Button
            title="Go to First Page"
            onPress={() => navigation.navigate('FirstPage')}
          />
          <Button
            title="Go to Third Page"
            onPress={() => navigation.navigate('ThirdPage')}
          />
        </View>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={enableKeep ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleKeep}
          value={enableKeep}
        />
        <Text style={{fontSize: 18, textAlign: 'center', color: 'grey'}}>
          Custom React Navigate Drawer
        </Text>
        <Text style={{fontSize: 16, textAlign: 'center', color: 'grey'}}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SecondPage;
