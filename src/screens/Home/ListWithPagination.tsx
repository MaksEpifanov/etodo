import { FlatList } from "react-native";
import PaginationDot from "react-native-animated-pagination-dot";

import { useAppSelector, useAppDispatch } from "../../store/store.hooks";

import TodoItem from "../../components/TodoItem";
import type { ITodo } from "../../types";
import type { RootDrawerScreenProps } from "../../navigation/types";

import { Container, EndText, EndView, PagDots } from "./Home.styles";
import { setCurrentPage } from "../../store/features/pagination/pagination.slice";

interface IListWithPaginationProps {
  FiltersComponent: JSX.Element;
  navigation: RootDrawerScreenProps<"Home">["navigation"];
}

const ListWithPagination = ({
  FiltersComponent,
  navigation,
}: IListWithPaginationProps) => {
  const dispatch = useAppDispatch();

  const { data: currentData, filteredData } = useAppSelector(
    ({ todos }) => todos
  );
  const { onFilter } = useAppSelector(({ filter }) => filter);
  const { currentPage, maxPage, limitItems } = useAppSelector(
    ({ pagination }) => pagination
  );

  return (
    <Container>
      <FlatList<ITodo>
        data={
          onFilter
            ? filteredData.slice(0, 15)
            : currentData.slice(0, currentPage * limitItems)
        }
        renderItem={({ item }) => (
          <TodoItem todo={item} navigation={navigation} />
        )}
        onEndReached={() => !onFilter && dispatch(setCurrentPage())}
        ListFooterComponent={
          currentPage === maxPage && onFilter ? (
            <EndView>
              <EndText>Конец списка</EndText>
            </EndView>
          ) : null
        }
        ListHeaderComponent={FiltersComponent}
      />
      <PagDots>
        {maxPage > 1 && !onFilter && (
          <PaginationDot
            activeDotColor="black"
            curPage={currentPage - 1}
            maxPage={maxPage}
            vertical
          />
        )}
      </PagDots>
    </Container>
  );
};

export default ListWithPagination;
