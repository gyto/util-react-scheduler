// @flow

import * as React from 'react';
import faker from 'faker';
import Autosuggest from 'react-autosuggest';
import style from './themeAutosuggest.module.scss';

type Props = {}
type State = {}

const suggests = [
    {
        brand: 'salad',
        material: 'Stainless Steel',
    },
    {
        brand: 'carrot',
        material: 'Stainless Steel',
    },
    {
        brand: 'jones',
        material: 'Stainless Steel',
    },
];

const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggests.filter(lang =>
        lang.brand.toLowerCase().slice(0, inputLength) === inputValue
    );
};

const getSuggestionValue = suggestion => suggestion.brand;

const renderSuggestion = suggestion => (
    <div>
        {suggestion.brand} - {suggestion.material}
    </div>
);

const theme = {
    container:                style.container,
    containerOpen:            style.containerOpen,
    input:                    style.input,
    inputOpen:                style.inputOpen,
    inputFocused:             style.inputFocused,
    suggestionsContainer:     style.suggestionsContainer,
    suggestionsContainerOpen: style.suggestionsContainerOpen,
    suggestionsList:          style.suggestionsList,
    suggestion:               style.suggestion,
    suggestionFirst:          style.suggestionFirst,
    suggestionHighlighted:    style.suggestionHighlighted,
    sectionContainer:         style.sectionContainer,
    sectionContainerFirst:    style.sectionContainerFirst,
    sectionTitle:             style.sectionTitle,
};

class Search extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
        };
    }

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {
        const { value, suggestions } = this.state;
        const DATA = [
            {
                brand: faker.commerce.productName(),
                price: faker.commerce.price(),
                material: faker.commerce.productMaterial(),
            },
            {
                brand: faker.commerce.productName(),
                price: faker.commerce.price(),
                material: faker.commerce.productMaterial(),
            },
            {
                brand: faker.commerce.productName(),
                price: faker.commerce.price(),
                material: faker.commerce.productMaterial(),
            },
            {
                brand: faker.commerce.productName(),
                price: faker.commerce.price(),
                material: faker.commerce.productMaterial(),
            },
        ];

        console.log(JSON.stringify(DATA));

        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange,
        };

        console.log('suggests', suggests);
        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    theme={theme}
                />

                {DATA.map((item, index) => {
                    return (
                        <div key={index}>
                            <h4>{item.brand}</h4>
                            <p>{item.price} - {item.material}</p>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Search;
