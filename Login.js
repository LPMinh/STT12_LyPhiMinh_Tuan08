import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

export default function Login({navigation,route}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [data,setData]= useState([])
  const handleLogin = () => {
    const acc=data.find((item)=>item.userName===username&&item.password===password)
    if(acc!=null){
        navigation.navigate('note',{'id':acc.id});
    }else{
        return false;
    }
  };
  useEffect(() => {
    fetch("https://6548827bdd8ebcd4ab22faa6.mockapi.io/note/user")
      .then(response => response.json())
      .then(data => {
        setData(data);
      });
  }, []);
  console.log(data)
  return (
    <View style={styles.container}>
      <Text>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    margin: 10,
    padding: 8,
  },
});
