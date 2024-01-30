import LinkItem from "./LinkItem";

function LinkItemProfile({id, url, urlName, children, editFunc, deleteFunc}) {
  return ( 
    <div>
      <div className="flex bg-slate-500 rounded-lg">
        <LinkItem url={url}>
          {children}
        </LinkItem>
        <div className="flex gap-2 p-4 justify-between items-center">
          <button
            className="hover:text-slate-50 text-slate-400 text-xl"
            onClick={(e) => {if (editFunc) editFunc(id, url, urlName)}}
          >
            <i className='bx bxs-pencil'></i>
          </button>
          <button 
            className="hover:text-slate-50 text-slate-400 text-xl"
            onClick={(e) => {if (deleteFunc) deleteFunc(id)}}
          >
            <i className='bx bx-x'></i>
          </button>
        </div>
      </div>
      <div>
        <p 
          className="text-xs w-full text-slate-500" 
          style={{overflowWrap: "anywhere"}}
        >
          {url}
        </p>
      </div>
    </div>
   );
}

export default LinkItemProfile;