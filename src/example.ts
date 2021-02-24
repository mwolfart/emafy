import { Album } from 'types/media'

const albumA: Album = {
  id: '01',
  name: 'Oceans',
  artists: [
    { id: '02', name: 'Foo' },
    { id: '03', name: 'Bar' },
  ],
  totalTracks: 10,
}

const albumB: Album = {
  id: '02',
  name: 'Volcanos',
  artists: [
    { id: '02', name: 'Foo' },
    { id: '03', name: 'Bar' },
  ],
  totalTracks: 10,
}

const albumC: Album = {
  id: '03',
  name: 'Earthquake',
  artists: [{ id: '02', name: 'Foo' }],
  totalTracks: 10,
}

const albumD: Album = {
  id: '01',
  name: 'Carrot',
  artists: [{ id: '05', name: 'Gee' }],
  totalTracks: 10,
}

export const albumList: Album[] = [
  albumA,
  albumB,
  albumC,
  albumD,
  albumD,
  albumD,
  albumD,
  albumD,
  albumD,
]
