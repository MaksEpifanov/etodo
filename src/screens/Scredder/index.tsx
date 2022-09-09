import { Button } from "@ui-kitten/components";
import { FlatList } from "react-native";

import { useAppSelector, useAppDispatch } from "../../store/store.hooks";

import ShredderItem from "../../components/ShredderItem";
import type { ITodo } from "../../types";

import { Container, ClearButton, EmptyText } from "./Shredder.styles";
import { cleanShredder } from "../../store/features/shredder/shredder.slice";

const ListWithPagination = () => {
  const dispatch = useAppDispatch();

  const currentData = useAppSelector(({ shredder }) => shredder.data);

  return (
    <Container>
      {currentData.length > 0 ? (
        <>
          <ClearButton>
            <Button onPress={() => dispatch(cleanShredder())}>
              Очистить корзину
            </Button>
          </ClearButton>
          <FlatList<ITodo>
            data={currentData}
            renderItem={({ item }) => <ShredderItem todo={item} />}
          />
        </>
      ) : (
        <EmptyText>В корзине пусто</EmptyText>
      )}
    </Container>
  );
};

export default ListWithPagination;
