'use client'
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import UserDataContext from '@/context/userContext';

import LinkItemProfile from '@/components/LinkItemProfile';
import Button from '@/components/Button';
import FormAddLink from '@/components/FormAddLink';
import UserHeader from '@/components/UserHeader';

function DashboardPage() {
  const { userData, updateData } = useContext(UserDataContext);

  const METHODS = {POST:"POST", PUT:"PUT", DELETE:"DELETE"};

  const [linkInfo, setLinkInfo] = useState(null);
  const [method, setMethod] = useState(METHODS.POST);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  const onSubmitPOST = async (data) => {
    if (!data.url.includes("https://") && !data.url.includes("http://")){
      alert("Add 'https://' to link");
      return;
    }
    const res = await fetch(`/api/${userData.id}/link`, {
      method: "POST",
      body: JSON.stringify({
        userId: userData.id,
        urlName: data.urlName,
        url: data.url,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      updateData(userData.id);
      setShowForm(false);
    }
  }

  const onSubmitPUT = async (data) => {
    if (!data.url.includes("https://") && !data.url.includes("http://")){
      alert("Add 'https://' to link");
      return;
    }
    const res = await fetch(`/api/${userData.id}/link`, {
      method: "PUT",
      body: JSON.stringify({
        id: linkInfo?.id,
        urlName: data.urlName,
        url: data.url,
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      updateData(userData.id);
      setMethod(METHODS.POST);
      setShowForm(false);
    }
  }

  const onSubmitDELTE = async (id) => {
    const res = await fetch(`/api/${userData.id}/link`, {
      method: "DELETE",
      body: JSON.stringify({
        id: id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (res.ok) {
      updateData(userData.id);
      setMethod(METHODS.POST);
    }
  }

  const onSubmit = (data) => {
    if (method === METHODS.POST) onSubmitPOST(data);
    if (method === METHODS.PUT) onSubmitPUT(data);
    //if (method === METHODS.DELETE) onSubmitDELTE();
  };

  const editLink = (id, url, urlName) => {
    setLinkInfo({id, urlName, url});
    setMethod(METHODS.PUT);
    setShowForm(true);
  }

  const deleteLink = (id) => {
    setMethod(METHODS.DELETE);
    onSubmitDELTE(id)
  }

  return ( 
    <main>
      <article>
        <UserHeader name={userData?.userName} id={userData?.id}>
          <Button type="button" color="gray" onClick={() => router.push("/watch/" + userData.userName)}>
            <i className='bx bx-show'></i>
            <span>Preview</span>
          </Button>
        </UserHeader>
      </article>
      <article className='md:m-auto md:w-2/5 md:p-0 w-full p-4 flex flex-col gap-2 justify-center items-center'>
        <section className="w-full mt-4">
          <ul>
            {
              userData &&
              userData.links.map(link => 
                <li key={link.id} className="mb-2">
                  <LinkItemProfile id={link.id} urlName={link.urlName} url={link.url} editFunc={editLink} deleteFunc={deleteLink}>
                    <span>{link.urlName}</span>
                  </LinkItemProfile>
                </li>
              )
            }
          </ul>
          <div className="flex justify-center">
            <Button type="submit" color="black" onClick={()=> {setShowForm(!showForm); setMethod(METHODS.POST); setLinkInfo(null)}}>
              <span>{!showForm ? "Add new Link" : "Cancel"}</span>
            </Button>
          </div>
        </section>
        <section className={`w-full ${!showForm && "hidden" }`}>
          {
            (method === METHODS.POST || method === METHODS.PUT) &&
            <FormAddLink onSubmit={onSubmit} info={linkInfo}/>
          }
        </section>
      </article>
    </main>
  );
}

export default DashboardPage;