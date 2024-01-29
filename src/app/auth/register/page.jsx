'use client'
import { useRouter } from 'next/navigation';
import Input from "@/components/Input";
import { useForm } from 'react-hook-form';

function RegisterPage() {
  const router = useRouter();

  const { register, handleSubmit, formState: {errors}} = useForm();

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmpassword) {
      return alert("Paswords do not match");
    }
    if (data.username === "api") {
      return alert(`User name "${data.username}" is not valid`);
    }

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        userName: data.username,
        email: data.email,
        password: data.password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (res.ok) {
      router.push('/auth/login');
    }
  });

  return ( 
    <main>
      <h1>REGISTER</h1>
      <form className=" m-auto w-full sm:w-2/4 p-4" onSubmit={onSubmit}>
        <fieldset className="flex flex-col gap-1">
          <Input 
            title="Name" 
            props={{type: "text", placeholder: "Your name ( • O • )"}}
            register={{...register("name", {
              required: {
                value: true,
                message: "Name is required"
              }
            })}}
            error={errors.name ? errors.name.message : ''}
          ></Input>

          <Input 
            title="User Name" 
            props={{type: "text", placeholder: "Your user name ( • O • )"}}
            register={{...register("username", {
              required: {
                value: true,
                message: "User name is required"
              }
            })}}
            error={errors.username ? errors.username.message : ''}
          ></Input>

          <Input 
            title="Email" 
            props={{type: "email", placeholder: "Your email (• w •)"}}
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
            
          <Input 
            title="Confirm Password" 
            props={{type: "password", placeholder: "Confirm your pasword (  •_•)"}}
            register={{...register("confirmpassword", {
              required: {
                value: true,
                message: "Confirm Password is required"
              }
            })}}
            error={errors.confirmpassword ? errors.confirmpassword.message : ''}
            ></Input>

        </fieldset>
        <div className="flex gap-2 mt-1">
          <button type="submit"  className="p-2 text-slate-50 hover:bg-slate-900 bg-slate-950 rounded-lg flex items-center justify-between gap-2">
            <span>Register</span>
          </button>
        </div>
      </form>

    </main>
  );
}

export default RegisterPage;