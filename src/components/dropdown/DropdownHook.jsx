import React, { useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import useClickOutSide from '../../hook/UseClickOutSide';

const DropdownHook = ({ control, setValue, name, data, dropdownLabel = 'Select your job' }) => {
  const { show, setShow, nodeRef } = useClickOutSide();
  const dropdownValue = useWatch({
    control,
    name: 'job',
    defaultValue: '',
  });

  const handleClickDropdownItem = (e) => {
    setValue(name, e.target.dataset.value);
    setLable(e.target.textContent);
    setShow(false);
  };
  const [label, setLable] = useState(dropdownLabel);

  useEffect(() => {
    if (dropdownValue === '') setLable(dropdownLabel);
  }, [dropdownValue]);

  return (
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
        {data.map((item, index) => (
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
  );
};

export default DropdownHook;
