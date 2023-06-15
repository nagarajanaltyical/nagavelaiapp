import * as yup from "yup";
const regex = "^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$";
const companyValidationSchema = yup.object().shape({
  // proof
  // number
  // emailid
  designation: yup.string().required("Designation is Required"),
  location: yup.string().required("Location is Required"),
  companyname: yup.string().required("Company Name is Required"),
  username: yup.string().required("Account Manager Name is Required"),
  GST_number: yup.string().matches(regex, "Invalid GST Number"),
  website: yup.string(),
  // number: yup.number().required("number is required"),
  emailid: yup
    .string()
    .email("Please Enter Valid Email")
    .required("Email Address is Required"),
  //   location: yup.string().required("location is required"),
  // proof: yup
  //   .string()
  //   .matches(
  //     /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/,
  //     "Enter a Valid Aadhar Number"
  //   )
  //   .required("Aadhar is Required"),
  //   username: yup.string().required("username is required"),
});

export default companyValidationSchema;
