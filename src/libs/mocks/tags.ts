import Tag from '../interfaces/tag';

export const getTagsMock = (): Tag[] => {
  return [
    {
      id: 1,
      attributes: {
        name: 'tag1',
        createdAt: '2021-01-01T00:00:00.000Z',
        updatedAt: '2021-01-01T00:00:00.000Z',
        publishedAt: '2021-01-01T00:00:00.000Z',
      },
    },
  ];
};
