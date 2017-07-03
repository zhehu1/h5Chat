import request from '../utils/request';

export async function getAll() {
  return request('/api/userAll');
}


