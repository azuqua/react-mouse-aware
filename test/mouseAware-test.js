import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import { mouseAware } from '../src/mouseAware';

describe('mouseAware decorator', function() {

    it('should be a function', function() {
        expect(mouseAware).to.be.instanceOf(Function);
    });

    it('should optionally take an options object', function() {
        expect(() => mouseAware()).to.not.throw();
        expect(() => mouseAware({})).to.not.throw();
    });

    it('should return a mouseAware component factory', function() {
        expect(mouseAware()).to.be.instanceOf(Function);
    });
});

describe('mouseAware component factory', function() {

    let factory = null;
    before(function() {
        factory = mouseAware();
    });

    it('should be a function', function() {
        expect(factory).to.be.instanceOf(Function);
    });

    it('must accept one Component class', function() {
        class Test extends React.Component {};
        expect(() => factory()).to.throw();
        expect(() => factory(Test)).to.not.throw();
    });

    it('must return a WrappedComponent', function() {
        class Test extends React.Component {};
        const res = factory(Test);

        // expect(res).to.be.instanceOf(React.Component); // TODO why doesn't this work??
        expect(res.displayName).to.equal('MouseAware(Test)');
    });
});

describe('mouseAware Component', function() {

    class _Test extends React.Component {
        render() { return <div {...this.props} />; }
    }

    let renderer = null;
    beforeEach(function() {
        renderer = ReactTestUtils.createRenderer();
    });

    it('should use the default options if none are provided', function() {

        const Test = mouseAware()(_Test);
        renderer.render(<Test />);
        const result = renderer.getRenderOutput();

        expect(result.props.isOver).to.exist;
        expect(result.props.onMouseEnter).to.be.instanceOf(Function);
        expect(result.props.onMouseLeave).to.be.instanceOf(Function);
    });

    describe('using the "inDelay" option', function() {

    });

    describe('using the "outDelay" option', function() {

    });

    describe('using the "inHandler" option', function() {

    });

    describe('using the "outHandler" option', function() {

    });

    describe('using the "key" option', function() {

    });
});
