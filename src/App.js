import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import io from "socket.io-client";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      chatMessage: '',
      chatMessages: [],
    };
  }

  componentDidMount() {
    this.socket = io('http://10.0.2.2:5000');
    this.socket.on('chat message', msg => {
      this.setState({chatMessages: [...this.state.chatMessages, msg]});
    });
  }

  submitChatMessage() {
    this.socket.emit('chat message', this.state.chatMessage);
    this.setState({chatMessage: ''});
  }

  render() {
    const chatMessages = this.state.chatMessages
    return (
      <View style={styles.container}>
        {chatMessages.map(item =>{
       <Text style={{backgroundColor: 'red', fontSize: 20, height: 50, width: 500, marginTop: '20%'}}>{item.chatMessages}</Text>
        })}
        <TextInput
          style={{height: 40, borderWidth: 2, top: 400, backgroundColor: 'powderblue'}}
          autoCorrect={false}
          value={this.state.chatMessage}
          onSubmitEditing={() => this.submitChatMessage()}
          onChangeText={chatMessage => {
            this.setState({chatMessage});
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 400,
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});
