import { getStories } from './api.js';

getStories().then(stories => console.log(stories));
