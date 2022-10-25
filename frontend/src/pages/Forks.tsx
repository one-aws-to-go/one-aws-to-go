import NavBar from '../components/NavBar';
import axios from 'axios';
import { useAlert } from '../hooks/useAlert';
import { useState } from 'react';

const Forks = () => {
  const [alert, displayAlert] = useAlert();

  const [forkName, setForkName] = useState('');
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('/api/forks', { name: forkName });
      displayAlert('Created GitHub fork')
    } catch (e) {
      console.log('Failure')
    }
  };
  return (
    <div className="bg-black h-screen flex flex-col">
      <NavBar />
      {alert && (
        <div
          className='absolute left-0 right-0 z-10 p-4 m-4 text-sm  text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800'
          role='alert'
        >
          <code>{alert}</code>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        method="post"
        className="gap-4  flex flex-1 flex-col justify-center items-center"
      >
        <p className="text-3xl text-center text-primary font-bold">
          Create a fork
        </p>
        <p className="text-white">Enter the details:</p>
        <input
          className="bg-black shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
          id="project name"
          type="text"
          placeholder="Fork name"
          value={forkName}
          onChange={({ target }) => setForkName(target.value)}
        ></input>
        <button className="rounded-lg bg-transparent text-white font-semibold py-2 px-4 border border-primary hover:border-primary-variant">
          To the moon 🚀
        </button>
      </form>
    </div>
  );
};

export default Forks;
