// @flow
import * as React from 'react';
import { push as Menu } from 'react-burger-menu';

type Props = {
    children: React.Node,
    open: boolean,
}

class MenuContainer extends React.Component<Props> {
    render() {
        return (
            <Menu
                isOpen={this.props.open}
                pageWrapId='page-wrap'
                outerContainerId='outer-container'
                customCrossIcon={ false }
                customBurgerIcon={ false }
            >
                {this.props.children}
            </Menu>
        );
    }
}

export default MenuContainer;
