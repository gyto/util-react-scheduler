import * as React from 'react';
import { mount, shallow } from 'enzyme';
import Tabs from '../../components/Tabs';

class MockItemList extends React.Component<{}> {
    render() {
        return <div/>;
    }
}
jest.mock('../../components/Tabs/ItemList', () => {
    return jest.fn().mockImplementation((passedProps) => {
        return <MockItemList {...passedProps}/>;
    });
});

class MockItemPanel extends React.Component<{}> {
    render() {
        return <div/>;
    }
}
jest.mock('../../components/Tabs/ItemPanel', () => {
    return jest.fn().mockImplementation((passedProps) => {
        return <MockItemPanel {...passedProps}/>;
    });
});

describe('Tabs', () => {
    let props;
    let mountedRender;
    let shallowRender;

    const getMounted = () => {
        if (!mountedRender) {
            mountedRender = mount(
                <Tabs {...props} />
            );
        }
        return mountedRender;
    };

    const getShallow = () => {
        if (!shallowRender) {
            shallowRender = shallow(
                <Tabs {...props} />
            );
        }
        return shallowRender;
    };

    beforeEach(() => {
        jest.clearAllMocks();

        mountedRender = undefined;
    });

    it('matches snapshot', () => {
        expect(getShallow()).toMatchSnapshot();
    });

    it('expecting MockItemList prop onClick to be function', () => {
        expect(getMounted().find('MockItemList')).toHaveLength(1);
        expect(typeof getMounted().find('MockItemList').prop('onClick')).toBe('function');
    });

    it('should change a prop of MockItemPanel when MockItemList is clicked', () => {
        getMounted().find('MockItemList').prop('onClick')(1);
        getMounted().update();

        expect(getMounted().find('MockItemPanel').prop('selected')).toEqual(1);
    });
});
