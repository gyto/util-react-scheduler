const Enzyme = require('enzyme');
const EnzymeAdapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new EnzymeAdapter() });

global.window.alert = (msg) => { console.log(msg); };
global.window.matchMedia = () => ({});
global.window.scrollTo = () => { };
