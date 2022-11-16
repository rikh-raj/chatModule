import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { useState, useEffect } from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import { ScrollView } from 'react-native-gesture-handler';

const data = [
  {
    id: 1,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Tushar',
    number: '9182734650',
    selected: true,
  },
  {
    id: 2,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Vivan',
    number: '9182734650',
    selected: false,
  },
  {
    id: 3,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Nishat',
    number: '9182734650',
    selected: false,
  },
  {
    id: 4,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Vikas',
    number: '9182734650',
    selected: true,
  },
];
const GroupCreation = ({ navigation }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selected, setSelected] = useState(data);
  // const [isLoading, setIsLoading] = useState(true);
  // console.log("initial", selected)
  const handleOnPress = item => {
    const newItem = selected.map(val => {
      if (val?.id === item?.id) {
        return {
          ...val,
          selected: !val.selected,
        };
      } else {
        // return{...val,selected: false}
        return val;
      }
    });
    setSelected(newItem);
  };
  // console.log('changed', selected);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.icon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require('../assets/icons/png/backButton.png')} />
            </TouchableOpacity>
          </View>
          <View style={styles.iconImage}>
            <TouchableOpacity style={styles.edit} onPress={() => navigation.navigate('groupEdit')}>
              <Image
                source={require('../assets/icons/png/pen.png')}
                style={{ height: 15, width: 15, marginTop: '30%', marginLeft: '7%', alignSelf: 'center' }}
              />
            </TouchableOpacity>
          </View>
          <Image
            source={require('../assets/icons/png/actions.png')}
            style={styles.moreOption}
          />
        </View>
        <View style={{ alignSelf: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="Enter group name"
            placeholderTextColor="#cacaca"
          />
        </View>
        <View>
          <Text style={styles.groupNo}>Group.2 participant</Text>
        </View>
        <View>
          <Text style={styles.addpar}>Add Participants</Text>
        </View>
        <View>
          <SearchBar
            placeholder="Search here"
            onPress={() => alert('onPress')}
            style={styles.searchbar}
            onChangeText={text => console.log(text)}
          />
        </View>
        <View>
          <View style={styles.selectName}>
            <Text style={styles.selectText}>Tushar</Text>
            <TouchableOpacity style={{ marginLeft: '10%', alignSelf: 'center' }}>
              <Image
                source={require('../assets/icons/png/wrong.png')}
                style={{ height: 15, width: 15, marginTop: '19%', marginLeft: '1%', alignSelf: 'center' }}
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* {isLoading ? (
        <ActivityIndicator />
      ) : ( */}
        <FlatList
          style={{ flex: 1, padding: 0 }}
          data={selected}
          keyExtractor={item => item?.id}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  justifyContent: 'center',
                  marginTop: '2%',
                  borderBottomColor: '#cacaca',
                  borderBottomWidth: 1,
                  width: windowWidth / 1.1,
                  alignSelf: 'center',
                }}>
                <View style={{ flexDirection: 'row' }}>
                  <View>
                    <Image
                      source={{
                        uri: item?.image
                          ? item?.image
                          : 'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg',
                      }}
                      style={{
                        // backgroundColor: 'black',
                        marginTop: '10%',
                        marginLeft: '5%',
                        marginBottom: '10%',
                        height: 50,
                        width: 50,
                        borderRadius: 100 / 2,
                      }}
                    />
                  </View>
                  <View>
                    <Text
                      style={{
                        marginTop: '5%',
                        marginLeft: '5%',
                        color: '#000',
                      }}>
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        marginTop: '5%',
                        marginLeft: '5%',
                        color: '#000',
                      }}>
                      {item?.number}
                    </Text>
                  </View>
                  <View>
                    <TouchableOpacity onPress={() => handleOnPress(item)}>
                      <View
                        key={item?.id}
                        style={{
                          borderRadius: 100 / 2,
                          backgroundColor: item?.selected ? '#636DD9' : '#B5B9DD',
                          height: 30,
                          width: 30,
                          marginTop: '10%',
                          marginLeft: '50%',
                          alignSelf: 'center',
                        }}>
                        <Image
                          source={require('../assets/icons/png/tick.png')}
                          style={{ height: 18, width: 18, marginTop: '19%', marginLeft: '1%', alignSelf: 'center' }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
        {/* )} */}
        <View>
          <Text style={styles.addpar}>Message</Text>
        </View>
        <View>
          <TextInput
            style={styles.messageInput}
            placeholder='Writr about your activity or thoughts here'
            placeholderTextColor="#cacaca"
          />
        </View>
        <View style={{ flexDirection: 'row', marginTop: '5%', marginLeft: '5%', marginBottom: '5%' }}>
          <TouchableOpacity style={{
            backgroundColor: '#000',
            width: '40%',
            borderRadius: 10,
            marginLeft: '5%',
            marginRight: '5%',
            padding: 12
          }}>
            <Text style={{
              textAlign: 'center',
              color: '#fff',
              fontWeight: '500'
            }}>Create Group</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            backgroundColor: '#fff',
            width: '40%',
            borderRadius: 10,
            borderColor: '#636DD9',
            borderWidth: 1,
            // marginLeft: '5%',
            marginRight: '5%',
            padding: 12
          }}>
            <Text style={{
              textAlign: 'center',
              color: '#636DD9',
              fontWeight: '500'
            }}>Invite Friends</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default GroupCreation;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    // marginTop: '10%'
  },
  icon: {
    marginLeft: '5%',
    marginTop: '10%',
    marginRight: '5%',
  },
  iconImage: {
    backgroundColor: 'powderblue',
    alignSelf: 'center',
    marginTop: '7%',
    marginLeft: '25%',
    width: 80,
    height: 80,
    borderRadius: 100 / 2,
  },
  edit: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#636DD9',
    width: 30,
    height: 30,
    borderRadius: 100 / 2,
  },
  moreOption: {
    // backgroundColor: 'powderblue',
    marginLeft: '30%',
    marginTop: '11%',
    width: 20,
    height: 20,
    borderRadius: 100 / 2,
  },
  input: {
    height: 45,
    marginTop: '10%',
    // marginLeft: '10'
    width: windowWidth / 1.7,
    borderColor: '#cacaca',
    borderRadius: 10,
    borderWidth: 1,
    padding: 15,
  },
  groupNo: {
    fontSize: 14,
    marginTop: '5%',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  addpar: {
    marginTop: '15%',
    marginLeft: '8%',
    fontSize: 16,
    color: '#000',
    fontWeight: '700',
  },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
    width: windowWidth / 1.5,
    backgroundColor: 'red',
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icondropdown: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  searchbar: {
    margin: '5%',
    width: windowWidth / 1.2,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: 'grey',
    elevation: 10,
  },
  selectName: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '5%',
    marginBottom: '5%',
    backgroundColor: '#636DD9',
    padding: 6,
    borderRadius: 10,
    width: '35%'
  },
  selectText: {
    flexDirection: 'row',
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    width: '40%',
    marginRight: '5%'
  },
  messageInput: {
    height: windowHeight / 4,
    width: windowWidth / 1.2,
    backgroundColor: '#fff',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 10,
    elevation: 10,
    alignSelf: 'center'
  }
});
