import Menu from "../components/Menu";

const Configurations = () => {
  return (
    <div className="bg-black h-screen">
      <div className="pt-10 pb-10">
        <Menu />
      </div>
      <form action="#" method="post">
        <div className="gap-4  flex flex-col justify-center items-center">
          <p className="text-3xl text-center text-primary font-bold pb-20">
            Configuration
          </p>
          <p className="text-white">Enter the details:</p>
          <input
            className="bg-black shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="project name"
            type="text"
            placeholder="Project name"
          ></input>
          <input
            className="bg-black shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="aws key"
            type="text"
            placeholder="AWS Key"
          ></input>
          <input
            className="bg-black shadow appearance-none border rounded py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline"
            id="aws secret"
            type="text"
            placeholder="AWS Secret"
          ></input>

          <button className="rounded-lg bg-transparent text-white font-semibold py-2 px-4 border border-primary hover:border-primary-variant">
            To the moon 🚀
          </button>
        </div>
      </form>
    </div>
  );
};

export default Configurations;
