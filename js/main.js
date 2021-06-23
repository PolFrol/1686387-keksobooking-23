import {createAd} from './data.js';
import {SIMILAR_AD_COUNT} from './data.js';

const simalarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());

simalarAds;
