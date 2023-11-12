import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';

import { supabase } from './src/db';


export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState('')

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    const {data} = await supabase.from('todos').select('*')
    setTodos(data)
  }

  const handleAddTask = async () => {
    if(task.length > 0 ) {
      await supabase 
      .from('todos')
      .insert([{task, done:false}])
      .single()

      setTask('')
    }
  }

  return (
    <FlatList
      data={todos}
      renderItem={({item}) => <Text>{item.task}</Text>}
      keyExtractor={(item) => item.id.toString()}
    />
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
