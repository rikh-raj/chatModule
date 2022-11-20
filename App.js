/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import ChatHome from './snap/SnapHome';
// import Home from './snap/Home/index';
// import Snap from './snap/Snap';
import { Provider } from 'react-redux';
import store from './redux/store';
import ChatHome from './chat/Home/index'
import ChatSingle from './chat/ChatSingle';
import GroupCreation from './chat/GroupCreation';
import GroupDetails from './chat/GroupDetails'
import CallNow from './chat/CallNow';
import GroupChat from './chat/GroupChat';
import AllContacts from './chat/AllContacts';

const Stack = createStackNavigator();

const App = () => {

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, [])

  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="chat">
        {/* <Stack.Screen name="chatHome" component={ChatHome} /> */}
        {/* <Stack.Screen name="home" component={Home} /> */}
        {/* <Stack.Screen name="snap" component={Snap} /> */}
        <Stack.Screen name = "chat" component={ChatHome}/>
         <Stack.Screen name="chatsingle" component={ChatSingle} />
         <Stack.Screen name="groupCreation" component={GroupCreation} />
         <Stack.Screen name="groupChat" component={GroupChat} />
       <Stack.Screen name="groupDetails" component={GroupDetails} />
       <Stack.Screen name="callNow" component={CallNow} />  
       <Stack.Screen name='allContacts' component={AllContacts}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;
