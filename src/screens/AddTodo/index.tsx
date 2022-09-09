import { useState } from "react";
import uuid from "react-uuid";

import {
  Datepicker,
  Input,
  Button,
  Modal,
  Card,
  Text,
  Layout,
} from "@ui-kitten/components";

import moment from "moment";
import { Container, Item, Label, DateItems, DateItem } from "./AddTodo.styles";
import type { ITodo } from "../../types/index";
import { useAppDispatch } from "../../store/store.hooks";
import { addTodo } from "../../store/features/todos/todos.slice";
import { RootDrawerScreenProps } from "../../navigation/types";

const AddTodo = ({ navigation }: RootDrawerScreenProps<"AddTodo">) => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dateIn, setDateIn] = useState<Date>(new Date());
  const [dateOut, setDateOut] = useState<Date>(
    new Date(Date.now() + 3600 * 1000 * 24)
  );

  const [visible, setVisible] = useState<boolean>(false);

  const clearFields = () => {
    setTitle("");
    setDescription("");
    setDateIn(new Date());
    setDateOut(new Date(Date.now() + 3600 * 1000 * 24));
  };

  const onSubmit = () => {
    if (!title || !description) return setVisible(true);

    const result: ITodo = {
      id: uuid(),
      completed: false,
      created: Date.now(),
      dateIn: +moment(dateIn).format("x"),
      dateOut: +moment(dateOut).format("x"),
      description,
      title,
    };
    dispatch(addTodo(result));
    clearFields();
    return navigation.navigate("Home");
  };

  return (
    <Container>
      <Item>
        <Label>Введите заголовок</Label>
        <Input
          placeholder="Заголовок"
          value={title}
          onChangeText={(nextValue) => setTitle(nextValue)}
        />
      </Item>
      <DateItems>
        <DateItem>
          <Label>Дата начала</Label>
          <Datepicker
            date={dateIn}
            onSelect={(nextDate) => setDateIn(nextDate)}
          />
        </DateItem>
        <DateItem>
          <Label>Дата конца</Label>
          <Datepicker
            date={dateOut}
            onSelect={(nextDate) => setDateOut(nextDate)}
          />
        </DateItem>
      </DateItems>
      <Item>
        <Label>Введите описание</Label>
        <Input
          multiline
          placeholder="Описание"
          textStyle={{ minHeight: 64 }}
          value={description}
          onChangeText={(nextValue) => setDescription(nextValue)}
        />
      </Item>
      <Button onPress={() => onSubmit()}>Добавить</Button>

      <Modal
        visible={visible}
        backdropStyle={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        onBackdropPress={() => setVisible(false)}
      >
        <Card>
          <Text>Заполните все поля</Text>
          <Layout style={{ marginTop: 20 }}>
            <Button onPress={() => setVisible(false)}>Ок</Button>
          </Layout>
        </Card>
      </Modal>
    </Container>
  );
};

export default AddTodo;
