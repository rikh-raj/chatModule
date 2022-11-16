import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getAllMessageByChatId } from '../../redux/Message/actions';


const ChatListItem = (props) => {

    const messageState = useSelector((state) => state.messageState);

    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getAllMessageByChatId(props.id))
        console.log("Display chatId", props.id)
        console.log("data:", messageState.data)
    }, [props.id]);



    return (
        <View>
            <View style={styles.container}>
                <View>
                    <Image style={styles.profileImage}
                        source={{
                            uri:
                                props.profileUrl
                        }} />
                    {props.isOnline ?
                        <View style={styles.isOnline} />
                        :
                        null
                    }
                </View>
                <View style={styles.body}>
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.message}>{props.lastMessage}</Text>
                </View>
                <View style={styles.info}>
                    <Text style={styles.time}>{props.time}</Text>
                    <View style={styles.unreadView}>
                        <Text style={styles.unread}>{props.unread}</Text>
                    </View>

                </View>
            </View>
        </View>
    )
}

export default ChatListItem;

const styles = StyleSheet.create({
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 100 / 2
    },
    container: {
        flexDirection: 'row',
        marginHorizontal: 30,
        paddingVertical: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomColor: '#ECECEC',
        borderBottomWidth: 1,
    },
    body: {
        marginLeft: 15,
        alignSelf: 'flex-start',
        flex: 1,
        alignContent: 'flex-start',
        textAlign: 'flex-start'
    },
    name: {
        fontWeight: '700',
        fontSize: 18,
        paddingBottom: 7,
        color: 'black'
    },
    message: {
        color: 'black',
        fontSize: 16
    },
    time: {
        color: '#ABABAB'
    },
    unreadView: {
        backgroundColor: 'black',
        width: 30,
        height: 30,
        borderRadius: 30 / 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    },
    unread: {
        color: 'white'
    },
    info: { alignItems: 'flex-end' },
    isOnline: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#636DD9',
        width: 15,
        height: 15,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 3
    }
})