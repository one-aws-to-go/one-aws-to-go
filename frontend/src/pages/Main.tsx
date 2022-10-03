import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import TemplateButton from "../components/TemplateButton";

const Main = () => {
  const a = 1;

  return (
    <div className="w-full h-screen bg-cover bg-black">
      <div className="pt-10">
        <Menu />
      </div>
      <div className="flex justify-center mt-52">
        <div className="flex">
          <Link to="/configuration">
            <TemplateButton>AWSome Template</TemplateButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
