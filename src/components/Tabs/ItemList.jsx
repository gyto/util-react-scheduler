// @flow
import * as React from 'react';
import { PRODUCTS } from '../../api/producs';
import type { Products } from '../types/Products';

type Props = {
    itemClick: (index: number) => void,
}

type State = {
    products: Products[]
}

const boxStyle = {
    border: '1px solid gray',
    width: '200px',
    display: 'flex',
};

const boxes = {
    display: 'flex',
    flexDirection: 'column',
};

class ItemList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            products: PRODUCTS,
        };
    }

    render() {
        const { products } = this.state;
        const { itemClick } = this.props;
        return (
            <div style={boxes}>
                {products.map((item, index) => {
                    return <button key={index} style={boxStyle} onClick={() => itemClick(item.id)}>
                        <img src={item.img} alt={item.name} />
                        <h4>{item.name}</h4>
                    </button>;
                })}
            </div>
        );
    }
}

export default ItemList;
