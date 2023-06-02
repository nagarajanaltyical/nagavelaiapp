import * as yup from "yup";

const workvalidationSchema = yup.object().shape({
  company_name: yup.string().required("Company name is Required"),
  industry: yup.string().required("Industry Type is Required"),
  Designation: yup.string().required("Designation is Required"),
  job_description: yup
    .string()
    .required("Job description is required")
    .min(10, "your job description must have atleast 10 words"),
});

export default workvalidationSchema;
