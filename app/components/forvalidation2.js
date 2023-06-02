import * as yup from "yup";

const loginValidationSchema2 = yup.object().shape({
  email: yup.string().email("Please enter valid email"),
  phone_number: yup.number(),
  first_name: yup.string(),
  last_name: yup.string(),
  location: yup.string(),
});

export default loginValidationSchema2;
