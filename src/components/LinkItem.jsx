function LinkItem({url, children}) {
  return ( 
    <>
      <a 
        href={url} 
        target="_blank" 
        className="p-4 bg-slate-200 inline-block w-full text-center rounded-lg hover:bg-slate-300 border-2"
      >
        {children}
      </a>
    </>
   );
}

export default LinkItem;