import {
  FlatList,
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState, useContext, useEffect } from "react";
import { data } from "@/data/todos";
import { Inter_500Medium, useFonts } from "@expo-google-fonts/inter";
import { ThemeContext } from "@/context/ThemeContext";
import Animated, { LinearTransition } from "react-native-reanimated";
import Octicons from "@expo/vector-icons/Octicons";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
export default function Index() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loaded, error] = useFonts({
    Inter_500Medium,
  });

  const { colorScheme, setColorScheme, theme } = useContext(ThemeContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("TodoApp");
        const storageTodos = jsonValue != null ? JSON.parse(jsonValue) : null;
        if (storageTodos && storageTodos.length) {
          setTodos(storageTodos.sort((a, b) => b.id - a.id));
        } else {
          setTodos(data.sort((a, b) => b.id - a.id));
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    const storeData = async () => {
      try {
        const jsonValue = JSON.stringify(todos);
        await AsyncStorage.setItem("TodoApp", jsonValue);
      } catch (e) {
        console.error(e);
      }
    };
    storeData();
  }, [todos]);

  if (!loaded && !error) {
    return null;
  }

  const addTodo = () => {
    if (text.trim()) {
      const newId = todos.length > 0 ? todos[0].id + 1 : 1;
      setTodos([{ id: newId, title: text, completed: false }, ...todos]);
      setText("");
    }
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const styles = createStyles(theme, colorScheme);

  const handlePress = (id) => {
    router.push(`/${id}`);
  };
  const renderItem = ({ item }) => (
    <View>
      <Pressable
        onPress={() => toggleTodo(item.id)}
        onLongPress={() => handlePress(item.id)}
      >
        <Text
          style={[styles.textstuff, item.completed && styles.completed]}
          onPress={() => toggleTodo(item.id)}
        >
          {item.title}
        </Text>
      </Pressable>

      <Pressable onPress={() => removeTodo(item.id)}>
        <MaterialCommunityIcons
          name="delete-circle"
          size={36}
          color="red"
          selectable={undefined}
        />
      </Pressable>
    </View>
  );

  return (
    <SafeAreaView style={{ background: theme.background }}>
      <View>
        <TextInput
          style={{ background: theme.background }}
          placeholder="Add a new thing"
          placeholderTextColor={theme.text}
          onChangeText={setText}
          value={text}
        ></TextInput>
        <Pressable
          style={{ color: theme.text }}
          onPress={addTodo}
        >
          <Text style={styles.textstuff}>Add</Text>
        </Pressable>
        <Pressable
          onPress={() =>
            setColorScheme(colorScheme == "light" ? "dark" : "light")
          }
        >
          <Octicons
            name={colorScheme === "dark" ? "moon" : "sun"}
            color={theme.text}
            size={50}
          />
        </Pressable>
      </View>
      <Animated.FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={(todo) => todo.id}
        itemLayoutAnimation={LinearTransition}
      />
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </SafeAreaView>
  );
}

function createStyles(theme, colorScheme) {
  return StyleSheet.create({
    completed: {
      textDecorationLine: "line-through",
    },
    textstuff: {
      fontFamily: "Inter_500Medium",
      color: theme.text,
    },
  });
}
