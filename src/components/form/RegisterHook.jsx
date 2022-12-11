import React from 'react';
import { useForm } from 'react-hook-form';
import CheckboxHook from '../checkbox/CheckboxHook';
import DropdownHook from '../dropdown/DropdownHook';
import InputHook from '../input/InputHook';
import RadioHook from '../radio/RadioHook';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    username: yup.string().required('Please enter your username'),
    email: yup
      .string()
      .email('Please enter valid email address')
      .required('Please enter your email address'),
    password: yup
      .string()
      .min(8, 'Your password must be at least 8 characters or greater')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        message: 'Your password must have at least 1 uppercase,1 lowercase, 1 special characters',
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
    term: yup.boolean().required('Please accept the term and conditions'),
  })
  .required();

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

const RegisterHook = () => {
  const {
    handleSubmit,
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    control,
    setValue,
    getValues,
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      gender: 'male',
    },
  });
  // console.log('🚀 ~ isSubmitSuccessful', isSubmitSuccessful);
  // console.log('🚀 ~ isSubmitting', isSubmitting);
  // console.log('🚀 ~ errors', errors);

  const onSubmitHandle = (values) => {
    if (!isValid) return;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        console.log(values);
        reset({
          username: '',
          email: '',
          password: '',
          gender: 'male',
          job: '',
          term: false,
        });
      }, 2000);
    });
  };

  const watchGender = watch('gender');
  // console.log('🚀 ~ watchGender', watchGender);

  return (
    <form onSubmit={handleSubmit(onSubmitHandle)} className="max-w-[300px] mx-auto my-10">
      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer" htmlFor="username">
          Username
        </label>
        <InputHook
          id="username"
          name="username"
          type="text"
          placeholder="Enter your username"
          control={control}
        ></InputHook>
        {errors.username && <p className="text-sm text-red-500">{errors.username.message}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer" htmlFor="email">
          Email address
        </label>
        <InputHook
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          control={control}
        ></InputHook>
        {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer" htmlFor="password">
          Password
        </label>
        <InputHook
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          control={control}
        ></InputHook>
        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Gender</label>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="male"
              checked={watchGender === 'male'}
            ></RadioHook>
            <span>Male</span>
          </div>

          <div className="flex items-center gap-x-3">
            <RadioHook
              control={control}
              name="gender"
              value="female"
              checked={watchGender === 'female'}
            ></RadioHook>
            <span>Female</span>
          </div>
        </div>
        {errors.gender && <p className="text-sm text-red-500">{errors.gender?.message}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <label className="cursor-pointer">Your job</label>
        <DropdownHook
          data={dropdownData}
          control={control}
          setValue={setValue}
          name="job"
          dropdownLabel="Please select"
        ></DropdownHook>
        {errors.job && <p className="text-sm text-red-500">{errors.job.message}</p>}
      </div>

      <div className="flex flex-col gap-3 mb-5">
        <CheckboxHook
          control={control}
          text="I accpect the terms and conditions"
          name="term"
        ></CheckboxHook>
        {errors.term && <p className="text-sm text-red-500">{errors.term.message}</p>}
      </div>

      <button
        className={`w-full p-5 bg-blue-500 text-white rounded-lg mt-5 font-semibold ${
          isSubmitting ? 'opacity-50' : ''
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <div className="w-5 h-5 rounded-full border-2 border-t-2 border-t-transparent border-white bord mx-auto animate-spin"></div>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
};

export default RegisterHook;
//164
