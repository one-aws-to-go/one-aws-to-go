
const Configurations = () => {
    return (
      <div
        className='space-y-4 bg-black flex flex-col h-screen justify-center items-center'
        >

    
        <p className='text-2xl text-center text-primary font-bold'>Configuration</p>  
        <input 
        className="bg-black shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
        id="project name" 
        type="text" 
        placeholder="Project name"></input>
        <input 
        className="bg-black shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
        id="aws secret" 
        type="text" 
        placeholder="AWS Secret"></input>
        <input 
        className="bg-black shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline" 
        id="aws key" 
        type="text" 
        placeholder="AWS Key"></input>
        
        <button className="rounded-lg bg-transparent text-white font-semibold py-2 px-4 border border-primary">
        Button
        </button>

        
      </div>
    );
  };

  export default Configurations;