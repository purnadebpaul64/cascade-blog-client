import { ArrowLeft } from "lucide-react";
import React, { use, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";

const Registration = () => {
  const [showPass, setShowPass] = useState(false);
  const [passError, setPassError] = useState([]);
  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const pass = form.password.value;
    const photo = form.photo.value;

    setPassError("");
    const errors = [];
    if (!/[A-Z]/.test(pass)) {
      errors.push("Password must contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(pass)) {
      errors.push("Password must contain at least one lowercase letter.");
    }
    if (!/\d/.test(pass)) {
      errors.push("Password must contain at least one number.");
    }
    if (pass.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    if (errors.length > 0) {
      setPassError(errors);
      return;
    }
  };
  return (
    <div className="py-5 flex flex-col gap-6 justify-center items-center">
      {/* Back to Home Link */}
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center text-muted-foreground hover:text-primary transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
      <form
        onSubmit={handleRegister}
        className="fieldset bg-base-200 border-primary rounded-box border p-4 w-screen md:w-sm"
      >
        <legend className="fieldset-legend justify-center text-xl font-bold">
          Create Account
        </legend>

        <label className="label font-semibold text-sm">Name</label>
        <input
          name="name"
          type="text"
          className="input w-full"
          placeholder="Your Name"
          required
        />

        <label className="label font-semibold text-sm">Email</label>
        <input
          name="email"
          type="email"
          className="input w-full"
          placeholder="Email"
          required
        />

        <label className="label font-semibold text-sm">PhotoURL</label>
        <input
          name="photo"
          type="text"
          className="input w-full"
          placeholder="Your Photo URL"
        />

        <label className="label font-semibold text-sm">Password</label>
        <div className="relative">
          <input
            name="password"
            type={showPass ? "text" : "password"}
            className="input w-full "
            placeholder="Password"
            required
          />
          <div
            onClick={() => {
              setShowPass(!showPass);
            }}
            className="absolute top-0 right-0 btn btn-ghost"
          >
            {showPass ? <FaEye /> : <FaEyeSlash />}
          </div>
        </div>

        {/* password validation errors */}
        {passError.length > 0 && (
          <ul className="text-red-500 list-disc list-inside mt-2">
            {passError.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}

        <button
          type="submit"
          className="btn btn-primary text-white mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm"
        >
          Register
        </button>
        <div className="divider">OR</div>
        <button className="btn bg-white text-black border-[#e5e5e5]">
          <svg
            aria-label="Google logo"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <g>
              <path d="m0 0H512V512H0" fill="#fff"></path>
              <path
                fill="#34a853"
                d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
              ></path>
              <path
                fill="#4285f4"
                d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
              ></path>
              <path
                fill="#fbbc02"
                d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
              ></path>
              <path
                fill="#ea4335"
                d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
              ></path>
            </g>
          </svg>
          Login with Google
        </button>
        <p className="text-center pt-5">
          Do You Already Have An Account ?<span> </span>
          <Link className="text-primary font-bold" to={"/auth"}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
export default Registration;
