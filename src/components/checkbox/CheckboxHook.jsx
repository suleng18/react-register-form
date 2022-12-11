import React from 'react';
import { useController } from 'react-hook-form';

const CheckboxHook = ({ control, text, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: false,
  });
  // console.log('🚀 ~ field', field);
  return (
    <label className="cursor-pointer custom-checkbox">
      <input
        type="checkbox"
        {...field}
        value={props.value}
        className="hidden"
        id={props.name}
        checked={field.value}
      />
      <div className="flex items-center gap-x-3 ">
        <div className="bg-white transition-all w-full h-full rounded-md flex items-center justify-center custom-checkbox-square">
          <svg
            width="12"
            height="10"
            viewBox="0 0 12 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.7453 1.89733L3.93178 9.71087L0.254822 6.03391L1.17132 5.11741L3.93178 7.87136L10.8288 0.980835L11.7453 1.89733Z"
              fill="white"
            />
          </svg>
        </div>
        <label className="text-sm cursor-pointer" htmlFor={props.name}>
          {text}
        </label>
      </div>
    </label>
  );
};

export default CheckboxHook;
