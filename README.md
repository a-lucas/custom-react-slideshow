# Slideshow

Generated using [Nx](https://nx.dev).

Why choosing `nx` over other boilerplate ?

- Curiosity
- It doesn't include any React boilerplate
- It got a decent Typescript support
- It supports E2E out of the box with cypress.io

### What is in this project?

- A custom Slideshow
(tested with cypress e2e)

- A Custom Feature

### What it doesn't have

- A `master` branch

### Responsiveness

It has 2 responsiveness capabilities

- Traditional breakpoints (mobile, tablet, desktop, large desktops)
- **Antoine's special** - Fully vector scalable UX with `REM` and `VW`.
*If you present your work on a giant cinema screen, everything will scale up nicely.*
   
```scss

body, html {
  font-size: 4vw;
}
@media  (orientation: landscape){
  body, html {font-size: 2vw;}
}
@media (min-width: 576px) and (orientation: portrait){
  body, html {font-size: 3.5vw}
}
@media (min-width: 768px) {
  body, html {font-size: 2vw}
}
@media (min-width: 992px) {
  body, html {font-size: 1vw}
}
@media (min-width: 1200px) {
  body, html {font-size: 0.8vw}
}
....

```


### How to RUN

TLTR;

You can watch the cypress VIDEO here (Click Download)

[Link to the Cypress.io e2e Video](cypress/videos/app.spec.ts.mp4)


**Want to run it locally?**

```bash
git clone 
# cd in the new folder
npm install -g @nrwl/cli
npm install 

# Just play with it: 
npm run start

# Run Cypress e2e
nx run slideshow-e2e:e2e --watch

```


### What is missing?

More e2e testing.
