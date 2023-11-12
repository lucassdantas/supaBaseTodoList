import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View, Text, TextInput, Button, 
  FlatList, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';

import { supabase } from './src/db';


export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos();
  }, [])

  const fetchTodos = async () => {
    const {data} = await supabase.from('todos').select('*').eq('done', false)
    setTodos(data)
  }

  const handleDone = async (id) => {
    const {data, error} = await supabase
    .from('todos')
    .update({done:true})
    .eq('id', id)

    fetchTodos()
  }

 
  const handleAddTask = async () => {
    if(task.length > 0 ) {
      await supabase 
      .from('todos')
      .insert([{task, done:false}])
      .single()

      setTask('')
      fetchTodos()
    }
  }

  return (
    <View  style={{flex:1, marginTop:50}}> 
      <TextInput
       
        value={task}
        placeholder="Add a task"
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={handleAddTask} />
      <FlatList
        data={todos}
        renderItem={({item}) => (
          <View>
            <Text>{item.task}</Text>
            <Button 
              title='Done' 
              onPress={() => handleDone(item.id)} 
            />   
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
    
    
  );
}


