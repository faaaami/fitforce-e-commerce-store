import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// -- Yup Validation Schema --
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  address: yup.string(),
  phone: yup.string().matches(/^[0-9]+$/, "Phone must be numbers"),
  age: yup.number().min(12, "Age must be 12 or above").required("Age is required"),
});
export default y;