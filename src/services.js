import uid from 'uid'
import youTubeImage from './images/youtube.png'

const defaultData = [
  {
    title: 'Head roll',
    tags: ['Pablo & Raquel', 'Bachaturo', '2018'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. ffi?Lorem, ipsum dolor sit amet consectetur dipisicing elit.Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. ffi?Lorem, ipsum dolor sit amet consectetur dipisicing elit.Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. ffi?Lorem, ipsum dolor sit amet consectetur dipisicing elit.Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. ffi?Lorem, ipsum dolor sit amet consectetur dipisicing elit.',
    uploadDate: '2019-03-05T10:51',
    id: 'GTsEfTfprsk',
    backgroundImageUrl: youTubeImage,
    status: 2,
    refresh: false,
    refreshDate: '',
  },
  {
    title: 'Hip roll',
    tags: ['Abdel & Lety', 'Youtube', '2018'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: 'upTlp-poWoI',
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 2,
    refresh: false,
    refreshDate: '',
  },
  {
    title: 'Title3',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: 'Q1FWRhT4rTk',
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 1,
    refresh: false,
    refreshDate: '',
  },
  {
    title: 'Title4',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: 'U-JofUEsbD0',
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 1,
    refresh: false,
  },
  {
    title: 'Title5',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: 'ogzxiPx3Isc',
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 3,
    refresh: false,
  },
  {
    title:
      'Title6 this is the cooles video of them all with a very long title which is annoying',
    tags: ['tag1', 'tag2', 'tag3'],
    notes:
      'Lorem, ipsum dolor sit amet consectetur dipisicing elit. Voluptates officiis nulla, molestiae tenetur. officiis nulla, molestiae tenetur. offi?',
    uploadDate: '2019-03-05T10:51',
    id: 'KmayR29pKbQ',
    backgroundImageUrl: 'http://via.placeholder.com/500/',
    status: 3,
    refresh: false,
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
    refresh: false,
  },
]

export function getCardsFromStorage() {
  return getFromStorage('cards') || defaultData
}

export function saveCardsToStorage(cards) {
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
