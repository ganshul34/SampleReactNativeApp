import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default class Home extends React.Component {
  state = {
    users: '',
    isLoading: true,
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers() {
    fetch(`https://reactnativebackend.herokuapp.com/api/users`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  handleDelete = _id => {
    console.log('Main delete called');
    console.log(_id);

    fetch(`https://reactnativebackend.herokuapp.com/api/user` + '/' + _id, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(response => Alert.alert(`User successfully deleted `))
      .catch(error => console.log(error));
  };
  render() {
    const { users, isLoading } = this.state;
    return (
      <View style={styles.displaycontainer}>
        <View>
          <ScrollView>
            {users && users.length > 0 ? (
              users.map(user =>
                renderUser(user, this.handleDelete.bind(this, user._id))
              )
            ) : (
              <Text>No User data found</Text>
            )}
            <View style={styles.displayContainer}>
              <TouchableOpacity
                style={styles.savebutton}
                onPress={() =>
                  this.props.navigation.navigate('UserRegisteration')
                }>
                <Text style={styles.buttonText}>Add User Data</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.savebutton}
                onPress={this.fetchUsers()}>
                <Text style={styles.buttonText}>Reload</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

const renderUser = (user, handleDelete) => {
  return (
    <View style={styles.item}>
      <Text style={styles.user}>{user.name}</Text>
      <Text style={styles.user}>{user.email}</Text>
      <Text style={styles.user}>{user.ph_no}</Text>
      <Button color={'red'} title="Delete User" onPress={handleDelete} />
    </View>
  );
};
const styles = StyleSheet.create({
  displayContainer: {
    paddingTop: 15,
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
  user: {
    alignItems: 'center',
    textAlign: 'center',
  },
  item: {
    margin: 10,
  },
});
