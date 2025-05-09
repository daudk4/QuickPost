import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import validate_signup_form from "../schema/signup";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      age: "",
      email: "",
      password: "",
    },
    validationSchema: validate_signup_form,
    onSubmit: (values, { setSubmitting }) => {
      // In a real app, you would submit to your backend here
      console.log("Form values:", values);
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 500);
    },
  });

  return (
    <div className="bg-zinc-900 text-white min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-5 bg-zinc-800 rounded-lg shadow-lg">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold tracking-tight">Create Account</h1>
        </div>

        <div className="space-y-3">
          <div>
            <label
              htmlFor="username"
              className="text-xs font-medium text-zinc-300"
            >
              Username
            </label>
            <div
              className={`relative border rounded-lg transition-colors ${
                formik.touched.username && formik.errors.username
                  ? "border-red-400"
                  : "border-zinc-600"
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <i className="fas fa-user text-zinc-500 text-xs"></i>
              </div>
              <input
                id="username"
                name="username"
                className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                type="text"
                placeholder="Choose a username"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.username}
              />
            </div>
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-400 text-xs mt-0.5">
                {formik.errors.username}
              </p>
            ) : null}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="name"
                className="text-xs font-medium text-zinc-300"
              >
                Full Name
              </label>
              <div
                className={`relative border rounded-lg transition-colors ${
                  formik.touched.name && formik.errors.name
                    ? "border-red-400"
                    : "border-zinc-600"
                }`}
              >
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <i className="fas fa-id-card text-zinc-500 text-xs"></i>
                </div>
                <input
                  id="name"
                  name="name"
                  className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                  type="text"
                  placeholder="Your name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
              </div>
              {formik.touched.name && formik.errors.name ? (
                <p className="text-red-400 text-xs mt-0.5">
                  {formik.errors.name}
                </p>
              ) : null}
            </div>

            <div>
              <label
                htmlFor="age"
                className="text-xs font-medium text-zinc-300"
              >
                Age
              </label>
              <div
                className={`relative border rounded-lg transition-colors ${
                  formik.touched.age && formik.errors.age
                    ? "border-red-400"
                    : "border-zinc-600"
                }`}
              >
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                  <i className="fas fa-calendar text-zinc-500 text-xs"></i>
                </div>
                <input
                  id="age"
                  name="age"
                  className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                  type="number"
                  min="18"
                  max="120"
                  placeholder="Age"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.age}
                />
              </div>
              {formik.touched.age && formik.errors.age ? (
                <p className="text-red-400 text-xs mt-0.5">
                  {formik.errors.age}
                </p>
              ) : null}
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-xs font-medium text-zinc-300"
            >
              Email Address
            </label>
            <div
              className={`relative border rounded-lg transition-colors ${
                formik.touched.email && formik.errors.email
                  ? "border-red-400"
                  : "border-zinc-600"
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <i className="fas fa-envelope text-zinc-500 text-xs"></i>
              </div>
              <input
                id="email"
                name="email"
                className="w-full bg-transparent px-7 py-2 outline-none rounded-lg text-sm"
                type="email"
                placeholder="your.email@example.com"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-400 text-xs mt-0.5">
                {formik.errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-xs font-medium text-zinc-300"
            >
              Password
            </label>
            <div
              className={`relative border rounded-lg transition-colors ${
                formik.touched.password && formik.errors.password
                  ? "border-red-400"
                  : "border-zinc-600"
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                <i className="fas fa-lock text-zinc-500 text-xs"></i>
              </div>
              <input
                id="password"
                name="password"
                className="w-full bg-transparent px-7 py-2 pr-8 outline-none rounded-lg text-sm"
                type={showPassword ? "text" : "password"}
                placeholder="Create a secure password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />
              <div className="absolute inset-y-0 right-0 pr-2 flex items-center">
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-zinc-500 hover:text-zinc-300 focus:outline-none"
                >
                  <i
                    className={`fas ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    } text-xs`}
                  ></i>
                </button>
              </div>
            </div>
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-400 text-xs mt-0.5">
                {formik.errors.password}
              </p>
            ) : null}
            <p className="text-zinc-400 text-xs">
              Must be at least 8 characters
            </p>
          </div>

          <button
            className="w-full mt-4 py-2 px-4 bg-blue-600 hover:bg-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-medium rounded-lg transition-all duration-150 flex items-center justify-center text-sm cursor-pointer"
            type="button"
            onClick={formik.handleSubmit}
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Creating..." : "Create Account"}
            {!formik.isSubmitting && (
              <i className="fas fa-arrow-right ml-2 text-xs"></i>
            )}
          </button>
        </div>

        <div className="mt-3 text-center text-xs text-zinc-400">
          <p>
            Already have an account?{" "}
            <a href="/signin" className="text-blue-400 hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
