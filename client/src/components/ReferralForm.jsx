import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { addCandidate } from "../api";
import "../App.css";

const ReferralForm = () => {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const isLoggedIn = token ? true : false;
  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
  }, [isLoggedIn]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      jobTitle: "",
      resume: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email format").required("Required"),
      phone: Yup.string().required("Required"),
      jobTitle: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      const candidateData = {
        name: values.name,
        email: values.email,
        phone: values.phone,
        jobTitle: values.jobTitle,
        status: "Pending",
      };

      if (file) {
        candidateData.resume = file;
      }

      await addCandidate(candidateData);
    },
  });

  return (
    <div className="form-container">
      <h2 className="form-heading">Submit a Candidate Referral</h2>
      <form onSubmit={formik.handleSubmit} className="form">
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Candidate Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="form-input"
          />
          {formik.errors.name && (
            <div className="error-message">{formik.errors.name}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="form-input"
          />
          {formik.errors.email && (
            <div className="error-message">{formik.errors.email}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            className="form-input"
          />
          {formik.errors.phone && (
            <div className="error-message">{formik.errors.phone}</div>
          )}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="jobTitle"
            placeholder="Job Title"
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            className="form-input"
          />
          {formik.errors.jobTitle && (
            <div className="error-message">{formik.errors.jobTitle}</div>
          )}
        </div>

        <div className="form-resume">
          <label>
            Add Resume
            <input
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                console.log("Selected File:", e.target.files[0]);
              }}
              accept=".pdf"
              className="file-input"
            />
          </label>
          {file && (
            <div className="file-name">
              <p>Selected File: {file.name}</p>
            </div>
          )}
        </div>

        {!isLoggedIn ? (
          <div className="not-logged-in-message">
            <p>Please sign in first to view and refer a candidate.</p>
          </div>
        ) : (
          <button type="submit" className="submit-btn">
            Submit Referral
          </button>
        )}
      </form>
    </div>
  );
};

export default ReferralForm;
