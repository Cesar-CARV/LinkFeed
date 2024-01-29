'use client'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '@/components/Input';

function DashboardPage() {
  const {data: session} = useSession();
  const [data, setData] = useState();
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, formState: {errors}} = useForm();

  useEffect(() => {

    const getUser = async () => {
      const res = await fetch(`/api/users/${session?.user.name}`);
      const resJson = await res.json();
      if (resJson .id) setData(resJson);
    }
    getUser();

  },[session?.user.name]);

  const onSubmit = handleSubmit(data => {
    console.log(data);
  });

  return ( 
    <main>
      <article>
        <section className="p-8 flex justify-between">
          <h1 className="text-4xl font-black text-balance">{data?.session?.user.name}</h1>
        </section>
      </article>
      <article className='m-auto w-2/5 flex flex-col gap-2 justify-center items-center'>
        <section className="w-full mt-4">
          <ul>
            {
              data &&
              data.links.map(link => 
                <li key={link.id} className="mb-2">
                  <a href={link.url} target="_blank" className="p-4 bg-slate-100 inline-block w-full text-center rounded-lg hover:bg-slate-200 border-2">{link.urlName}</a>
                </li>
              )
            }
          </ul>
          <div>
            <button 
              onClick={()=> setShowForm(!showForm)}
              className="p-2 w-full text-center text-slate-50 hover:bg-slate-900 bg-slate-950 rounded-lg flex items-center justify-center gap-2"
            >
              <span>{!showForm ? "Add new Link" : "Cancel"}</span>
            </button>
          </div>
        </section>
        <section className={`w-full ${!showForm && "hidden" }`}>
          <form className="w-full" onSubmit={onSubmit}>
            <fieldset className="flex flex-col gap-1">
              <Input 
                title="Url Name" 
                props={{type: "text", placeholder: "Click here and make magic "}}
                register={{...register("urlName", {
                  required: {
                    value: true,
                    message: "The name is required"
                  }
                })}}
                error={errors.urlName ? errors.urlName.message : ''}
              ></Input>

              <Input 
                title="Url" 
                props={{type: "text", placeholder: "Url (• o • )"}}
                register={{...register("url", {
                  required: {
                    value: true,
                    message: "Url es required"
                  }
                })}}
                error={errors.url ? errors.url.message : ''}
              ></Input>
            </fieldset>
            <div className="flex gap-2 mt-1">
              <button type="submit"  className="p-2 text-slate-50 hover:bg-slate-900 bg-slate-950 rounded-lg flex items-center justify-between gap-2">
                <span>Add link</span>
              </button>
            </div>
          </form>
        </section>
      </article>
    </main>
  );
}

export default DashboardPage;