import {similarAds} from './data.js';
import {createCard} from './card.js';

const adt = similarAds[0];
const card = createCard(adt);
document.querySelector('#map-canvas').append(card);

import './restructions.js';
