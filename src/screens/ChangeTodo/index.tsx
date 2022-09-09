import { useState } from "react";
import moment from "moment";
import {
  Button,
  Card,
  Datepicker,
  Input,
  Layout,
  Modal,
  Text,
} from "@ui-kitten/components";

import { RootStackScreenProps } from "../../navigation/types";
import { changeTodo } from "../../store/features/todos/todos.slice";
import { useAppDispatch, useAppSelector } from "../../store/store.hooks";

import type { ITodo } from "../../types";
import {
  Container,
  DateItem,
  DateItems,
  Item,
  Label,
} from "./ChangeTodo.styles";

const ChangeTodo = ({
  route,
  navigation,
}: RootStackScreenProps<"UpdateTodo">) => {
  const dispatch = useAppDispatch();
  const currTodo = useAppSelector((state) =>
    state.todos.data.find((todo) => todo.id === route.params.todoId)
  );

  const [title, setTitle] = useState<string | undefined>(currTodo?.title);
  const [description, setDescription] = useState<string | undefined>(
    currTodo?.description
  );
  const [dateIn, setDateIn] = useState<Date>(
    currTodo?.dateIn ? new Date(currTodo.dateIn) : new Date()
  );
  const [dateOut, setDateOut] = useState<Date>(
    currTodo?.dateOut
      ? new Date(currTodo.dateOut)
      : new Date(Date.now() + 3600 * 1000 * 24)
  );

  const [visible, setVisible] = useState<boolean | undefined>(false);

  const onSubmit = () => {
    if (!title || !description) return setVisible(true);

    if (currTodo) {
      const result: ITodo = {
        id: currTodo.id,
        completed: false,
        created: currTodo.created,
        dateIn: +moment(dateIn).format("x"),
        dateOut: +moment(dateOut).format("x"),
        description,
        title,
      };
      dispatch(changeTodo(result));
      navigation.goBack();
    }
  };

  return (
    <Container>
      <Item>
        <Label>Заголовок</Label>
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
        <Label>Описание</Label>
        <Input
          multiline
          placeholder="Описание"
          textStyle={{ minHeight: 164 }}
          value={description}
          onChangeText={(nextValue) => setDescription(nextValue)}
        />
      </Item>
      <Button onPress={() => onSubmit()}>Обновить</Button>

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

export default ChangeTodo;
