import { createContext, useState, useEffect } from "react";
import { useSession } from 'next-auth/react';

const UserDataContext = createContext();

function UserDataProvider({children}) {
  const [userData, setUserData] = useState();
  const {data: session} = useSession();

  const getAllDataUser = async (id) => {
    const res = await fetch(`/api/${id}`);
    const resJson = await res.json();

    if (res.ok) setUserData(resJson);
  }

  const getUser = async () => {
    const res = await fetch(`/api/users/${session?.user.name}`);
    const resJson = await res.json();
    if (resJson?.id) {
      getAllDataUser(resJson.id);
    }
  }

  useEffect(() => {
    if (userData) return;
    getUser();

  },[session?.user.name && userData === undefined]);

  return ( 
    <UserDataContext.Provider
      value={{
        session: session?.user,
        updateData: getAllDataUser,
        userData,
        setUserData
      }}
    >
      {children}
    </UserDataContext.Provider>
   );
}

export { UserDataProvider };

export default UserDataContext;