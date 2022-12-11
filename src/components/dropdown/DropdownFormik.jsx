import { useField } from 'formik';
import React, { useEffect, useState } from 'react';
import useClickOutSide from '../../hook/UseClickOutSide';

const DropdownFormik = ({ labelText, name, data, dropdownLabel = 'Select your job', setValue }) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const [label, setLable] = useState(dropdownLabel);
  const [field, meta] = useField({ name });

  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setLable(e.target.textContent);
    setShow(false);
  };

  useEffect(() => {
    if (field.value === '') setLable(dropdownLabel);
  }, [field.value]);

  return (
    <div className="flex flex-col gap-3 mb-5">
      <label className="cursor-pointer">{labelText}</label>
      <div className="relative" ref={nodeRef}>
        <div
          className="p-5 rounded-lg border border-gray-100 bg-white flex items-center justify-between cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <span className="">{label}</span>
        </div>
        <div
          className={`absolute top-full left-0 w-full rounded-lg bg-white ${
            show ? '' : 'opacity-0 invisible'
          }`}
        >
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <div
                className="p-5 cursor-pointer hover:bg-gray-100"
                onClick={handleClickDropdownItem}
                data-value={item.value}
                key={item.id}
              >
                {item.text}
              </div>
            ))}
        </div>
      </div>
      {meta.touched && meta.error && <p className="text-sm text-red-500">{meta.error}</p>}
    </div>
  );
};

export default DropdownFormik;
