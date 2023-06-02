import * as yup from "yup";

const eduValidationSchema = yup.object().shape({
  inisitute: yup.string().required("Institute Name is Required"),
  eduaction_level: yup.string().required("Education level is Required"),
  Grade: yup.string().required("Grade is Required"),
});

export default eduValidationSchema;
