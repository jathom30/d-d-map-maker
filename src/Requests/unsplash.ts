import { createApi } from 'unsplash-js'

const unsplash = createApi({
  accessKey: process.env.REACT_APP_API_KEY || '',
})

export const getCollection = (collectionId: string) =>
  unsplash.collections.get({ collectionId })

export const getCollectionPhotos = (collectionId: string, photoCount: number) =>
  unsplash.collections.getPhotos({
    collectionId,
    perPage: photoCount,
  })

export const getUserPhotos = (username: string) =>
  unsplash.users.getPhotos({
    username,
    perPage: 30,
  })

export const getPhotos = () =>
  unsplash.photos.list({
    perPage: 30,
  })

export const getPhotoSearch = (query: string) =>
  unsplash.search.getPhotos({
    query,
    perPage: 30,
    // contentFilter for SFW images
    contentFilter: 'high',
  })

// probably not useful outside unsplash, but gets photos of a specific unsplash user
export const getUserSearch = (query: string) =>
  unsplash.search.getUsers({
    query,
    perPage: 30,
  })

// probably not useful outside unsplash, but gets photos of a specific unsplash collection
// dev could create a collection on unsplash and use it as the set of default images
export const getCollectionSearch = (query: string) =>
  unsplash.search.getCollections({
    query,
    perPage: 30,
  })

// needed to pass unsplash's guidelines (see project README)
export const trackDownload = (downloadLocation: string) =>
  unsplash.photos.trackDownload({
    downloadLocation,
  })
