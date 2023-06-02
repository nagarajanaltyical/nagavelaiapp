import * as yup from "yup";

const providerValidationSchema = yup.object().shape({
  // number: yup.number().required("number is required"),
  emailid: yup
    .string()
    .email("Please enter valid Email")
    .required("Email Address is Required"),
  // gender:yup.string().required("gender is required"),
  location: yup.string().required("Location is Required"),
  // dropdownValue: yup.string().required("Please select an option"),
  // proof: yup
  //   .string()
  //   .matches(
  //     /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
  //     "Enter a valid Aadhar number"
  //   )
  //   .required("Aadhar is Required"),
  username: yup.string().required("Username is Required"),
});

export default providerValidationSchema;
