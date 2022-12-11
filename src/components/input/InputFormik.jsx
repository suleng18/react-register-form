import { useField } from 'formik';
import React from 'react';

const InputFormik = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  console.log('🚀 ~ field', field);
  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="cursor-pointer" htmlFor={props.id}>
        {label}
      </label>
      <input
        className="p-4 bg-white border border-gray-100 rounded-lg outline-none focus:border-blue-500 transition-all"
        {...props}
        {...field}
      ></input>
      {meta.touched && meta.error && <p className="text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};

export default InputFormik;
