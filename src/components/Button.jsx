function Button({type, color, children, onClick}) {
  const colors = {
    black: {
      text: "text-slate-50",
      background: "bg-slate-950",
      hover: "bg-slate-900",
      border: ""
    },
    gray: {
      text: "text-slate-950",
      background: "bg-slate-200",
      hover: "bg-slate-100",
      border: "border border-slate-950"
    },
    red: {
      text: "text-white",
      background: "bg-red-500",
      hover: "bg-red-700",
      border: ""
    }
  }

  return ( 
    <button 
      type={type}
      onClick={(e)=> {if (onClick) onClick(e)}}
      className={`hover:${colors[color].hover} ${colors[color].background} ${colors[color].text} ${colors[color].border} p-2 rounded-lg inline-flex items-center justify-between gap-2`}
    >
      {children}
    </button>
  );
}

export default Button;