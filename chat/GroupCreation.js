import {
  StyleSheet,
  Text,
  Dimensions,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import SearchBar from 'react-native-dynamic-search-bar';
import {ScrollView} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

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
const GroupCreation = ({navigation}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [selectedName, setSelectedName] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // console.log("initial", selected)
  const handleOnPress = item => {
    if (selectedName.includes(item?.id)) {
      setSelectedName(selectedName.filter(value => value !== item?.id));
    } else {
      setSelectedName([...new Set([...selectedName, item?.id])]);
    }
  };
  // console.log('changed', selected);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={require('../assets/images/home-top-bg.png')}
          resizeMode="cover"
          style={styles.topContainer}>
          <View style={styles.header}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/png/backButton.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconImage}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => navigation.navigate('groupEdit')}>
                <Image
                  source={require('../assets/icons/png/pen.png')}
                  style={{
                    height: 15,
                    width: 15,
                    marginTop: '30%',
                    marginLeft: '7%',
                    alignSelf: 'center',
                  }}
                />
              </TouchableOpacity>
            </View>
            <Image
              source={require('../assets/icons/png/actions.png')}
              style={styles.moreOption}
            />
          </View>
        </ImageBackground>
        <View style={{alignSelf: 'center'}}>
          <TextInput
            style={styles.input}
            placeholder="Enter group name"
            placeholderTextColor="#cacaca"
          />
        </View>
        <View>
          <Text style={styles.groupNo}>Group.2 participant</Text>
        </View>
        <View style={{backgroundColor: '#cccef3', marginTop: '10%'}}>
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
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {selectedName.map(item => {
              return (
                <View>
                    <View style={styles.selectName}>
                      <Text style={styles.selectText}>{item}</Text>
                      <TouchableOpacity
                        style={{ alignSelf: 'center'}}>
                        <Image
                          source={require('../assets/icons/png/wrong.png')}
                          style={{
                            height: 15,
                            width: 15,
                            // marginTop: '19%',
                            // marginLeft: '1%',
                            alignSelf: 'center',
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                </View>
              );
            })}
            </ScrollView>
          </View>
          {/* {isLoading ? (
        <ActivityIndicator />
      ) : ( */}
          {/* <View style={{height: windowHeight/1.6}}> */}
          <FlatList
            // style={{backgroundColor: 'red' }}
            data={data}
            keyExtractor={item => item?.id}
            renderItem={({item}) => {
              return (
                <View>
                  {/* <ScrollView> */}
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#cccef3',
                      justifyContent: 'center',
                      marginTop: '2%',
                      borderBottomColor: '#c3c5e3',
                      borderBottomWidth: 1,
                      width: windowWidth / 1.1,
                      alignSelf: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
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
                        <TouchableOpacity
                          onPress={() => {
                            if (selectedName.includes(item?.name)) {
                              setSelectedName(
                                selectedName.filter(
                                  value => value !== item?.name,
                                ),
                              );
                            } else {
                              setSelectedName([
                                ...new Set([...selectedName, item?.name]),
                              ]);
                            }
                          }}>
                          {/* {console.log("sele", selectedName)} */}
                          <View
                            key={item?.id}
                            style={{
                              borderRadius: 100 / 2,
                              backgroundColor: selectedName.includes(item.name)
                                ? '#5d6aff'
                                : '#B5B9DD',
                              height: 30,
                              width: 30,
                              marginTop: '10%',
                              marginLeft: '50%',
                              alignSelf: 'center',
                            }}>
                            <Image
                              source={require('../assets/icons/png/tick.png')}
                              style={{
                                height: 18,
                                width: 18,
                                marginTop: '19%',
                                marginLeft: '1%',
                                alignSelf: 'center',
                              }}
                            />
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  {/* </ScrollView> */}
                </View>
              );
            }}
          />
          {/* </View> */}
          {/* )} */}
          {/* <View style={{position: 'absolute', bottom: -90, alignSelf: 'center'}}> */}
          <Text style={styles.addpar}>Message</Text>
          <TextInput
            style={styles.messageInput}
            placeholder="Writr about your activity or thoughts here"
            placeholderTextColor="#cacaca"
          />
          {/* </View> */}
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: '20%',
            marginLeft: '5%',
            marginBottom: '5%',
          }}>
          <TouchableOpacity
            style={{
              // backgroundColor: '#000',
              width: '40%',
              borderRadius: 10,
              marginLeft: '5%',
              marginRight: '5%',
              // padding: 12
            }}>
            <LinearGradient
              style={styles.buttonWrapper}
              colors={['#5E6BFF', '#212FCC']}>
              <Text style={styles.buttonText}>Create Group</Text>
            </LinearGradient>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              width: '40%',
              borderRadius: 10,
              borderColor: '#636DD9',
              borderWidth: 1,
              height: '20%',
              // marginLeft: '5%',
              marginRight: '5%',
              padding: 10,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: '#636DD9',
                alignSelf: 'center',
                fontWeight: '500',
              }}>
              Invite Friends
            </Text>
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
    backgroundColor: '#ebecff',
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
    backgroundColor: '#fff',
    marginTop: '10%',
    // marginLeft: '10'
    width: windowWidth / 1.7,
    // borderColor: '#cacaca',
    borderRadius: 10,
    // borderWidth: 1,
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
    marginTop: '5%',
    marginLeft: '8%',
    fontSize: 16,
    textAlign: 'left',
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
    marginLeft: 20,
    // marginBottom: '5%',
    backgroundColor: '#8091e6',
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 20,
    // width: '35%',
  },
  selectText: {
    flexDirection: 'row',
    fontSize: 14,
    color: '#fff',
    padding:5,
    textAlign: 'center',
    alignSelf: 'center',
    // width: '40%',
    // marginRight: '5%',
  },
  messageInput: {
    height: windowHeight / 4,
    width: windowWidth / 1.2,
    backgroundColor: '#fff',
    // top: 0,
    // bottom: 0,
    // position: 'absolute',
    marginTop: '5%',
    marginBottom: '5%',
    borderRadius: 10,
    elevation: 10,
    alignSelf: 'center',
  },
  topContainer: {
    flex: 1,
    // backgroundColor: 'pink',
    width: windowWidth / 1,
    height: windowHeight / 6,
  },
  buttonWrapper: {
    width: '100%',
    height: '20%',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: 'Inter',
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    lineHeight: 20,
    textAlign: 'center',
  },
});
