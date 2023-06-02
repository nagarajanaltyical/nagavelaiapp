import * as yup from "yup";

const PostValidationSchema = yup.object().shape({
  /*   location: yup.string().required("location is required"),
   */
  Duration: yup
    .number()
    .min(1, () => `Enter a Valid duriation`)
    .required("Duration is required"),
  // job: yup
  //   .string()
  //   .min(2, ({ min }) => `job title must be atleast ${min} characters`)
  //   .required("job title is required"),
  payment: yup.number().required("Payment need to be filled"),
  e_skill_set: yup
    .string()
    .min(5, () => `Please give a more details about the skills`)
    .required("Skill need to filled"),
  Description: yup.string().required("Descripiton is required"),
  // phonenumber: yup.number().required("phonenumber is required"),
});

export default PostValidationSchema;
