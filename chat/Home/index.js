import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from './Header'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Chat from '../Chat';
import Group from '../Group';
import Call from '../Call';

const Tab = createMaterialTopTabNavigator();

const ChatHome = () => {
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.container}>
                <Tab.Navigator
                    screenOptions={{
                        tabBarLabelStyle: { fontSize: 14, textTransform: 'none' ,fontWeight:'500'},
                        tabBarItemStyle: { justifyContent: 'center'},
                        tabBarStyle: { justifyContent: 'center', marginHorizontal: 40, elevation: 0 },
                        tabBarActiveTintColor: 'white',
                        tabBarInactiveTintColor: 'black',
                        tabBarIndicatorStyle: { backgroundColor: 'black', height: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10 },
                        tabBarBounces: true
                    }}>
                    <Tab.Screen
                        name="Chat" component={Chat} />
                    <Tab.Screen name="Group" component={Group} />
                    <Tab.Screen name="Calls" component={Call} />
                </Tab.Navigator>
            </View>
        </View>
    )
}

export default ChatHome;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white'
    }
})