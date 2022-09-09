import { useState, useEffect } from "react";
import { Input, Text, Datepicker, Button } from "@ui-kitten/components";
import moment from "moment";
import {
  Container,
  Label,
  Item,
  DateItems,
  DateItem,
  CompletedItems,
  FiltersButton,
} from "./Filters.styles";
import CompletedFilter from "../CompletedFilter";

import { useAppDispatch, useAppSelector } from "../../store/store.hooks";

import {
  changeTitle,
  changeDateIn,
  changeDateOut,
  clearFilters,
  onFilter,
} from "../../store/features/filter/filter.slice";

import useDebounce from "../../hooks/useDebounce";

const Filters = () => {
  const dispatch = useAppDispatch();
  const { dateIn, dateOut } = useAppSelector((state) => state.filter);

  const [title, setTitle] = useState<string>("");
  const debTitle = useDebounce(title);

  useEffect(() => {
    dispatch(changeTitle(debTitle));
  }, [debTitle, dispatch]);

  return (
    <Container>
      <Text category="h4" style={{ textAlign: "center", marginBottom: 20 }}>
        Фильтры
      </Text>
      <Item>
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
            onSelect={(nextDate) =>
              dispatch(changeDateIn(+moment(nextDate).format("x")))
            }
          />
        </DateItem>
        <DateItem>
          <Label>Дата конца</Label>
          <Datepicker
            date={dateOut}
            onSelect={(nextDate) =>
              dispatch(changeDateOut(+moment(nextDate).format("x")))
            }
          />
        </DateItem>
      </DateItems>
      <CompletedItems>
        <CompletedFilter />
      </CompletedItems>
      <FiltersButton>
        <Button
          style={{ marginRight: 20 }}
          onPress={() => {
            setTitle("");
            dispatch(clearFilters());
          }}
        >
          Сброс
        </Button>
        <Button onPress={() => dispatch(onFilter(true))}>Отфильтровать</Button>
      </FiltersButton>
    </Container>
  );
};

export default Filters;
