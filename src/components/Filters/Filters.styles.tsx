import styled from "styled-components/native";

export const Container = styled.View`
  padding: 20px;

  background-color: #fff;
`;

export const Item = styled.View`
  margin-bottom: 10px;
`;

export const DateItem = styled.View`
  width: 45%;
`;

export const DateItems = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

export const CompletedItems = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;

export const Label = styled.Text`
  margin-bottom: 5px;
  font-weight: 600;
`;

export const FiltersButton = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 10px;
`;
