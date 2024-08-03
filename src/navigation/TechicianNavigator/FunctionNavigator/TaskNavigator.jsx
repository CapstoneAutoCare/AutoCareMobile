import { StyleSheet } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskList from "../../../screens/technician/TaskList";
import TaskDetail from "../../../screens/technician/TaskDetail"; 

const Stack = createNativeStackNavigator();

const TaskNavigator = (authenticated) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskList"
        component={TaskList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TaskDetail"
        component={TaskDetail}
        options={{ headerTitle: 'Task Detail' }} // Customize header options as needed
      />
    </Stack.Navigator>
  );
};

export default TaskNavigator;

const styles = StyleSheet.create({});
