import * as React from 'react';
import {shallow, mount} from 'enzyme';
import ItemPanel from '../../../components/Tabs/ItemPanel';

describe('ItemPanel', () => {
    let props;
    let shallowRender;
    let mountedRender;

    const getMounted = () => {
        if (!mountedRender) mountedRender = mount(<ItemPanel {...props} />);
        return mountedRender;
    };

    const getShallow = () => {
        if (!shallowRender) shallowRender = shallow(<ItemPanel {...props} />);
        return shallowRender;
    };

    beforeEach(() => {
        jest.clearAllMocks();

        props = {
            selected: null,
        };

        shallowRender = undefined;
        mountedRender = undefined;
    });

    it('matches snapshot', () => {
        expect(getShallow()).toMatchSnapshot();
    });

    it('renders component and expect regular text', () => {
        expect(getMounted().find('p').first().text()).toEqual('Please select product tab')
    });

    it('not renders regular text ', () => {
        props.selected = 1;
        console.log(getMounted().debug());
        expect(getMounted().find('p').first().text()).not.toEqual('Please select product tab');
        expect(getMounted().prop('selected')).toEqual(1);
    });
});
