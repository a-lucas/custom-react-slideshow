import React from 'react';
import './legend.scss';

export interface Legend {
  title: string;
  location: string;
}

export const ImageLegend: React.FC<Legend> = ({title, location}) => {

  return (
    <div className={'image-legend'}>
      <p className={'title'}>{title}</p>
      <p className={'location'}>
        {location}
      </p>
    </div>
  );

}
