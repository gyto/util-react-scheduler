// @flow
import * as React from 'react';
import { PRODUCT_ITEM} from '../../api/producs';
import type { ProductItem } from '../types/Products';

type Props = {
    selected: ?number
}

type State = {
    productItem: ProductItem[],
}

class ItemPanel extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            productItem: PRODUCT_ITEM,
        };
    }

    render() {
        const { productItem } = this.state;
        const selectedItem = productItem.filter(item => {
            return item.id === this.props.selected;
        });

        return (
            <div>
                {this.props.selected ? selectedItem.map((item, index) => {
                    return <div key={index}>
                        <p>{item.id}</p>
                        <p>{item.name}</p>
                        <p>{item.text}</p>
                    </div>;
                }) : <p>Please select product tab</p>}
            </div>
        );
    }
}

export default ItemPanel;
