import * as React from 'react';
import faker from 'faker';

class CreateRawData extends React.Component<{}> {
    render() {
        const myValue = [
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
            {
                brand: faker.commerce.productName(),
                reference: faker.commerce.productAdjective(),
                material: faker.commerce.productMaterial(),
                img: faker.image.image(),
            },
        ];

        return (
            <div>
                <textarea defaultValue={JSON.stringify(myValue)} rows='10' cols='10' style={{width: '500px'}} />
            </div>
        );
    }
}

export default CreateRawData;
