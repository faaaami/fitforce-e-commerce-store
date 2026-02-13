import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import api from "../Services/api";
import { signupSchema } from "../Validations/authschema";
import Navbar from "../Components/Navbar";

const Signup = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      role: "user",
      cart: [],
      orders: [],
    },
    validationSchema: signupSchema,
    onSubmit: async (values) => {
      const newUser = { ...values, cart: [] };

      try {
        await api.post("/users", newUser);
        alert("Signup Successful");
        navigate("/login");
      } catch (err) {
        console.log("Signup error", err);
      }
    },
  });

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl border-2 border-yellow-400 p-5 space-y-3"
      >
        {/* Heading */}
        <h2 className="text-xl font-extrabold text-black text-center">
          SIGN UP
        </h2>
        <p className="text-center text-xs text-black/60">
          Create your account
        </p>

        {/* Inputs */}
        {[
          { name: "name", type: "text", placeholder: "Full Name" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "phone", type: "text", placeholder: "Phone" },
          { name: "password", type: "password", placeholder: "Password" },
          { name: "confirmpassword", type: "password", placeholder: "Confirm Password" },
        ].map((field) => (
          <div key={field.name}>
            <input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values[field.name]}
              className="
                w-full
                rounded-xl
                border-2
                border-black
                px-3
                py-2
                text-sm
                focus:outline-none
                focus:border-yellow-400
              "
            />
            {formik.touched[field.name] && formik.errors[field.name] && (
              <p className="text-xs text-yellow-500 mt-1">
                {formik.errors[field.name]}
              </p>
            )}
          </div>
        ))}

        {/* Button */}
        <button
          type="submit"
          className="
            w-full
            bg-black
            text-yellow-400
            font-bold
            py-2
            rounded-xl
            border-2
            border-black
            hover:bg-yellow-400
            hover:text-black
            transition
          "
        >
          CREATE ACCOUNT
        </button>

        {/* Login Link */}
        <p className="text-center text-xs text-black">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-bold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
    </>
  );
};

export default Signup;
