const enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');
const jsdom = require('jsdom');

enzyme.configure({ adapter: new Adapter() });

const { JSDOM } = jsdom;

const DOM = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = DOM;

window.Object = Object;
window.Math = Math;

global.window = window;
global.document = window.document;
global.navigator = {
    userAgent: 'node.js',
};

function copyProps(src, target) {
    const props = Object.getOwnPropertyNames(src)
        .filter(prop => typeof target[prop] === 'undefined')
        .map(prop => Object.getOwnPropertyDescriptor(src, prop));
    Object.defineProperties(target, props);
}
copyProps(window, global);
global.self = global.window;
