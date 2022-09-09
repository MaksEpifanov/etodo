/* eslint-disable react/no-unstable-nested-components */
import { useEffect, useState } from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home, AddTodo, Shredder, UpdateTodo } from "../screens";
import SyncIndicator from "../components/SyncIndicator";

import useLocalStorage from "../hooks/useLocalStorage";
import { useAppDispatch } from "../store/store.hooks";
import { updateTodos } from "../store/features/todos/todos.slice";

import type { RootDrawerParamList, RootStackParamsList } from "./types";

const Drawer = createDrawerNavigator<RootDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();

const Root = () => {
  const dispatch = useAppDispatch();
  const [loadingDataFromLS, setLoadingDataFromLS] = useState<boolean>(false);
  const [failedLoading, setFailedLoading] = useState<boolean>(false);
  const { getTodosFromLS, getInitTodosFromLS } = useLocalStorage();

  useEffect(() => {
    getInitTodosFromLS().then((todos) => todos && dispatch(updateTodos(todos)));
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!failedLoading) {
        setLoadingDataFromLS(true);
        getTodosFromLS()
          .then((todos) => {
            if (todos && todos.length) dispatch(updateTodos(todos));
            setLoadingDataFromLS(false);
          })
          .catch(() => {
            setLoadingDataFromLS(false);
            setFailedLoading(true);
          });
      }
    }, 5000);

    if (failedLoading) clearInterval(timerId);
    return () => clearInterval(timerId);
  }, [dispatch, getTodosFromLS, failedLoading]);

  return (
    <Drawer.Navigator id="drawer" initialRouteName="Home">
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          title: "Главная",
          headerRight: () => (
            <SyncIndicator
              isLoad={loadingDataFromLS}
              isError={failedLoading}
              restart={() => setFailedLoading(false)}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          title: "Добавить задачу",
          headerRight: () => (
            <SyncIndicator
              isLoad={loadingDataFromLS}
              isError={failedLoading}
              restart={() => setFailedLoading(false)}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Shredder"
        component={Shredder}
        options={{
          title: "Корзина",
          headerRight: () => (
            <SyncIndicator
              isLoad={loadingDataFromLS}
              isError={failedLoading}
              restart={() => setFailedLoading(false)}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const Navigation = () => (
  <Stack.Navigator id="stack">
    <Stack.Screen
      name="Root"
      component={Root}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="UpdateTodo"
      component={UpdateTodo}
      options={{
        title: "Редактирование todo",
      }}
    />
  </Stack.Navigator>
);

export default Navigation;
