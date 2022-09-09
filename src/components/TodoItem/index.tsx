import moment from "moment";
import { CheckBox, Button, Icon, Layout, Divider } from "@ui-kitten/components";

import {
  Container,
  Main,
  Controls,
  Dates,
  DateText,
  Description,
  Title,
  Sep,
} from "./TodoItem.styles";

import type { ITodo } from "../../types";
import type { RootDrawerScreenProps } from "../../navigation/types";

import { toggleComplete } from "../../store/features/todos/todos.slice";
import { useAppDispatch } from "../../store/store.hooks";
import DeleteModal from "../DeleteModal/index";
import { addItemToShredder } from "../../store/features/shredder/shredder.slice";

moment.locale("ru");

interface ITodoProps {
  todo: ITodo;
  navigation: RootDrawerScreenProps<"Home">["navigation"];
}

const TodoItem = ({ todo, navigation }: ITodoProps) => {
  const dispatch = useAppDispatch();

  return (
    <Container>
      <Controls>
        <CheckBox
          onChange={() => dispatch(toggleComplete(todo.id))}
          checked={todo.completed}
          style={{ padding: 0 }}
        />
        <Layout>
          <Button
            size="tiny"
            accessoryLeft={<Icon name="edit" />}
            style={{ width: 25, height: 25 }}
            appearance="outline"
            status="basic"
            onPress={() =>
              navigation.navigate("UpdateTodo", { todoId: todo.id })
            }
          />
          <Divider />
          <DeleteModal onDelete={() => dispatch(addItemToShredder(todo))} />
        </Layout>
      </Controls>
      <Main>
        <Title>{todo.title}</Title>
        <Dates>
          <DateText>{moment(todo.dateIn).format("ll")}</DateText>
          <Sep> - </Sep>
          <DateText>{moment(todo.dateOut).format("ll")}</DateText>
        </Dates>
        <Description>{todo.description}</Description>
      </Main>
    </Container>
  );
};

export default TodoItem;
