import React from 'react'

const Photo = ({
  likes,
  user: {
    name,
    portfolio_url,
    profile_image: { medium },
  },
  urls: { regular },
}) => {
  return (
    <article className='photo'>
      <img src={regular} alt={name} />
      <div className='photo-info'>
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
          <img src={medium} alt={name} className='user-img' />
        </a>
      </div>
    </article>
  )
}

export default Photo
