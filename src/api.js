import axios from 'axios'

export function getTableList(param) {

  return axios({
    //url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/mock-data/table-list.json',
    url: '/api/test',
    method: 'get',
    param
  })
}
