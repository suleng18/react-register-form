import React from 'react';
import { useController } from 'react-hook-form';

const InputHook = ({ control, ...props }) => {
  const { field } = useController({
    control,
    name: props.name,
    defaultValue: '',
  });

  return (
    <input
      className="p-4 bg-white border border-gray-100 rounded-lg outline-none focus:border-blue-500 transition-all "
      {...field}
      {...props}
    ></input>
  );
};

export default InputHook;
