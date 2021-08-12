import React from 'react'
import { UnsplashPhotoType } from 'Types'
import './PhotoButton.scss'

// PER UNSPLASH REQUIREMENTS
// Each photo must show the photographer's name and link to their page on unsplash
// The photo must also include a link to unsplash with a specific referral code listed...
// ...on their dev portal

export const PhotoButton: React.FC<{
  onClick: (p: UnsplashPhotoType) => void
  photo: UnsplashPhotoType
}> = ({ onClick, photo }) => {
  return (
    <div className="PhotoButton">
      <button
        type="button"
        onClick={() => onClick(photo)}
        className="PhotoButton__button"
      >
        <img
          src={photo.urls.small}
          alt={photo.alt_description || 'default background'}
          className="PhotoButton__img"
        />
      </button>
      <div className="PhotoButton__photographer-info">
        <span>
          Photo by{' '}
          <a
            className="PhotoButton__unsplash-link"
            href={photo.user.links.html}
            target="_blank"
            rel="noreferrer noopener"
          >
            {photo.user.name}
          </a>{' '}
          on{' '}
          <a
            className="PhotoButton__unsplash-link"
            href={process.env.REACT_APP_UNSPLASH_URL}
            target="_blank"
            rel="noreferrer noopener"
          >
            Unsplash
          </a>
        </span>
      </div>
    </div>
  )
}
