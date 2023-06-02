import React, { useRef, useState, useEffect } from "react";
import {
  OTPInputContainer,
  TextInputHidden,
  SplitOTPBoxesContainer,
  SplitBoxText,
  SplitBoxes,
  SplitBoxesFocused,
} from "./styles";

const OTPInput = ({ code, setCode, maximumLength, setispinready }) => {
  const inputref = useRef();
  const [isInputFocused, setIsinputFocused] = useState(false);
  const boxArray = new Array(maximumLength).fill(0);
  const handleOnBlur = () => {
    setIsinputFocused(false);
  };
  //to render the split boxes
  const boxDigit = (_, index) => {
    const emptyInput = "";
    const digit = code[index] || emptyInput;
    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    const StyledSplitBoxes =
      isInputFocused && isValueFocused ? SplitBoxesFocused : SplitBoxes;
    return (
      <StyledSplitBoxes key={index}>
        <SplitBoxText>{digit}</SplitBoxText>
      </StyledSplitBoxes>
    );
  };
  //to highlight when press
  const handleOnPress = () => {
    setIsinputFocused(true);
    inputref.current.focus();
  };
  //setISpinready
  useEffect(() => {
    // update pin ready status
    setispinready(code.length === maximumLength);
    // clean up function
    return () => {
      setispinready(false);
    };
  }, [code]);
  return (
    <OTPInputContainer>
      <SplitOTPBoxesContainer onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </SplitOTPBoxesContainer>
      <TextInputHidden
        value={code}
        onChangeText={setCode}
        maximumLength={maximumLength}
        ref={inputref}
        onBlur={handleOnBlur}
        keyboardType="numeric"
      />
    </OTPInputContainer>
  );
};

export default OTPInput;
