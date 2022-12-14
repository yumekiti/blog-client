import { FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Report from '../libs/interfaces/report';

import { useGet } from '../libs/api';

interface Props {
  size: number;
  find: {
    type: number;
    value: string;
  };
}

// 疑似要素
const generateReportsDummy = (prevReports: Report[], pageSize: number): Report[] => {
  const reportsWithoutDummy = prevReports.filter((report) => report.id !== 0);
  if (prevReports.length % pageSize === 0 && !(prevReports.length === 0)) return reportsWithoutDummy;
  for (let i = 0; i < pageSize - (prevReports.length % pageSize); i++) {
    reportsWithoutDummy.push({
      id: 0,
      attributes: {
        img: { data: { id: 0, attributes: { name: '', url: '' } } },
        title: `dummy${i}`,
        body: '',
        category: { data: { id: 0, attributes: { name: '', createdAt: '', updatedAt: '', publishedAt: '' } } },
        tags: { data: [] },
        createdAt: '',
        updatedAt: '',
        publishedAt: '',
      },
    });
  }
  return reportsWithoutDummy;
};

const Reports: FC<Props> = ({ size, find }) => {
  const pageSize = size;
  const [reports, setReports] = useState<Report[]>(generateReportsDummy([], pageSize));
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const { type, value } = find;
  const { data, error, isLoading } = useGet('reports', page, pageSize, type, value);

  useEffect(() => {
    setReports(generateReportsDummy([], pageSize));

    if (!data) return;
    setReports(generateReportsDummy(data.data, pageSize));
    setPageCount(data.meta.pagination.pageCount);
  }, [data]);

  useEffect(() => {
    setPage(1);
  }, [find]);

  return (
    <>
      {error && <div className='text-red-400'>{error}</div>}
      <div className='card-color rounded'>
        <h1 className='text-xl text-center py-4'>
          <div className='flex justify-center items-center'>
            <i className='las la-file-alt'></i>
            <span className='mx-2'>新規記事</span>
          </div>
        </h1>
        {!isLoading ? (
          <div className='flex items-center justify-between flex-wrap'>
            {reports.map((report) =>
              report.id !== 0 ? (
                <div key={report.id} className='w-full lg:w-1/2 animate-fade-in'>
                  <Link to={'/report/' + report.id} className='hover:opacity-80'>
                    <div className='px-4 pb-6 relative'>
                      <div className='card-color rounded-lg shadow-md border-2 border-[#094067]'>
                        <div className='mt-2 ml-2'>
                          <div className='bg-cyan-100 text-xs px-2 py-1 rounded-full inline'>
                            {report.attributes.category.data && report.attributes.category.data.attributes.name}
                          </div>
                        </div>
                        {report.attributes.img.data ? (
                          <img
                            src={`${window.location.origin}${report.attributes.img.data.attributes.url}`}
                            alt={report.attributes.title}
                            className='w-full h-48 object-contain p-2'
                          />
                        ) : (
                          <div className='w-full h-48 bg-gray-200 p-2'></div>
                        )}
                        <div className='flex justify-start items-center px-6 py-2 h-20'>
                          <p className='text-md text-left line-clamp-2'>{report.attributes.title}</p>
                        </div>
                        <p className='text-sm text-right pr-2 pb-1'>
                          {report.attributes.createdAt.split('T')[0].split('-').join('/')}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <div key={report.attributes.title} className='w-full lg:w-1/2'>
                  <div className='px-4 pb-6'>
                    <div className='border-2 opacity-0'>
                      <div className='mt-2 ml-2'>
                        <div className='text-xs px-2 py-1'>&nbsp;</div>
                      </div>
                      <div className='h-48 p-2' />
                      <div className='px-4 py-2 h-20'>
                        <p className='text-md'>&nbsp;</p>
                      </div>
                      <p className='text-sm pr-2 pb-1'>&nbsp;</p>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        ) : (
          <div className='flex items-center justify-between flex-wrap'>
            {[...Array(pageSize)].map((_, i) => (
              <div key={i} className='animate-pulse w-full lg:w-1/2 relative'>
                <div className='px-4 pb-6'>
                  <div className='border-2'>
                    <div className='mt-2 ml-2'>
                      <div className='text-xs px-2 py-1'>&nbsp;</div>
                    </div>
                    <div className='h-48 p-2' />
                    <div className='px-4 py-2 h-20'>
                      <p className='text-md'>&nbsp;</p>
                    </div>
                    <p className='text-sm pr-2 pb-1'>&nbsp;</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className='flex items-center justify-center mt-4'>
        {page > 1 ? (
          <button onClick={() => setPage(page - 1)} className='mr-2'>
            <p className='w-8 h-8 card-color rounded-full flex items-center justify-center text-sm hover:bg-cyan-100'>
              <span className='flex justify-center items-center'>
                <i className='las la-angle-left'></i>
              </span>
            </p>
          </button>
        ) : (
          <p className='w-8 h-8 card-color rounded-full flex items-center justify-center text-sm mr-2' />
        )}
        <p className='text-md mr-2'>
          {page} / {pageCount}
        </p>
        {page < pageCount ? (
          <button onClick={() => setPage(page + 1)} className='mr-2'>
            <p className='w-8 h-8 card-color rounded-full flex items-center justify-center text-sm hover:bg-cyan-100'>
              <span className='flex justify-center items-center'>
                <i className='las la-angle-right'></i>
              </span>
            </p>
          </button>
        ) : (
          <p className='w-8 h-8 card-color rounded-full flex items-center justify-center text-sm mr-2' />
        )}
      </div>
    </>
  );
};

export default Reports;
