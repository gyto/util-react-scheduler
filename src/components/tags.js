import camelCase from 'lodash.camelcase';

export const TOPIC_ARRAY_TAGS = [
    'Cardiovascular Disease',
    'Diabetes Management',
    'Heart Failure',
    'Hypertension',
    'Lipid Management',
    'Nutrition',
    'Obesity Management',
    'Women\'s Health',
];

export const TYPE_ARRAY_TAGS = [
    'CME Symposium',
    'Exhibit Break',
    'Session I: Obesity and Lifestyle Management',
    'Session II: Dyslipidemia / Atherosclerosis / Thrombosis',
    'Session III: Heart Failure and Hypertension',
    'Session IV: Diabetes Management',
    'Keynote',
    'PME Symposium',
    'Reception',
    'Women\'s Health Summit',
];

/**
 * dynamic variable which will create an object from array
 * example: TOPIC_TAGS = [ { yourTitle: 'Your Title' } ]
 * @type {any}
 */
export const TOPIC_TAGS = Object.assign(...TOPIC_ARRAY_TAGS.map(t => ({ [camelCase(t)]: t })));

export const TYPE_TAGS = Object.assign(...TYPE_ARRAY_TAGS.map(t => ({ [camelCase(t)]: t })));

export const DAYS = ['Day 1', 'Day 2', 'Day 3'];
