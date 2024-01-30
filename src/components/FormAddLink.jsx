'use client'
import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';

function FormAddLink({onSubmit, info}) {
  const { register, handleSubmit, formState: {errors}, reset} = useForm();

  const handleOnSubmit = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  return ( 
    <form className="w-full pb-4" onSubmit={handleOnSubmit}>
      <fieldset className="flex flex-col gap-1">
        <Input 
          title="Url Name" 
          props={{type: "text", placeholder: info?.urlName}}
          register={{...register("urlName", {
            required: {
              value: true,
              message: "The name is required"
            }
          })}}
          error={errors.urlName ? errors.urlName.message : ''}
        ></Input>

        <p 
          onClick={() => {navigator.clipboard.writeText(info?.urlName)}}
          className='text-xs text-slate-500 cursor-pointer'
          style={{overflowWrap: "anywhere"}}
        >
          <span><i className='bx bx-note'></i> Click to copy: </span>
          <span>{info?.urlName}</span>
        </p>

        <Input 
          title="Url" 
          props={{type: "text", placeholder: info?.url}}
          register={{...register("url", {
            required: {
              value: true,
              message: "Url es required"
            }
          })}}
          error={errors.url ? errors.url.message : ''}
        ></Input>

        <p 
          onClick={() => {navigator.clipboard.writeText(info?.url)}}
          className='text-xs text-slate-500 cursor-pointer' 
          style={{overflowWrap: "anywhere"}}
        >
          <span><i className='bx bx-note'></i> Click to copy: </span>
          <span>{info?.url}</span>
        </p>
      </fieldset>
      <div className="flex gap-2 mt-1">
        <Button type="submit" color="black">
          <span>Add</span>
        </Button>
      </div>
    </form>
  );
}

export default FormAddLink;