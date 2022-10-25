import { ForkItem } from '../models/ForkItem';
import { Link } from 'react-router-dom';
import NavBar from '../components/NavBar';
import { TemplateItem } from '../models/TemplateItem';

const Main = () => {
  let templateItems: TemplateItem[] = [
    {
      img: require('../assets/aws.png'),
      title: 'AWS',
      disabled: false,
    },
    {
      img: require('../assets/gcp.png'),
      title: 'GCP',
      disabled: true,
    },
    {
      img: require('../assets/azure.png'),
      title: 'Azure',
      disabled: true,
    },
  ];

  let recentForks: ForkItem[] = [
    {
      img: require('../assets/aws.png'),
      title: 'rich-people-use-aws',
    },
    {
      img: require('../assets/azure.png'),
      title: 'azure-feels-much-better',
    },
    {
      img: require('../assets/gcp.png'),
      title: 'jussi-likes-gcp',
    },
    {
      img: require('../assets/aws.png'),
      title: 'aws-is-way-better',
    },
  ];

  return (
    <div className='bg-surface h-screen flex flex-col'>
      <NavBar />
      <div className="flex flex-col space-y-2 mx-auto max-w-7xl w-full">
        <h1 className="w-full px-6 pt-4 sm:text-xl text-lg font-bold max-w-7xl mx-auto text-primary">
          Templates
        </h1>

        <div className="flex flex-wrap mx-6 overflow-x-scroll scroll-py-4 snap-x xs:scrollbar-thin scrollbar-thumb-primary scrollbar-track-primaryContainer">
          <div className="flex space-x-4 pb-4">
            {
              templateItems.map((item, index) => {
                return (
                  <button
                    key={index}
                    className="flex flex-col items-center justify-center w-32 h-32 sm:w-48 sm:h-48 max-w-xs overflow-hidden rounded-lg shadow-md text-white bg-primaryContainer hover:shadow-xl transition-shadow duration-300 ease-in-out hover:bg-primary/[.10] cursor-pointer"
                    disabled={item.disabled}
                  >
                    <img
                      className='p-4'
                      src={item.img}
                      alt={'logoImage'} />
                  </button>
                );
              })
            }
          </div>
        </div>


        <h1 className="w-full px-6 pt-4 sm:text-xl text-lg font-bold max-w-7xl mx-auto text-primary">
          Your recent forks
        </h1>
        <div className="px-6">
          <div className='space-y-2'>
            {recentForks.map((item, index) => {
              return (
                <div
                  key={index}
                  className='flex flex-row justify-between items-center bg-primaryContainer w-full h-14 rounded-lg hover:bg-primary/[.10] cursor-pointer'
                >
                  <p className='text-white ml-4 font-bold'>{item.title}</p>
                  <img
                    className='h-10 px-2'
                    src={item.img}
                    alt={'logoImage'}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Main;