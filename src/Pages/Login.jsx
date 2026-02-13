import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import api from "../Services/Api";
import { loginSchema } from "../Validations/authschema";
import { useAuth } from "../Contexts/AuthContext";  
import Navbar from "../Components/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      try {
        const res = await api.get("/users");
        const users = res.data;

        const user = users.find(
          (u) => u.email === values.email && u.password === values.password
        );

        if (!user) {
          alert("Invalid email or password");
          return;
        }

        login(user); 
        navigate("/"); 
      } catch (err) {
        console.log("Login error", err);
      }
    },
  });

  return (
    <>
    <Navbar/>
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full max-w-sm bg-white rounded-2xl border-2 border-yellow-400 p-5 space-y-4"
      >
        {/* heading */}
        <h2 className="text-xl font-extrabold text-black text-center">
          LOGIN
        </h2>
        <p className="text-center text-xs text-black/60">
          Welcome back. Stay strong.
        </p>

        {/* email */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="w-full rounded-xl border-2 border-black px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-xs text-yellow-500 mt-1">
              {formik.errors.email}
            </p>
          )}
        </div>

        {/* password */}
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="w-full rounded-xl border-2 border-black px-3 py-2 text-sm focus:outline-none focus:border-yellow-400"
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-xs text-yellow-500 mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        {/* button */}
        <button
          type="submit"
          className="w-full bg-black text-yellow-400 font-bold py-2 rounded-xl border-2 border-black hover:bg-yellow-400 hover:text-black transition"
        >
          LOGIN
        </button>

        {/* signup link */}
        <p className="text-center text-xs text-black">
          New here?{" "}
          <span
            onClick={() => navigate("/signin")}
            className="font-bold cursor-pointer hover:underline"
          >
            Create an account
          </span>
        </p>
      </form>
    </div>
    </>
  );
};

export default Login;
