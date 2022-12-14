import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from 'react-native';

export default class ChatRoom extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };

    this._onNewMsg();
  }

  _onNewMsg = () => {
    this.props.socket.on(
      'chat message',
      message => {
        this.setState(prevState => ({
          messages: [...prevState.messages, message],
        }));

        this._scrollToBottom(70);
      },
      () => {},
    );
  };

  _sendMessage = () => {
    this.props.socket.emit(
      'chat message',
      {
        room: 'Code',

        from: 'codesolution',

        text: 'Hello',

        createdAt: new Date().now,
      },
      () => {
        this._scrollToBottom(50);
      },
    );
  };

  _renderName = name => {
    return this.props.name !== name ? (
      <Text style={{fontSize: 13, marginLeft: 5}}> {name} </Text>
    ) : null;
  };

  _scrollToBottom = offset => {
    const scrollHeight = this.contentHeight - this.scrollViewHeight + offset;

    if (scrollHeight > 0) {
      this.flatlist.scrollToOffset({offset: scrollHeight, animated: true});
    }
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1, marginTop: 20}}>
        <FlatList
          ref={flatlist => (this.flatlist = flatlist)}
          data={this.state.messages}
          keyExtractor={(item, index) => `${index}`}
          onContentSizeChange={(w, h) => (this.contentHeight = h)}
          onLayout={ev =>
            (this.scrollViewHeight = ev.nativeEvent.layout.height)
          }
          renderItem={({item}) => {
            const cellStyle = {
              container: {
                justifyContent: 'center',

                alignItems:
                  this.props.name === item.from ? 'flex-end' : 'flex-start',
              },

              textContainer: {
                maxWidth: '70%',

                marginHorizontal: 12,

                marginVertical: 5,

                paddingHorizontal: 13,

                paddingVertical: 8,

                backgroundColor:
                  this.props.name === item.from ? '#2f73e0' : '#e2e2e2',

                borderRadius: 10,
              },

              text: {
                color: this.props.name === item.from ? '#ffffff' : '#282828',

                fontSize: 15,
              },
            };

            return (
              <View style={cellStyle.container}>
                {this._renderName(item.from)}

                <View style={cellStyle.textContainer}>
                  <Text style={cellStyle.text}> {item.text} </Text>
                </View>
              </View>
            );
          }}
        />

        <TouchableOpacity
          style={styles.sendBtn}
          onPress={() => this._sendMessage()}>
          <Text style={{color: '#fff', fontSize: 18}}> Send Hello </Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,

    justifyContent: 'center',

    alignItems: 'center',
  },

  sendBtn: {
    width: '100%',

    height: 50,

    justifyContent: 'center',

    alignItems: 'center',

    backgroundColor: '#2f73e0',
  },
});
