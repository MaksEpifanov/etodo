import { Radio, RadioGroup } from "@ui-kitten/components";
import { useAppSelector, useAppDispatch } from "../../store/store.hooks";
import { changeCompleted } from "../../store/features/filter/filter.slice";

const CompletedFilter = () => {
  const dispatch = useAppDispatch();
  const { completed } = useAppSelector((state) => state.filter);

  return (
    <RadioGroup
      selectedIndex={completed}
      onChange={(index) => dispatch(changeCompleted(index))}
      style={{ flexDirection: "row" }}
    >
      <Radio>Все</Radio>
      <Radio>Выполненные</Radio>
      <Radio>Не выполненные</Radio>
    </RadioGroup>
  );
};

export default CompletedFilter;
