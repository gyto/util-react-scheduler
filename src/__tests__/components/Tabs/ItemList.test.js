import * as React from 'react';
import {shallow, mount} from 'enzyme';
import ItemList from '../../../components/Tabs/ItemList';

describe('ItemList', () => {
    let props;
    let shallowRender;
    let mountedRender;

    const getMounted = () => {
        if (!mountedRender) mountedRender = mount(<ItemList {...props} />);
        return mountedRender;
    };

    const getShallow = () => {
        if (!shallowRender) shallowRender = shallow(<ItemList {...props} />);
        return shallowRender;
    };

    beforeEach(() => {
        jest.clearAllMocks();

        props = {
            itemClick: jest.fn(),
        };

        shallowRender = undefined;
        mountedRender = undefined;
    });

    it('matches snapshot', () => {
        expect(getShallow()).toMatchSnapshot();
    });

    it('renders onClick and return a item id', () => {
        getShallow().find('button').first().prop('onClick')();
        expect(typeof getMounted().find('button').first().prop('onClick')).toBe('function');
        expect(props.itemClick).toHaveBeenLastCalledWith(1);
    });
});
