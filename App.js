import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View, Text, TextInput, Button, 
  FlatList } from 'react-native';
import React, { useState } from 'react';

import { supabase } from './src/db';


export default function App() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState('')

  useEffect(() => {
    fetchTodos();
  }, [])

  const handleDone = async (id) => {
    const {data, error} = await supabase
    .from('todos')
    .update({done:true})
    .eq('id', id)
  }

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
    <View>
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


