'use client'
import { signOut } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import UserDataContext from '@/context/userContext';

import Input from '@/components/Input';
import Button from '@/components/Button';
import UserHeader from '@/components/UserHeader';

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
      <article>
        <UserHeader name={userData?.userName} id={userData?.id}>
          <Button type="button" color="red" onClick={() => signOut()}>
            <i className='bx bx-exit'></i>
            <span>Sign out</span>
          </Button>
        </UserHeader>
      </article>
      <article>
        {
          userData &&
          <section className='w-full mt-4'>
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
                <Button type="submit" color="black">
                  <span>Save changes</span>
                </Button>
                <Button type="reset" color="gray">
                  <span>Cancel</span>
                </Button>
              </div>
            </form>
          </section>
        }
      </article>
      <article className="flex justify-center items-center m-auto w-full sm:w-2/4 py-8 px-4">
        <Button type="button" color="red">
          <span>Delete account</span>
        </Button>
      </article>
      
    </main>
  );
}

export default ProfilePage;