// @flow
import * as React from 'react';
import { PRODUCTS } from "../../api/producs";
import type { Products } from "../types/Products";

type Props = {
    onClick: (index: number) => void,
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
        const { onClick } = this.props;
        return (
            <div style={boxes}>
                {products.map((item, index) => {
                    return <div key={index} style={boxStyle} onClick={() => onClick(item.id)}>
                        <img src={item.img} alt={item.name} />
                        <h4>{item.name}</h4>
                    </div>;
                })}
            </div>
        );
    }
}

export default ItemList;
