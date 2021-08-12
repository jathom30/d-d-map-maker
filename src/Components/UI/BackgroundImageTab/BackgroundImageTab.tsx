import React from 'react'
import {
  Spacer,
  Text,
  TextInput,
  MaxHeightContainer,
  Box,
} from 'component-library'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './BackgroundImageTab.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { backgroundPhotoAtom, unsplashPhotosAtom } from 'State'
import { PhotoButton } from './components'

export const BackgroundImageTab: React.FC<{
  search: string
  onChange: (s: string) => void
}> = ({ search, onChange }) => {
  const photos = useRecoilValue(unsplashPhotosAtom)
  const setBackgroundPhoto = useSetRecoilState(backgroundPhotoAtom)

  return (
    <div className="BackgroundImageTab">
      <MaxHeightContainer
        header={
          <Box padding="1rem" paddingBottom="0.5rem">
            <Text on="white" weight="bold">
              Background Images
            </Text>
            <Spacer />
            <TextInput
              value={search}
              onChange={(e) => onChange(e.target.value)}
              icon={<FontAwesomeIcon icon={faSearch} />}
            />
          </Box>
        }
      >
        <div className="BackgroundImageTab__photo-container">
          <div className="BackgroundImageTab__temp-uploader">
            <span>Future State: Upload your own</span>
          </div>
          <Spacer />
          {photos.map((photo) => (
            <React.Fragment key={photo.id}>
              <PhotoButton
                photo={photo}
                onClick={() => setBackgroundPhoto(photo)}
              />
              <Spacer />
            </React.Fragment>
          ))}
        </div>
      </MaxHeightContainer>
    </div>
  )
}
