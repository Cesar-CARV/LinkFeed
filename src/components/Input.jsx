function Input({title, props, register, error}) {
  return ( 
    <label className="flex flex-col gap-1">
      <span className="text-slate-600">{title}</span>
      <input {...props} {...register} className="px-3 py-1 rounded-lg bg-slate-100 border-2 border-slate-300"/>
      {
        error !== '' ? <span className="text-red-500 text-xs">{error}</span> : ''
      }
    </label>
  );
}

export default Input;