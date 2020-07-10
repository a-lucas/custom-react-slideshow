import React, { useState, useEffect } from 'react';
import './image.scss';
import {Spinner} from '../loader/loader';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IImage {
  title: string;
  src: string;
  location: string;
  width: string;
  height: string;
}

export const AImage: React.FunctionComponent<IImage> = (image) => {
  const [hasError, setError] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>('');
  const [style, setStyle] = useState({
    width: image.width || 350 ,
    height: image.height || 150
  });
  const error = (err) => {
    console.error(err);
    setError(true);
  };

  useEffect(() => {
    setError(false);
    if (!image.src) {
      setLoading(false);
      return;
    }
    setLoading(true);
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    const img = new Image();
    img.src = image.src;
    img.onerror = err => {
      error(err);
    };
    const onLoad = (img) => {
      setLoading(false);
      setError(false);
      setUrl(img.currentSrc || img.src);
    };

    img.onload = () => {
      if (img.decode !== void 0) {
        img
          .decode()
          .catch(error)
          .then(() => {
            onLoad(img);
          });
      } else {
        onLoad(img);
      }
    };
  }, []);

  const getImage = () => {
    return (
      <div className={'q-img__image absolute-full'}>
        <img className={'absolute-full fit'} src={url} aria-hidden={true}/>
      </div>);

  };

  if (isLoading) {
    return (
      <div className={'q-img q-img__loading overflow-hidden'} style={style} >
        <Spinner />
      </div>);
  }
  if (hasError) {
    return <div>Error</div>;
  }

  return (
    <div className={'q-img overflow-hidden'} style={style} >
      {getImage()}
    </div>);
};
