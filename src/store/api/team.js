import ajax from '@/common/ajax';

export function getList() {
  return ajax.get('/api/team/list');
}
