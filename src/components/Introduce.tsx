import { FC } from 'react';

interface Props {
  name: string;
  body: string;
  links: { name: string; path: string; img: string }[];
}

const Introduce: FC<Props> = ({ name, body, links }) => {
  return (
    <div className='bg-white'>
      <h1 className='text-md text-center py-4 font-bold'>
        自己紹介
      </h1>
      <img
        src="https://pbs.twimg.com/profile_images/1492151996857860097/MRnAqw5h_400x400.png"
        alt="アイコン"
        className='w-32 h-32 mx-auto rounded-full object-cover'
      />
      <p className='text-center font-bold'>
        {name}
      </p>
      <div className='p-4'>
        <p className='text-center text-sm'>
          {body.split('\\n').map((line) => (
            <span key={line}>
              {line}
              <br />
            </span>
          ))}
        </p>
        <ul className='flex items-center justify-end mt-4'>
          {links.map((link) => (
            <li className='mx-2'>
              <a href={link.path} target='_blank' rel='noreferrer'>
                <img
                  src={link.img}
                  alt={link.name}
                  className='w-6 h-6 object-cover mx-auto'
                />
                <p className='text-xs text-center'>
                  {link.name}
                </p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Introduce;