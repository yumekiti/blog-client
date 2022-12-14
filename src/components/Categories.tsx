import { FC, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Category from '../libs/interfaces/category';
import { useGet } from '../libs/api';

interface Props {
  size: number;
  find: {
    type: number;
    value: string;
  };
}

const CategoriesComponent: FC<Props> = ({ size, find }) => {
  const pageSize = size;
  const [categories, setCategories] = useState<Category[]>([]);
  const { type, value } = find;
  const { data, error } = useGet('categories', 1, pageSize, type, value);

  useEffect(() => {
    if (!data) return;
    setCategories(data.data);
  }, [data]);

  return (
    <>
      {error && <div className='text-red-400'>{error}</div>}
      {(categories.length > 0 && (
        <div className='card-color rounded'>
          <h1 className='text-xl text-center py-4'>
            <div className='flex justify-center items-center'>
              <i className='las la-bars'></i>
              <span className='mx-2'>カテゴリー</span>
            </div>
          </h1>
          <ul className='pb-2 px-2 flex flex-wrap items-center justify-start'>
            {categories.map((category) => (
              <li className='py-2 w-1/2 lg:w-full' key={category.id}>
                <div className='flex items-center justify-center'>
                  <Link
                    to={'/categories/' + category.id}
                    className='cursor-pointer hover:underline flex whitespace-nowrap'
                  >
                    <div className='flex items-center justify-center'>
                      <span className='w-3 h-3 bg-[#3da9fc] rounded-full mr-2' />
                    </div>
                    <span>{category.attributes.name}</span>
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )) ||
        null}
    </>
  );
};

export default CategoriesComponent;
