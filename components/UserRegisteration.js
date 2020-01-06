import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  Alert,
  TextInput,
} from 'react-native';


export default class UserRegisteration extends React.Component {
  state = {
    name: '',
    email: '',
    ph_no: '',
  };

  handleNameChange = name => {
    this.setState({
      name: name,
    });
  };

  handleEmailChange = email => {
    this.setState({
      email: email,
    });
  };

  handleNumberChange = ph_no => {
    this.setState({
      ph_no: ph_no,
    });
  };
  postData = () => {
    let { name, email, ph_no } = this.state;
    let user = {};
    user.name = name;
    user.email = email;
    user.ph_no = ph_no;

    fetch(`https://reactnativebackend.herokuapp.com/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .then(response => Alert.alert('Data Submitted successfully'))
      // Catch any errors we hit and update the app
      .catch(error => console.log(error));
  };
  handleSubmit = () => {
    let { name, email, ph_no } = this.state;

    if (name.length < 1 || email.length < 1 || ph_no.length < 1) {
      Alert.alert(`User Name / Email / Phone Number cannot be left empty`);
    } else if (ph_no.length !== 10) {
      Alert.alert('Invalid Phone number');
    } else {
      this.postData();
      this.props.navigation.navigate('Home')
    }
  };

  render() {
    let { name, email, ph_no } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Register</Text>
          <ScrollView>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Your name"
                maxLength={20}
                onBlur={Keyboard.dismiss}
                value={name}
                onChangeText={this.handleNameChange}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Your email"
                maxLength={20}
                autoCompleteType="email"
                value={email}
                onChangeText={this.handleEmailChange}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Your Phone Number"
                maxLength={10}
                keyboardType={'numeric'}
                value={ph_no}
                onChangeText={this.handleNumberChange}
              />
            </View>
          </ScrollView>
          <View style={styles.inputContainer}>
            <TouchableOpacity
              style={styles.savebutton}
              onPress={this.handleSubmit}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.savebutton}
              onPress={() => this.props.navigation.navigate('Home')}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    backgroundColor: '#F5FCFF',
  },
  header: {
    fontSize: 25,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
  inputContainer: {
    paddingTop: 15,
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20,
  },
  savebutton: {
    borderWidth: 1,
    borderColor: '#007BFF',
    backgroundColor: '#007BFF',
    padding: 15,
    margin: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
});
