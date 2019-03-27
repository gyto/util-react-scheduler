// @flow
import * as React from 'react';
import ItemList from './Tabs/ItemList';
import ItemPanel from './Tabs/ItemPanel';

type Props = {}

type State = {
    selectedProduct: ?number
}

const panel = {
    display: 'flex',
};

class Tabs extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedProduct: null,
        };
    }

    openTab = (index: number) => {
        this.setState({ selectedProduct: index});
    };

    render() {
        const { selectedProduct } = this.state;
        return (
            <div style={panel}>
                <ItemList itemClick={this.openTab}/>
                <ItemPanel selected={selectedProduct}/>
            </div>
        );
    }
}

export default Tabs;
