import { useState, useEffect } from 'react'
import { useDebouncedCallback } from 'Hooks'
import { getPhotoSearch, getPhotos } from 'Requests'
import { useSetRecoilState } from 'recoil'
import { unsplashPhotosAtom } from 'State'

// returns a search string and its setter
// when the search string is updated, getPhotoSearch is called (with a debounce)
// if no search string is present, default photos are supplied from unsplash...
// ...Currently the default photos are the most recent photos to be added to unsplash
export const useUnsplash = () => {
  const [search, setSearch] = useState('')
  const setPhotos = useSetRecoilState(unsplashPhotosAtom)

  const handleDefaultPhotos = useDebouncedCallback(() => {
    getPhotos().then((res) => {
      if (res.response) {
        const { results } = res.response
        setPhotos(results)
      }
    })
  }, 200)

  const handleSearch = useDebouncedCallback((query: string) => {
    getPhotoSearch(query).then((res) => {
      if (res.response) {
        const { results } = res.response
        setPhotos(results)
      }
    })
  }, 200)

  useEffect(() => {
    if (search === '') {
      handleDefaultPhotos()
    } else {
      handleSearch(search)
    }
  }, [search])

  return {
    search,
    handleSearch: setSearch,
  }
}
