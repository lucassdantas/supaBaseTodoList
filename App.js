import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { supabase } from './src/db';

export default function App() {
  const [task, setTask] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const { data } = await supabase.from('todos').select('*').eq('done', false);
    setTodos(data);
  };

  const handleDone = async (id) => {
    await supabase.from('todos').update({ done: true }).eq('id', id);
    fetchTodos();
  };

  const handleAddTask = async () => {
    if (task.length > 0) {
      await supabase.from('todos').insert([{ task, done: false }]).single();
      setTask('');
      fetchTodos();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={task}
          placeholder="Adicione uma tarefa"
          onChangeText={setTask}
        />
        <Button title="Adicionar" onPress={handleAddTask} />
      </View>

      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.taskText}>{item.task}</Text>
            <Button title="Concluir" onPress={() => handleDone(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    marginTop: 50,
    paddingHorizontal: 16,
    backgroundColor: '#f4f4f4',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
    marginBottom: 10,
  },
};
