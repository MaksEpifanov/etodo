import moment from "moment";

import {
  Container,
  Dates,
  DateText,
  Description,
  Title,
  Sep,
} from "./ShredderItem.styles";

import type { ITodo } from "../../types";

moment.locale("ru");

interface ITodoProps {
  todo: ITodo;
}

const TodoItem = ({ todo }: ITodoProps) => (
  <Container>
    <Title>{todo.title}</Title>
    <Dates>
      <DateText>{moment(todo.dateIn).format("ll")}</DateText>
      <Sep> - </Sep>
      <DateText>{moment(todo.dateOut).format("ll")}</DateText>
    </Dates>
    <Description>{todo.description}</Description>
  </Container>
);

export default TodoItem;
