import { useState } from 'react'
import './ImageGallery.css'

function ImageGallery({ images, name }) {
  const gallery = images && images.length > 0 ? images : []
  const [activeIndex, setActiveIndex] = useState(0)
  const [failed, setFailed] = useState(false)

  if (gallery.length === 0) {
    return (
      <div className="lux-gallery">
        <div className="lux-gallery-main lux-gallery-fallback">
          <span>{name}</span>
        </div>
      </div>
    )
  }

  const activeSrc = gallery[activeIndex]

  return (
    <div className="lux-gallery">
      <div className="lux-gallery-main">
        {failed ? (
          <div className="lux-gallery-fallback">
            <span>{name}</span>
          </div>
        ) : (
          <img
            src={activeSrc}
            alt={name}
            className="lux-gallery-img"
            onError={() => setFailed(true)}
          />
        )}
      </div>

      {gallery.length > 1 && (
        <div className="lux-gallery-thumbs">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              className={`lux-gallery-thumb ${
                index === activeIndex ? 'active' : ''
              }`}
              onClick={() => {
                setActiveIndex(index)
                setFailed(false)
              }}
            >
              <img src={src} alt={`${name} view ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default ImageGallery
