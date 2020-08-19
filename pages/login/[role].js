import React, { useState } from "react";
import AuthLayout from "../../components/AuthLayout";
import Input from "../../components/Input";
import { CLIENT_AXIOS } from "../../client/clientAxios";
import swal from "sweetalert";
import { useRouter } from "next/router";

const index = ({ role }) => {
  const router = useRouter();

  const initialState = {
    username: "",
    password: "",
  };

  const [formInput, setFormInput] = useState(initialState);

  const handleChange = (e) => {
    setFormInput({ ...formInput, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await CLIENT_AXIOS.post("/auth/login", {
      username: formInput.username,
      password: formInput.password,
    });

    if (res) {
      setFormInput(initialState);
      swal("Berhasil!", "Username dan password terdaftar!", "success");
      localStorage.setItem("user", JSON.stringify(res.data));
      router.push("/");
    }
  };

  if (role === "siswa") {
    return (
      <div>
        <AuthLayout>
          <div className="text-center">
            <h1 className="h4 text-gray-900">
              GoEnt Smart School <br /> Login Siswa
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              onChange={handleChange}
              value={formInput.username}
              id="username"
              label="NIS"
            />
            <Input
              onChange={handleChange}
              value={formInput.password}
              type="password"
              id="password"
              label="Password"
            />
            <button className="btn btn-primary btn-block">Login</button>
          </form>
        </AuthLayout>
      </div>
    );
  } else if (role === "guru") {
    return (
      <div>
        <AuthLayout>
          <div className="text-center">
            <h1 className="h4 text-gray-900">
              GoEnt Smart School <br /> Login Guru
            </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <Input
              onChange={handleChange}
              value={formInput.username}
              id="username"
              label="Whatsapp"
            />
            <Input
              onChange={handleChange}
              value={formInput.password}
              type="password"
              id="password"
              label="Password"
            />
            <button className="btn btn-primary btn-block">Login</button>
          </form>
        </AuthLayout>
      </div>
    );
  } else {
    return (
      <div>
        <AuthLayout>
          <div className="text-center">
            <h1 className="h4 text-gray-900">
              GoEnt Smart School <br /> Login Orang Tua
            </h1>
          </div>
          <form>
            <Input
              onChange={handleChange}
              value={formInput.username}
              id="username"
              label="NIS"
            />
            <Input
              onChange={handleChange}
              value={formInput.password}
              type="password"
              id="password"
              label="Password"
            />
            <button className="btn btn-primary btn-block">Login</button>
          </form>
        </AuthLayout>
      </div>
    );
  }
};

export function getServerSideProps({ query }) {
  return {
    props: {
      role: query.role,
    },
  };
}

export default index;
