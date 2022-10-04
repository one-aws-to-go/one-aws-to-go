import { ReactComponent as Clouds } from './Clouds.svg';

const TemplateButton = (props: { children: string }) => {
  return (
    <div className='rounded-3xl bg-primary-container border-4 hover:border-primary/[.7] border-primary w-auto text-white'>
      <div className='flex flex-col justify-center items-center p-10'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-24 h-24 bg-black text-white'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z'
          />
        </svg>

        <p className='text-center align-middle text-2xl'>{props.children}</p>
      </div>
    </div>
  );
};

export default TemplateButton;
