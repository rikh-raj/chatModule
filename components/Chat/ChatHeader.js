import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'

const ChatHeader = (props) => {
  const navigation = props.navigation;
  return (
    <View {...props}>
      <View {...props} style={styles.chatheader}>
        <View style={styles.icon}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/icons/png/backButton.png')}
              // style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.iconImage}></View>
        <View style={styles.nameHeader}>
          <Text
            style={styles.nameText}
            onPress={
              props.onPressName}>
            {props.name}
          </Text>
          <Text style={styles.numberText}>{props.number}</Text>
        </View>
        <TouchableOpacity style={styles.call}>
        <Image
          source={require('../../assets/icons/png/telephone.png')}
          style={{height: 22, width: 22, marginTop: '20%',alignSelf: 'center'}}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.moreOption}>
        <Image
          source={require('../../assets/icons/png/actions.png')}
          style={{height: 22, width: 22,alignSelf: 'center'}}
        />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default ChatHeader

const styles = StyleSheet.create({
  chatheader: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    // width: windowWidth/1,
  },
  icon: {
    marginLeft: '5%',
    marginTop: '11%',
    marginRight: '5%',
  },
  iconImage: {
    backgroundColor: 'powderblue',
    marginTop: '7%',
    width: 60,
    height: 60,
    borderRadius: 100 / 2,
  },
  nameHeader: {
    marginTop: '8%',
    width: '39%',
    marginLeft: '3%',
  },
  nameText: {
    textAlign: 'left',
    color: '#000',
    fontSize: 22,
    // width: '80%',
    fontWeight: '800',
  },
  numberText: {
    textAlign: 'left',
    color: '#000',
    // width: '100%',
    fontSize: 14,
    marginLeft: '2%',
    marginTop: '1%',
    // fontWeight: '800',
  },
  call: {
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    marginLeft: '8%',
    marginTop: '9%',
    width: 40,
    height: 40,
    borderRadius: 100 / 2,
  },
  moreOption: {
    // backgroundColor: 'powderblue',
    marginLeft: '3%',
    marginTop: '11%',
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
  },
})