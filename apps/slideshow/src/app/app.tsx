import React, {AbstractView, useEffect, useState, useCallback, useRef} from 'react';
import axios from 'axios';
import {IImage} from './image/image';
import './app.scss';
import {Featured} from './featured/featured';
import {SlideShow} from './slideshow/slideshow';

export const searchImages = (text: string, images: IImage[]): IImage[] => {
  if (text.length ===0) {
    return images;
  }
  return images.filter(({title}) => {
    return title.toLowerCase().indexOf(text.toLowerCase()) >=0
  });
}

export const App = () => {

  const [images, setImages] = useState<IImage[]>([]);
  const [featured, setFeatured] = useState<IImage[]>([]);
  const [search, setSearch] = useState<string>('');
  const [searchResults, setSearchResults] = useState<IImage[]>([]);

  const searchHandler = useCallback((text: string) => {
    setSearch(text);
    setSearchResults(searchImages(text, images));
    // if (text.length === 0) {
    //   setSearchResults(images);
    //   return;
    // }
    // setSearchResults(images.filter(({title}) => {
    //   return title.toLowerCase().indexOf(text.toLowerCase()) >=0
    // }))
  }, [setSearch, setSearchResults, images]);

  useEffect( () => {
    axios.get(
      'http://demo3136867.mockable.io/carousel',
    ).then(({data}) => {
      setImages(data.data.map(({title, location, img}) => ({
        title,
        location,
        src: img,
      })));

      setSearchResults(data.data.map(({title, location, img}) => ({
        title,
        location,
        src: img,
      })));
    });

    axios.get(
      'http://demo3136867.mockable.io/featured',
    ).then(({data}) => {
      setFeatured(data.data.map(({title, location, img}) => ({
        title,
        location,
        src: img,
      })));

    });
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {}
  }, [setImages, setFeatured, setSearchResults]);

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./app.scss file.
   */
  return (
      <main>
        <input type={'text'} value={search} onChange={e => searchHandler(e.target.value)} />
        <h1>Popular around you</h1>
        <SlideShow images={searchResults} imageWidth={17} imageHeight={3*17/4}/>
        <br />
        <h1>Featured</h1>
        <Featured images={featured} width={'17rem'}/>
      </main>
  );
};

export default App;
