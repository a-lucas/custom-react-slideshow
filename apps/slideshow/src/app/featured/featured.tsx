import React from 'react';
import { AImage, IImage } from './../image/image';
import { ImageLegend } from '../image_legend/legend';

interface FeaturedProps {
  images: IImage[];
  width: string;
}

export const Featured: React.FC<FeaturedProps> = ({images, width}) => {

  return (
    <div className={'flex-row flex-wrap '}>
      {images.map((image, index) =>
        <div key={index} className={'flex-column flex-space-around '} style={{margin: '0 1.5rem', marginTop: '3rem', width}}>
          <AImage {...image} width={width} height={width} />
          <ImageLegend title={image.title} location={image.location} />
        </div>
      )}
    </div>
  )

}
