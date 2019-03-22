// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { addToCart } from '../actions/SetCart';

type Props = {
    addToCart: (number) => void,
    cart: Array<number>
}

type State = {
    products: Array<number>
}

export class Cart extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            products: [1, 2, 3],
        };
    }

    addToCart = (id: number) => {
        this.props.addToCart(id);
    };

    render() {
        return (
            <div>
                {this.state.products.map((product, index) => {
                    return <div key={index}>Cart Item #{product}
                        <button
                            onClick={() => this.addToCart(index)}
                        >add to cart</button>
                    </div>;
                })}
                {this.props.cart.productId ? `[${this.props.cart.productId}]` : 'no store'}
            </div>
        );
    }
}

const CartRedux = connect(
    state => ({
        cart: state.cart,
    }),
    dispatch => ({
        addToCart: (id) => {
            dispatch(addToCart(id));
        },
    })
)(Cart);

export default CartRedux;
