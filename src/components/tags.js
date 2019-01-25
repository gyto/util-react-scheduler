import camelCase from 'lodash.camelcase';

export const TOPIC_ARRAY_TAGS = [
    'Cardiovascular Disease',
    'Diabetes Management',
    'Heart Failure',
    'Hypertension',
    'Lipid Management',
    'Nutrition',
    'Obesity Management',
    "Women's Health"
];

export const TOPIC_TAGS = Object.assign(...TOPIC_ARRAY_TAGS.map(d => ({ [camelCase(d)]: d })));

export const DAYS = ['Day 1', 'Day 2', 'Day 3'];
