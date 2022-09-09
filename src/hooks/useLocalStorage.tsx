import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITodo } from "../types/index";

const useLocalStorage = () => {
  const storeTodosToLS = async (value: ITodo[]) => {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("@todos", jsonValue);
  };
  const getTodosFromLS = () =>
    new Promise<ITodo[]>((resolve, reject) => {
      const random = Math.floor(Math.random() * 11);
      setTimeout(async () => {
        try {
          const jsonValue = await AsyncStorage.getItem("@todos");
          const res: ITodo[] = jsonValue != null ? JSON.parse(jsonValue) : null;
          if (random < 6) {
            resolve(res);
          } else {
            reject();
          }
        } catch (e) {
          reject(e);
        }
      }, 500);
    });

  const getInitTodosFromLS = async () => {
    const jsonValue = await AsyncStorage.getItem("@todos");
    const res: ITodo[] = jsonValue != null ? JSON.parse(jsonValue) : null;
    return res;
  };

  return { storeTodosToLS, getTodosFromLS, getInitTodosFromLS };
};

export default useLocalStorage;
