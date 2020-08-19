import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import swal from "sweetalert";

const AuthLayout = ({ children }) => {
  const router = useRouter();

  try {
    if (localStorage.getItem("user")) {
      router.push("/");
    }
  } catch (err) {
    swal("Berhasil!", "Username dan password terdaftar!", "success");
  }
  return (
    <div className="bg-gradient-primary">
      <div class="container">
        {/* <!-- Outer Row --> */}
        <div class="row justify-content-center">
          <div class="col-xl-10 col-lg-12 col-md-9">
            <div class="card o-hidden border-0 shadow-lg my-5">
              <div class="card-body p-0">
                {/* <!-- Nested Row within Card Body --> */}
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-block bg-login-image"></div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      {children}
                      <hr />
                      <Link href="/login/[role]" as="/login/siswa">
                        <a className="btn btn-secondary btn-block">
                          <i className="fas fa-user fa-fw mr-2"></i> Login Siswa
                        </a>
                      </Link>
                      <Link href="/login/[role]" as="/login/guru">
                        <a className="btn btn-facebook btn-block">
                          <i className="fas fa-chalkboard-teacher fa-fw mr-2"></i>{" "}
                          Login Guru
                        </a>
                      </Link>
                      <Link href="/login/[role]" as="/login/orang-tua">
                        <a className="btn btn-google btn-block">
                          <i className="fas fa-users fa-fw mr-2"></i> Login
                          Orang Tua
                        </a>
                      </Link>
                      <hr />
                      <div className="text-center">
                        &copy;SMKN 26 Jakarta. <br /> Powered by GoEnt Smart
                        School
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
