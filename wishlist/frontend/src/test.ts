const data = [{
    id: 'AESPA',
    name: 'supernova',
    date: '5/12'
  },{
    id: 'AESPA',
    name: 'drama',
    date: '4/10'
  },{
    id: 'IVE',
    name: 'iam',
    date: '4/9'
  },{
    id: 'IVE',
    name: 'accendio',
    date: '5/20'
  }]
  

const grouped = Object.groupBy(data, ({id})=>id)
console.log(grouped)

export const g = Object.keys(grouped).forEach((key) => key)
  // const c = Object.keys(g).forEach((key) => Object.groupBy(g[key], ({name}) => name))