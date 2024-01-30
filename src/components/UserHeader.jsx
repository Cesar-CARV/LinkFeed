function UserHeader({name, id, children}) {
  return ( 
    <section className="p-8 flex justify-between items-center flex-wrap md:items-baseline">
      <div className="flex items-baseline gap-1">
        <h1 className="md:text-4xl text-xl font-black text-balance">@{name}</h1>
        <span className="text-slate-300">Id #{id}</span>
      </div>
      {children}
    </section>
  );
}

export default UserHeader;