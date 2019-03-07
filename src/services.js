import uid from 'uid'

const defaultData = [
  {
    title: 'Title1',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. ffi?Lorem, ipsum dolor sit amet consectetur dipisicing elit.',
    uploadDate: '2019-03-05T10:51',
    id: uid(),
    backgroundImageUrl: 'http://via.placeholder.com/500x300/',
    status: 0,
  },
  {
    title: 'Title2',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: uid(),
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 0,
  },
  {
    title: 'Title3',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: uid(),
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 0,
  },
  {
    title: 'Title4',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: uid(),
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 0,
  },
  {
    title: 'Title5',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: uid(),
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 0,
  },
  {
    title: 'Title6',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: uid(),
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 0,
  },
  {
    title: 'Title7',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: uid(),
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 0,
  },
]

export function getDataFromStorage() {
  return getFromStorage('cards') || defaultData
}

export function saveDataToStorage(cards) {
  saveToStorage('cards', cards)
}

export function saveToStorage(name, data) {
  const dataString = JSON.stringify(data)
  localStorage.setItem(name, dataString)
}

export function getFromStorage(name) {
  const dataString = localStorage.getItem(name)
  try {
    return JSON.parse(dataString)
  } catch (error) {
    console.error(error.message)
  }
}
