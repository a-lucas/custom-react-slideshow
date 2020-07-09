import React, { useCallback, useRef, useState, useLayoutEffect, useEffect } from 'react';
import { AImage, IImage } from '../image/image';
import { useEventListener } from '../hook_scroll_listener';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import {ImageLegend} from './../image_legend/legend';
import './slideshow.scss';

interface SlideShowProps {
  images: IImage[];
  imageWidth: number;
  imageHeight: number;
}

export const SlideShow: React.FunctionComponent<SlideShowProps> = ({images, imageWidth, imageHeight}) => {
  const [showLeft, setShowLeft] = useState<boolean>(false);
  const [showRight, setShowRight] = useState<boolean>(true);
  const [widthInPixel, setWidthInPixel] = useState<number>(0)
  const scrollableContainer = useRef(null);

  useLayoutEffect(() => {
    // Calculates the scroll step
    if (scrollableContainer.current && images.length>0) {
      setWidthInPixel(scrollableContainer.current.scrollWidth / images.length);
    }
  })

  const handler = useCallback(
    (target ) => {
      if (target) {
        // Hide/Show the right/left arrows
        setShowLeft(target.scrollLeft > 0);
        setShowRight((target.scrollWidth - target.scrollLeft - target.clientWidth) > 0);
      }
    },
    [setShowLeft, setShowRight]
  );

  const resizeHandler = useCallback(() => {
    setWidthInPixel(scrollableContainer.current.scrollWidth / images.length);
  }, [setWidthInPixel, scrollableContainer]);

  useEffect(() => {
    handler(scrollableContainer.current);

  }, [images])

  useEventListener('scroll', handler, scrollableContainer.current);
  useEventListener('resize', resizeHandler, window)

  if (images.length ===0){
    return <p>Sorry, we couldn't find any **cool** places matching that query.</p>
  }

  images = images.map(img => Object.assign(img, {width: `${imageWidth}rem`, height: `${imageHeight}rem`}))

  return (
    <div className="slider">

      <div className="slides" id={'scroller-container'} ref={scrollableContainer}>
        {images.map((image, i) =>
          <div key={image.title} style={{display: 'flex',flexDirection: 'column'}}>
            <AImage {...image} key={image.title}/>
            <ImageLegend title={image.title} location={image.location} />
          </div>
        )}
      </div>

      {showLeft ?
        <button className={'sliderBtn left'} onClick={() => {
          scrollableContainer.current.scrollLeft -= widthInPixel;
        }}>
          <MdChevronLeft />
      </button> : null}

      {showRight ?
        <button className={'sliderBtn right'} onClick={() => {
          scrollableContainer.current.scrollLeft += widthInPixel;
        }}>
          <MdChevronRight />
        </button> : null}

    </div>
  );
};
