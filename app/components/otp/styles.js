import styled from "styled-components/native";

export const OTPInputContainer = styled.View`
  justify-content: center;
`;

export const SplitOTPBoxesContainer = styled.Pressable`
  width: 80%;
  flex-direction: row;
  justify-content: space-evenly;
  marigin: 20px;
`;

export const SplitBoxText = styled.Text`
  font-size: 20px;
  text-align: center;
  color: black;
  type: number;
`;

export const SplitBoxes = styled.View`
  border-color: #d9d9d9;
  border-width: 1px;
  background-color: #fff;
  border-radius: 5px;
  padding: 15px;
  marigin: 20px;
  min-width: 50px;
  min-height: 30px;
`;

export const SplitBoxesFocused = styled(SplitBoxes)`
  border-color: black;
  color: black;
  justify-content: space-evenly;
`;

export const TextInputHidden = styled.TextInput`
  position: absolute;
  opacity: 0;
  type: number;
`;

export const ButtonContainer = styled.TouchableOpacity`
  background-color: #d8e9a8;
  padding: 20px;
  justify-content: center;
  align-items: center;
  width: 200px;
  margin-top: 30px;
`;

export const ButtonText = styled.Text`
  color: black;
  font-size: 20px;
`;
