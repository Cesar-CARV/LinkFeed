'use client'
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import UserDataContext from '@/context/userContext';

import Input from '@/components/Input';

function ProfilePage() {
  const { register, handleSubmit} = useForm();

  const { userData } = useContext(UserDataContext);

  const onSubmit = handleSubmit(async (data) => {
    if (data.password !== data.confirmpassword) {
      return alert("Paswords do not match");
    }
    if (data.username === "api") {
      return alert(`User name "${data.username}" is not valid`);
    }

    if (data.email === "" && data.name === "" && data.password === "" && data.username === "") return;

    const res = await fetch(`/api/${userData?.id}`, {
      method: 'PUT',
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
      signOut();
    }
  });

  return ( 
    <main>
      <article className="p-8 flex justify-between">
        <div className="flex items-baseline gap-1">
          <h1 className="text-4xl font-black text-balance">@{userData?.userName}</h1>
          <span className="text-slate-300">Id #{userData?.id}</span>
        </div>
        <button 
          onClick={() => signOut()} 
          className='p-2 text-white hover:bg-red-700 bg-red-500 rounded-lg flex items-center justify-between gap-2'
        >
          <i className='bx bx-exit'></i>
          <span>Sign out</span>
        </button>
      </article>

      <article>
        {
          userData &&
          <section>
            <form className=" m-auto w-full sm:w-2/4 p-4" onSubmit={onSubmit}>
              <fieldset className="flex flex-col gap-1">
                <Input 
                  title="Name" 
                  props={{type: "text", placeholder: userData?.name}}
                  register={{...register("name")}}
                ></Input>

                <Input 
                  title="User Name" 
                  props={{type: "text", placeholder: userData?.userName}}
                  register={{...register("username")}}
                ></Input>

                <Input 
                  title="Email" 
                  props={{type: "email", placeholder: userData?.email}}
                  register={{...register("email")}}
                ></Input>

                <Input 
                  title="New Password" 
                  props={{type: "password", placeholder: "Your pasword (  •_-)"}}
                  register={{...register("password")}}
                  ></Input>
                  
                <Input 
                  title="Confirm New Password" 
                  props={{type: "password", placeholder: "Confirm your pasword (  •_•)"}}
                  register={{...register("confirmpassword")}}
                ></Input>
              </fieldset>
              <div className="flex gap-2 mt-4">
                <button type="submit"  className="p-2 text-slate-50 hover:bg-slate-900 bg-slate-950 rounded-lg flex items-center justify-between gap-2">
                  <span>Save changes</span>
                </button>
                <button type="reset"  className="p-2 text-slate-950 hover:bg-slate-100 border border-slate-950 rounded-lg flex items-center justify-between gap-2">
                  <span>Cancel</span>
                </button>
              </div>
            </form>
          </section>
        }
      </article>
      <article className="flex justify-center items-center m-auto w-full sm:w-2/4 py-8 px-4">
        <button type="button"  className="p-2 text-white hover:bg-red-700 bg-red-500 rounded-lg flex items-center justify-center gap-2 w-full">
          <span>Delete account</span>
        </button>
      </article>
      
    </main>
  );
}

export default ProfilePage;