'use client'
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from "@/components/Input";
import Button from '@/components/Button';

function PageLogin() {
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false
    });

    if (res.error) {
      setError(res.error);
    }
    else if (res.ok) {
      setError('');
      router.push('/dashboard');
      router.refresh();
    }
  });

  return ( 
    <main>
      <h1>LOGIN</h1>
      {
        error !== '' && 
        <div className="flex justify-center items-center">
          <span className="py-2 px-4 rounded-md bg-red-500 text-white">{error}</span>
        </div>
      }
      <form className=" m-auto w-full sm:w-2/4 p-4" onSubmit={onSubmit}>
        <fieldset className="flex flex-col gap-1">
          <Input 
            title="Email" 
            props={{type: "email", placeholder: "Your email ( • O • )"}}
            register={{...register("email", {
              required: {
                value: true,
                message: "Email is required"
              }
            })}}
            error={errors.email ? errors.email.message : ''}
          ></Input>

          <Input 
            title="Password" 
            props={{type: "password", placeholder: "Your pasword (  •_-)"}}
            register={{...register("password", {
              required: {
                value: true,
                message: "Password is required"
              }
            })}}
            error={errors.password ? errors.password.message : ''}
            ></Input>
        </fieldset>
        <div className="flex gap-2 mt-1">
          <Button type="submit" color="black">
            <span>Log in</span>
          </Button>
        </div>
      </form>

    </main>
  );
}

export default PageLogin;