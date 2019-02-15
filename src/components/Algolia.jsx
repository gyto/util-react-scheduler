// @flow
import * as React from 'react';
import algoliasearch from 'algoliasearch';
// import algoilaSettings from '../config/algoial_settings';
import style from './themeAutosuggest.module.scss';
import faker from 'faker';

import {
    InstantSearch,
    Configure,
    Index,
    // Highlight,
    connectHighlight,
} from 'react-instantsearch-dom';
import {
    connectAutoComplete,
    connectStateResults,
} from 'react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';

type Props = {
    hits: Array<Object>,
    refine: Function
}
type State = {
    value: string,
    hits: Array<Object>
}

const appID = process.env.REACT_APP_ALGOLIA_APP_ID;
const searchKey = process.env.REACT_APP_ALGOLIA_API_KEY;
const indexName = 'dev_products';


const Algolia = () => (
    <InstantSearch
        appId={appID}
        apiKey={searchKey}
        indexName={indexName}
        onSearchStateChange={searchState => console.log(searchState)}
    >
        <AutoComplete />
        <Configure hitsPerPage={3} />
    </InstantSearch>
);

const Highlight = ({ highlight, attribute, hit }) => {
    const parsedHit = highlight({
        highlightProperty: '_highlightResult',
        attribute,
        hit,
    });

    return (
        <>
            {parsedHit.map(
                (part, index) =>
                    part.isHighlighted ? (
                        <mark key={index}>{part.value}</mark>
                    ) : (
                        <span key={index}>{part.value}</span>
                    )
            )}
        </>
    );
};

const CustomHighlight = connectHighlight(Highlight);

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


class Hits extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { value: '', hits: [] };
    }

    componentWillReceiveProps(props) {
        this.setState({ hits: !this.state.value ? [] : props.hits });
        console.log('props', props);
    }

    render() {
        const { hits, currentRefinement, refine } = this.props;
        console.log('thisprops', this.props);
        console.log('state', this.state);
        return (
            <Autosuggest
                suggestions={this.state.hits}
                multiSection={false}
                onSuggestionsFetchRequested={({ value }) => refine(value)}
                onSuggestionsClearRequested={() => this.setState({ hits: [] })}
                getSuggestionValue={hit => hit.brand}
                renderSuggestion={hit => (
                    <div className={style.itemContainer}>
                        <figure className={style.itemImg}>
                            <img src={hit.img} alt=""/>
                        </figure>
                        <CustomHighlight attribute="brand" hit={hit} />
                        <CustomHighlight attribute="material" hit={hit} />
                        <CustomHighlight attribute="reference" hit={hit} />
                        {console.log('hit', hit)}
                    </div>
                )}
                inputProps={{
                    placeholder: 'Type a product',
                    value: this.state.value,
                    onChange: (event, { newValue, method }) => {
                        this.setState({ value: newValue });
                    },
                }}
                renderSectionTitle={section => section.index}
                getSectionSuggestions={section => section.hits}
                theme={theme}
            />
        );
    }
}

const AutoComplete = connectAutoComplete(Hits);

const Loading = connectStateResults(({ searching }) => {
    console.log('searching', searching);
    return <div>{searching}</div>;
});

export default Algolia;

