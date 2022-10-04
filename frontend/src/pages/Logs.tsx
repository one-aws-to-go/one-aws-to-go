import NavBar from '../components/NavBar';

const Logs = () => {
  return (
    <div className='w-screen h-screen bg-repeat bg-black'>
      <NavBar />
      <div className='bg-black flex flex-col h-screen justify-start items-center'>
        <div className='w-3/4 m-8 space-y-4 flex flex-col h-screen items-start'>
          <p className='text-2xl text-center text-primary font-bold'>Logs</p>
          <div className='w-full flex flex-row justify-between items-end'>
            <p className='text-xl text-center text-white font-bold'>Process</p>

            <div className='flex flex-row space-x-4'>
              <button className='w-16 rounded-lg bg-transparent text-white font-semibold py-2 px-2 border border-primary'>
                Retry
              </button>
              <button className='w-16 rounded-lg bg-transparent text-white font-semibold py-2 px-2 border border-error'>
                Stop
              </button>
            </div>
          </div>
          <div className='rounded-lg box-border h-3/5 w-full p-4 border'>
            <p className='text-start text-2xl text-white'>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry. Lorem Ipsum has been the industry's standard
              dummy text ever since the 1500s, when an unknown printer took a
              galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logs;
