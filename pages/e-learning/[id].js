import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { CLIENT_AXIOS } from "../../client/clientAxios";
import Link from "next/link";
import MarkdownEditor from "../../components/MarkdownEditor";
import ReactMarkdown from "react-markdown";

const eLearningDetail = ({ id }) => {
  const [subject, setSubject] = useState({});

  const fetchSubjectDetail = async () => {
    let user;
    try {
      user = JSON.parse(localStorage.getItem("user"));
    } catch (err) {
      console.log(err);
    }

    const res = await CLIENT_AXIOS.get(`/students/subjects/${id}`);
    console.log(res.data);
    setSubject(res.data);
  };

  useEffect(() => {
    fetchSubjectDetail();
  }, []);

  // essay
  const initialState = {
    content: "",
  };

  const [formInput, setFormInput] = useState(initialState);

  const handleMarkdown = ({ text }) => {
    setFormInput({ ...formInput, content: text });
  };

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
              <div className="mb-0 mt-4">
                <a
                  href={subject.gmeet}
                  target="_blank"
                  className="btn btn-warning"
                >
                  Gabung
                </a>
              </div>
            </div>
            <div className="col-auto">
              <i className="fas fa-video fa-2x text-gray-300"></i>
            </div>
          </div>
        </div>
      </div>

      <div class="accordion" id="subjectMattersAccordion">
        {subject.subjectMatters
          ? subject.subjectMatters.map((matters) => {
              return (
                <div class="card">
                  <div class="card-header" id={`matters${matters.id}`}>
                    <h2 class="mb-0">
                      <button
                        class="btn btn-link btn-block text-left"
                        type="button"
                        data-toggle="collapse"
                        data-target={`#mattersCollapse${matters.id}`}
                        aria-expanded="true"
                        aria-controls={`mattersCollapse${matters.id}`}
                      >
                        <span className="h5 font-weight-bold">
                          {matters.title}
                        </span>{" "}
                        (<i>Estimasi {matters.estimation} menit</i>)
                      </button>
                    </h2>
                  </div>

                  <div
                    id={`mattersCollapse${matters.id}`}
                    class="collapse"
                    aria-labelledby={`matters${matters.id}`}
                    data-parent="#subjectMattersAccordion"
                  >
                    <div class="card-body">
                      {matters.video ? (
                        <>
                          <div className="text-center mb-4">
                            <iframe
                              width="560"
                              height="315"
                              src={`https://www.youtube.com/embed/${
                                matters.video ? matters.video.substr(32) : null
                              }`}
                              frameborder="0"
                              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                            ></iframe>
                            <p>Yuk simak video berikut</p>
                          </div>
                        </>
                      ) : null}
                      <ReactMarkdown source={matters.subject_matter} />
                      {matters.essay ? (
                        <>
                          <div className="form-group">
                            <label>{matters.essay}</label>
                            <MarkdownEditor
                              onChange={handleMarkdown}
                              value={formInput.content}
                            />
                          </div>
                          <button className="btn btn-primary">Simpan</button>
                        </>
                      ) : null}
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

eLearningDetail.getInitialProps = async ({ query: { id } }) => {
  return {
    id,
  };
};

export default eLearningDetail;
