import {
  StyleSheet,
  Text,
  Switch,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import SearchBar from 'react-native-dynamic-search-bar';

const data = [
  {
    id: 1,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Tushar',
    number: '9182734650',
    admin: true,
  },
  {
    id: 2,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Vivan',
    number: '9182734650',
    admin: false,
  },
  {
    id: 3,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Nishat',
    number: '9182734650',
    admin: false,
  },
  {
    id: 4,
    image:
      'https://img.freepik.com/free-photo/pleasant-looking-serious-man-stands-profile-has-confident-expression-wears-casual-white-t-shirt_273609-16959.jpg?w=2000',
    name: 'Vikas',
    number: '9182734650',
    admin: true,
  },
];

export default function EditGroup({ navigation }) {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.icon}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image source={require('../assets/icons/png/backButton.png')} />
              </TouchableOpacity>
            </View>
            <View style={styles.iconImage}>
              {/* <View style={styles.edit}></View> */}
            </View>
            <Image
              source={require('../assets/icons/png/actions.png')}
              style={styles.moreOption}
            />
          </View>
          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <Text style={styles.groupName}>Group Name</Text>
            <TouchableOpacity style={{marginTop: '5%', marginLeft: '3%'}}>
            <Image
                source={require('../assets/icons/png/pencil.png')}
                style={{ height: 20, width: 16, marginTop: '30%', alignSelf: 'center' }}
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.groupNo}>Group.2 participant</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <SearchBar
                placeholder="Search Group"
                onPress={() => alert('onPress')}
                style={styles.searchbar}
                onChangeText={text => console.log(text)}
              />
            </View>
            <TouchableOpacity
              style={{
                marginTop: '7%',
                height: 45,
                width: 45,
                backgroundColor: '#000',
                elevation: 5,
                shadowColor: 'grey',
                borderRadius: 100 / 2,
              }}
            >
              <Image
                source={require('../assets/icons/png/plus.png')}
                style={{ height: 20, width: 20, marginTop: '30%', alignSelf: 'center' }}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.elevationView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.message}>Mute Notification</Text>
              <Switch
                trackColor={{ false: "#767577", true: "#000" }}
                thumbColor={isEnabled ? "#fff" : "#fff"}
                style={{
                  marginLeft: '30%'
                }}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
            </View>
          </View>
          <View style={styles.elevationView}>
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.message}>Group Call</Text>
              <TouchableOpacity style={styles.call} >
                <Image
                  source={require('../assets/icons/png/telephone.png')}
                  style={{ height: 20, width: 20, marginTop: '20%', alignSelf: 'center' }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.elevationView2}>
            <FlatList
              style={{ flex: 1, padding: 0 }}
              data={data}
              keyExtractor={item => item?.id}
              renderItem={({ item }) => {
                return (
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#fff',
                      justifyContent: 'center',
                      marginTop: '5%',
                      borderBottomColor: '#cacaca',
                      borderBottomWidth: 1,
                      width: windowWidth / 1.3,
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
                      <View style={{
                        marginTop: '5%',
                        marginLeft: '30%'
                      }}>
                        <Text style={{
                          color: '#636DD9'
                        }}>{item?.admin ? 'Admin' : null}</Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={styles.elevationView2}>
          <TouchableOpacity style={{
            borderBottomColor: '#cacaca',
            padding: 10,
            width: windowWidth / 1.3,
            alignSelf: 'center',
            borderBottomWidth: 1
          }}>
            <Text style={{
              padding: 10,
              fontSize: 16,
              // marginLeft:'5%',
              color: '#636DD9',
            }}>Export Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ padding: 10, }}>
            <Text style={{
              padding: 10,
              fontSize: 16,
              // marginLeft:'5%',
              color: 'red',
            }}>Clear Chat</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{
          backgroundColor: '#000',
          width: '85%',
          borderRadius: 10,
          marginBottom: '5%',
          marginLeft: '5%',
          marginRight: '5%',
          alignSelf: 'center',
          padding: 15
        }}>
          <Text style={{
            textAlign: 'center',
            color: '#fff',
            fontWeight: '500'
          }}>Exit Group</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

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
  groupName: {
    fontSize: 22,
    marginTop: '5%',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
    marginLeft:'5%'
  },
  groupNo: {
    fontSize: 12,
    marginTop: '2%',
    fontWeight: '500',
    color: '#000',
    textAlign: 'center',
  },
  searchbar: {
    marginTop: '10%',
    marginLeft: '9%',
    marginRight: '5%',
    height: 45,
    width: windowWidth / 1.5,
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: 'grey',
    elevation: 10,
  },
  plus: {
    fontSize: 45,
    color: '#fff',
    alignSelf: 'center',
    fontWeight: '300'
  },
  elevationView: {
    width: windowWidth / 1.2,
    padding: 10,
    marginTop: '5%',
    elevation: 10,
    shadowColor: 'grey',
    borderRadius: 10,
    marginBottom: '5%',
    alignSelf: 'center',
    backgroundColor: '#fff'
  },
  elevationView2: {
    width: windowWidth / 1.2,
    padding: 10,
    marginTop: '1%',
    elevation: 10,
    shadowColor: 'grey',
    borderRadius: 10,
    marginBottom: '5%',
    alignSelf: 'center',
    backgroundColor: '#fff'
  },
  message: {
    padding: 5,
    fontSize: 16,
    marginLeft: '5%',
    width: '50%',
    fontWeight: '400',
    color: '#000'
  },
  call: {
    backgroundColor: 'black',
    marginLeft: '30%',
    width: '50%',
    // marginTop: '9%',
    width: 35,
    height: 35,
    borderRadius: 100 / 2,
  },
});
