import * as Yup from "yup";

export const signupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
  confirmpassword: Yup.string().min(6)
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});
export const loginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});