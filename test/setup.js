import { jsdom } from 'jsdom';
import chai from 'chai';
import sinon from 'sinon';
import sinonChai from "sinon-chai";
chai.use(sinonChai);

global.expect = chai.expect;
global.sinon = sinon;
global.document = jsdom('<!DOCTYPE html><html><head></head><body></body></html>');
global.window = document.parentWindow;
global.navigator = {userAgent: 'node.js'};
