import React from 'react';
import InputFormik from '../input/InputFormik';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import RadioFormik from '../radio/RadioFormik';
import { createGlobalStyle } from 'styled-components';
import CheckboxFormik from '../checkbox/CheckboxFormik';
import DropdownFormik from '../dropdown/DropdownFormik';

const dropdownData = [
  {
    id: 1,
    value: 'teacher',
    text: 'Teacher',
  },
  {
    id: 2,
    value: 'developer',
    text: 'Developer',
  },
  {
    id: 3,
    value: 'doctor',
    text: 'Doctor',
  },
  {
    id: 4,
    value: 'student',
    text: 'Student',
  },
];

const RegisterFormik = () => {
  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
        gender: 'male',
        job: '',
        term: false,
      }}
      validationSchema={yup.object({
        username: yup.string().required('Please enter your username'),
        email: yup
          .string()
          .email('Please enter valid email address')
          .required('Please enter your email address'),
        password: yup
          .string()
          .min(8, 'Your password must be at least 8 characters or greater')
          .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
            message:
              'Your password must have at least 1 uppercase,1 lowercase, 1 special characters',
          })
          .required('Please enter your password'),
        gender: yup
          .string()
          .required('Please select your gender')
          .oneOf(['male', 'female'], 'You can only select one gender'),
        job: yup
          .string()
          .required('Please select your job')
          .oneOf(['teacher', 'developer', 'doctor', 'student'], 'You can only select one'),
        term: yup.boolean().oneOf([true], 'Please check the term and conditions'),
      })}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
          resetForm();
        }, 2000);
      }}
    >
      {(formik) => {
        const watchGender = formik.values.gender;
        return (
          <form onSubmit={formik.handleSubmit} className="max-w-[300px] mx-auto my-10">
            <InputFormik
              type="text"
              name="username"
              placeholder="Enter your username"
              id="username"
              label="Username"
            ></InputFormik>
            <InputFormik
              type="email"
              name="email"
              placeholder="Enter your email"
              id="email"
              label="Email address"
            ></InputFormik>
            <InputFormik
              type="password"
              name="password"
              placeholder="Enter your password"
              id="password"
              label="Password"
            ></InputFormik>

            <div className="flex flex-col gap-3 mb-5">
              <label className="cursor-pointer">Gender</label>
              <div className="flex items-center gap-5">
                <RadioFormik
                  name="gender"
                  value="male"
                  checked={watchGender === 'male'}
                  label="Male"
                ></RadioFormik>
                <RadioFormik
                  name="gender"
                  value="female"
                  checked={watchGender === 'female'}
                  label="Female"
                ></RadioFormik>
              </div>
            </div>

            <DropdownFormik
              labelText="Your job"
              data={dropdownData}
              name="job"
              setValue={formik.setFieldValue}
            ></DropdownFormik>

            <CheckboxFormik name="term">I accpect the terms and conditions</CheckboxFormik>

            <button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full p-5 bg-blue-500 text-white rounded-lg mt-5 font-semibold"
            >
              {formik.isSubmitting ? (
                <div className="w-5 h-5 rounded-full border-2 border-t-2 border-t-transparent border-white bord mx-auto animate-spin"></div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        );
      }}
    </Formik>
  );
};

export default RegisterFormik;
