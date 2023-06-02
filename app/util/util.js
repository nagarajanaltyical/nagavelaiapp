const someCommonValues = ["common", "values"];
let selecetedLanguage = "";

export const doSomethingWithInput = (theInput) => {
  //Do something with the input

  return theInput;
};

export const changeLanguage = (lang) => {
  selecetedLanguage = lang;
};

export const getSelectedLanguage = () => {
  return selecetedLanguage;
};
