import React from 'react';
import TestUtils from 'react-addons-test-utils';
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
        render() {
            props = this.props;
            return <div {...this.props} />;
        }
    }

    let props = null;
    beforeEach(function() {
        props = null;
    });

    it('should use the default options if none are provided', function() {
        const Test = mouseAware()(_Test);
        TestUtils.renderIntoDocument(<Test />);

        // has default property names
        expect(props.isOver).to.exist;
        expect(props.onMouseEnter).to.be.instanceOf(Function);
        expect(props.onMouseLeave).to.be.instanceOf(Function);

        // starts inactive
        expect(props.isOver).to.be.false;

        // syncronously becomes active
        props.onMouseEnter();
        expect(props.isOver).to.be.true;

        // syncronously becomes inactive
        props.onMouseLeave();
        expect(props.isOver).to.be.false;
    });

    it('should honor the "inDelay" option', function(done) {
        const Test = mouseAware({ inDelay: 100 })(_Test);
        TestUtils.renderIntoDocument(<Test />);

        // starts inactive
        expect(props.isOver).to.be.false;

        // asynchronously becomes active
        props.onMouseEnter();
        expect(props.isOver).to.be.false;
        setTimeout(function() {
            expect(props.isOver).to.be.true;
            done();
        }, 300);
    });

    it('should honor the "outDelay" option', function(done) {
        const Test = mouseAware({ outDelay: 100 })(_Test);
        TestUtils.renderIntoDocument(<Test />);

        // starts inactive
        expect(props.isOver).to.be.false;

        // syncronously becomes active
        props.onMouseEnter();
        expect(props.isOver).to.be.true;

        // asynchronously becomes inactive
        props.onMouseLeave();
        expect(props.isOver).to.be.true;
        setTimeout(function() {
            expect(props.isOver).to.be.false;
            done();
        }, 300);
    });

    it('should honor the "inHandler" property', function() {
        const Test = mouseAware({ inHandler: 'foo' })(_Test);
        TestUtils.renderIntoDocument(<Test />);

        expect(props.foo).to.be.instanceOf(Function);
        expect(props.onMouseEnter).to.be.undefined;
    });

    it('should allow name collisions of "inHandler" property name', function() {
        const Test = mouseAware()(_Test);
        const spy = sinon.spy();
        TestUtils.renderIntoDocument(<Test onMouseEnter={spy} />);
        props.onMouseEnter();
        expect(spy).to.be.called;
        expect(props.isOver).to.be.true;
    });

    it('should honor the "outHandler" property', function() {
        const Test = mouseAware({ outHandler: 'foo' })(_Test);
        TestUtils.renderIntoDocument(<Test />);

        expect(props.foo).to.be.instanceOf(Function);
        expect(props.onMouseLeave).to.be.undefined;
    });

    it('should allow name collisions of "outHandler" property name', function() {
        const Test = mouseAware()(_Test);
        const spy = sinon.spy();
        TestUtils.renderIntoDocument(<Test onMouseLeave={spy} />);
        props.onMouseLeave();
        expect(spy).to.be.called;
    })

    it('should honor the "key" property', function() {
        const Test = mouseAware({ key: 'foo' })(_Test);
        TestUtils.renderIntoDocument(<Test />);

        expect(props.foo).to.be.false;
        expect(props.isOver).to.be.undefined;
    });
});
