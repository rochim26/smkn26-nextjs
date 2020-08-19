import Layout from "../../components/Layout";
import { CLIENT_AXIOS } from "../../client/clientAxios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Link from "next/link";

const index = () => {
  const [classroomSubjects, setClassroomSubjects] = useState([]);

  const fetchClassroomSubject = async () => {
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.log(err);
    }

    const res = await CLIENT_AXIOS.get("/students/classroom-subjects", {
      headers: {
        Authorization: `Bearer ${user.access_token.token}`,
      },
    });

    setClassroomSubjects(res.data);
  };

  const handleStatus = async (id, status) => {
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.log(err);
    }

    const res = await CLIENT_AXIOS.put(
      `/blogs/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${user.access_token.token}`,
        },
      }
    );

    if (res) {
      swal("Sukses!", "Anda berhasil mengupdate classroomSubjects", "success");
      fetchClassroomSubject();
    }
  };

  useEffect(() => {
    fetchClassroomSubject();
  }, []);

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">Halaman E-Learning</h1>
      <div className="row">
        {classroomSubjects.length
          ? classroomSubjects.map((subject) => {
              return (
                <div className="col-xl-3 col-md-6 mb-4" key={subject.id}>
                  <div className="card border-left-primary shadow h-100 py-2">
                    <div className="card-body">
                      <div className="row no-gutters align-items-center">
                        <div className="col mr-2">
                          <div className="h5 font-weight-bold text-primary text-uppercase mb-1">
                            {`${subject.name} Kelas ${subject.grade}`}
                          </div>
                          <div className="mb-0 mt-4">
                            <Link
                              href="/e-learning/[id]"
                              as={`/e-learning/${subject.id}`}
                            >
                              <a className="btn btn-primary mr-2">Detail</a>
                            </Link>
                            <a
                              href={subject.gmeet}
                              target="_blank"
                              className="btn btn-warning"
                            >
                              Tatap Muka
                            </a>
                          </div>
                        </div>
                        <div className="col-auto">
                          <i className="fas fa-book fa-2x text-gray-300"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </Layout>
  );
};

export default index;
