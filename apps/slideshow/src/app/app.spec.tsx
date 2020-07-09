import React from 'react';
import { render } from '@testing-library/react';

import App,{searchImages} from './app';
import { IImage } from './image/image';

describe('App', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<App />);

    expect(baseElement).toBeTruthy();
  });

  it('searchImages should work ok', () => {
    const images: IImage[] = [
      {title: 'Some testing', location: '', src: '', height: '', width: ''},
      {title: 'WoRD123 abcde ', location: '', src: '', height: '', width: ''},
      {title: 'Respect for (*&& special characters', location: '', src: '', height: '', width: ''},
      {title: '   and the white space', location: '', src: '', height: '', width: ''},
    ]
    expect(searchImages('aaa', images).length ===0).toBeTruthy();
    expect(searchImages('Some', images).length ===1).toBeTruthy();
    expect(searchImages('SOME', images).length ===1).toBeTruthy();
    expect(searchImages('E', images).length ===4).toBeTruthy();
    expect(searchImages('Some', images)[0].title === images[0].title).toBeTruthy();
    expect(searchImages('testing', images)[0].title === images[0].title).toBeTruthy();
    expect(searchImages('SOME', images)[0].title === images[0].title).toBeTruthy();
    expect(searchImages('r (', images)[0].title === images[2].title).toBeTruthy();
  });
});
