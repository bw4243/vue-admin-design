import axios from 'axios'

export function getTableList(param) {

  return axios({
    //url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/mock-data/table-list.json',
    url: '/api/test',
    method: 'get',
    param
  })
}

export function getTableList2(param) {

  return axios({
    //url: 'https://cdn.jsdelivr.net/gh/baimingxuan/media-store/mock-data/table-list.json',
    url: '/api/test2',
    method: 'get',
    param
  })
}
