import Layout from "../../components/Layout";
import { CLIENT_AXIOS } from "../../client/clientAxios";
import { useEffect, useState } from "react";
import swal from "sweetalert";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const index = ({ id }) => {
  const [subject, setSubject] = useState({});

  const fetchArtikel = async () => {
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.log(err);
    }

    const res = await CLIENT_AXIOS.get(`/teachers/subjects/${id}`, {
      headers: {
        Authorization: `Bearer ${user.access_token.token}`,
      },
    });

    console.log(res.data);

    setSubject(res.data);
  };

  useEffect(() => {
    fetchArtikel();
  }, []);

  return (
    <Layout>
      <h1 className="h3 mb-4 text-gray-800">
        {subject.name} Kelas {subject.grade}
      </h1>
      <div className="card border-left-primary shadow h-100 py-2 mb-4">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="h5 font-weight-bold text-primary text-uppercase mb-1">
                Kelas Tatap Muka
              </div>
              <div className="mt-4 font-weight-bold">
                <a
                  className="btn btn-primary"
                  href={subject.gmeet}
                  target="_blank"
                >
                  Mulai
                </a>
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-pen fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="card border-left-primary shadow h-100 py-2 mb-4">
        <div className="card-body">
          <div className="row no-gutters align-items-center">
            <div className="col mr-2">
              <div className="h5 font-weight-bold text-primary text-uppercase mb-1">
                Daftar Kelas Mengajar
              </div>
              <div className="mt-4 font-weight-bold">
                <ol>
                  {subject.classroomSubjects
                    ? subject.classroomSubjects.map((subject) => {
                        return (
                          <li>
                            <Link
                              href="/kelas-mengajar/[classroomId]"
                              as={`/kelas-mengajar/${subject.classroom.id}`}
                            >
                              <a>
                                {subject.classroom ? (
                                  <span>
                                    {subject.classroom.grade}{" "}
                                    {subject.classroom
                                      ? subject.classroom.major.name
                                      : null}{" "}
                                    {subject.classroom.code}
                                  </span>
                                ) : null}
                              </a>
                            </Link>
                          </li>
                        );
                      })
                    : null}
                </ol>
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-pen fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>
      <Link href="/subjects/tambah">
        <a className="btn btn-primary mb-4 shadow">
          <i className="fas fa-plus mr-2"></i>Tambah Baru
        </a>
      </Link>
      <div className="card shadow mb-4">
        <div className="card-header py-3">
          <h6 className="m-0 font-weight-bold text-primary">
            Data Mata Pelajaran
          </h6>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-bordered"
              width="100%"
              cellSpacing="0"
            >
              <thead>
                <tr>
                  <th>Judul</th>
                  <th>Isi Materi</th>
                  <th>Durasi membaca</th>
                  <th>Esai</th>
                  <th>Video</th>
                  <th>Opsi</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <th>Judul</th>
                  <th>Isi Materi</th>
                  <th>Durasi membaca</th>
                  <th>Esai</th>
                  <th>Video</th>
                  <th>Opsi</th>
                </tr>
              </tfoot>
              <tbody>
                {subject.subjectMatters
                  ? subject.subjectMatters.map((matters) => {
                      return (
                        <tr key={matters.id}>
                          <td>{matters.title}</td>
                          <td>
                            <ReactMarkdown source={matters.subject_matter} />
                          </td>
                          <td>{matters.estimation} menit</td>
                          <td>{matters.essay}</td>
                          <td>
                            {matters.video ? (
                              <iframe
                                width="560"
                                height="315"
                                src={`https://www.youtube.com/embed/${
                                  matters.video
                                    ? matters.video.substr(32)
                                    : null
                                }`}
                                frameborder="0"
                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen
                              ></iframe>
                            ) : (
                              "-"
                            )}
                          </td>
                          <td>
                            <Link
                              href="/mata-pelajaran/[id]"
                              as={`/mata-pelajaran/${subject.id}`}
                            >
                              <a className="btn btn-info mr-2">Detail</a>
                            </Link>
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary dropdown-toggle"
                                type="button"
                                id="dropdownMenuButton"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                              >
                                Opsi
                              </button>
                              <div
                                className="dropdown-menu"
                                aria-labelledby="dropdownMenuButton"
                              >
                                <a className="dropdown-item" href="#!">
                                  Publik
                                </a>
                                <a className="dropdown-item" href="#!">
                                  Internal
                                </a>
                                <a className="dropdown-item" href="#!">
                                  Sembunyikan
                                </a>
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  : null}
                {/* {subjects.map((subject) => {
                  return (
                    <tr key={subject.id}>
                      <td>{subject.name}</td>
                      <td>{subject.grade}</td>
                      <td>
                        <a
                          className="btn btn-primary"
                          href={subject.gmeet}
                          target="_blank"
                        >
                          Mulai
                        </a>
                      </td>
                      <td>
                        <div className="dropdown">
                          <Link
                            href="/mata-pelajaran/[id]"
                            as={`/mata-pelajaran/${subject.id}`}
                          >
                            <a className="btn btn-info mr-2">Detail</a>
                          </Link>
                          <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            id="dropdownMenuButton"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                          >
                            Opsi
                          </button>
                          <div
                            className="dropdown-menu"
                            aria-labelledby="dropdownMenuButton"
                          >
                            <a className="dropdown-item" href="#!">
                              Publik
                            </a>
                            <a className="dropdown-item" href="#!">
                              Internal
                            </a>
                            <a className="dropdown-item" href="#!">
                              Sembunyikan
                            </a>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

index.getInitialProps = async ({ query: { id } }) => {
  return {
    id,
  };
};

export default index;
