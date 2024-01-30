'use client'
import { useEffect, useState } from "react";
import LinkItem from "@/components/LinkItem";

function PageUserTree({params}) {
  const [data, setData] = useState();
  
  useEffect(() => {
    const name = params.userName;

    const getUser = async () => {
      const res = await fetch(`/api/users/${name}`);
      const data = await res.json();
      setData(data);
    }
    getUser();

  },[]);

  return (
    <>
      {
        data ?
        data.message ?
        <div className="flex justify-center items-center">
          <span className="p-8 rounded-lg bg-red-500 text-white">{data.message}</span>
        </div>
        :
        <main className="pt-10">
          <article className="m-auto w-2/5 flex flex-col gap-2 justify-center items-center">
            <section className="flex flex-col justify-center items-center gap-2">
              <h1 className="text-4xl font-black text-pretty text-center">
                @{data && data.userName}
              </h1>
            </section>
            <section className="w-full mt-4">
              <ul>
                {
                  data &&
                  data.links.map(link => 
                    <li key={link.id} className="mb-2">
                       <LinkItem url={link.url}>
                        <span>{link.urlName}</span>
                      </LinkItem>
                    </li>
                  )
                }
              </ul>
            </section>
          </article>
        </main>
        :
        <p>LOADING...</p>
      }

    </>

  );
}

export default PageUserTree;