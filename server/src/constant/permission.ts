export const PERMISSION_TYPE = {
  MENU: 1,
  ACTION: 2,
};

export const GOOD_PERMISSION = {
  LIST: {
    type: PERMISSION_TYPE.ACTION,
    id: 1,
    value: 'good.list',
  },
  QUERY: {
    type: PERMISSION_TYPE.ACTION,
    id: 2,
    value: 'good.query',
  },
  CREATE: {
    type: PERMISSION_TYPE.ACTION,
    id: 3,
    value: 'good.create',
  },
};
