import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TemplateButton from '../components/TemplateButton';

const Main = () => {
  return (
    <div className='w-screen h-screen bg-repeat bg-black'>
      <NavBar />
      <div className='flex justify-center mt-52'>
        <div className='flex'>
          <Link to='/configurations'>
            <TemplateButton>AWSome Template</TemplateButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
