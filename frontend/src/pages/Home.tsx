import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import TemplateButton from '../components/TemplateButton';

const Main = () => {
  return (
    <div className='bg-black h-screen flex flex-col'>
      <NavBar />
      <div className='flex flex-1 justify-center items-center'>
        <Link to='/configurations'>
          <TemplateButton>AWS Template</TemplateButton>
        </Link>
      </div>
    </div>
  );
};

export default Main;
