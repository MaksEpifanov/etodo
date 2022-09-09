import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  padding: 20px 10px;

  border-bottom-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #0000005a;
`;

export const Controls = styled.View`
  padding: 5px 0;
  margin-right: 5px;
  width: 30px;
  justify-content: space-between;
  align-items: center;
`;

export const Main = styled.View`
  flex: 1;
`;

export const Title = styled.Text`
  font-size: 28px;
`;

export const Dates = styled.View`
  flex-direction: row;
  margin: 5px 0;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #00000055;
`;

export const Description = styled.Text``;

export const Sep = styled.Text`
  margin: 0 10px;
`;

export const ControlButton = styled.Button`
  width: 25px;
  height: 25px;
  border-radius: 50%;
`;
