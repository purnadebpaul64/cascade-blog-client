import { ArrowLeft } from "lucide-react";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router";
import Swal from "sweetalert2";
const Login = () => {
  const [showPass, setShowPass] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.pass.value;
  };

  return (
    <div className="py-18 flex flex-col gap-6 justify-center items-center">
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
        onSubmit={handleLogin}
        className="fieldset backdrop-blur-3xl bg-slate-800/50 border-primary rounded-box w-sm border p-4"
      >
        <legend className="fieldset-legend justify-center text-xl font-bold">
          Login Your Account
        </legend>

        <label className="label text-sm font-semibold">Email</label>
        <input
          type="email"
          className="input w-full"
          placeholder="Email"
          name="email"
          required
        />

        <label className="label font-semibold text-sm">Password</label>
        <div className="relative">
          <input
            name="pass"
            required
            type={showPass ? "text" : "password"}
            className="input w-full"
            placeholder="Password"
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
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>

        <button
          type="submit"
          className="btn btn-primary text-white mt-4 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 shadow-lg hover:shadow-blue-500/25 border border-white/20 backdrop-blur-sm"
        >
          Login
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
          Dont’t Have An Account ?<span> </span>
          <Link to={"/auth/registration"} className="text-primary font-bold">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
