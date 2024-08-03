import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import TaskList from '../../screens/technician/TaskList';
import Logout from '../../manager/logout';
import SettingScreen from '../../screens/Profile/SettingScreen';
import TaskNavigator from "./FunctionNavigator/TaskNavigator"
const Drawer = createDrawerNavigator();

const TechnicianNavigator = ({ authenticated }) => {
  return (
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
              label="Đóng"
              onPress={() => props.navigation.closeDrawer()}
            />
          </DrawerContentScrollView>
        )}
      >
        <Drawer.Screen
          name="TASK_NAVIGATOR"
          children={() => <TaskNavigator authenticated={authenticated} />}
          options={{
            title: "Danh sách công việc",
            drawerIcon: ({ size, color }) => (
              <FontAwesome name="tasks" size={28} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Setting"
          component={SettingScreen}
          options={{
            title: "Hồ sơ",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="people" size={24} color={color} />
            ),
          }}
        />
        <Drawer.Screen
          name="Logout"
          component={Logout}
          options={{
            title: "Đăng xuất",
            drawerIcon: ({ size, color }) => (
              <MaterialIcons name="logout" size={24} color={color} />
            ),
          }}
        />
      </Drawer.Navigator>
  );
};

export default TechnicianNavigator;
