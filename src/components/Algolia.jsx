// @flow
import * as React from 'react';
import algoliasearch from 'algoliasearch';
// import algoilaSettings from '../config/algoial_settings';
import Autosuggest from 'react-autosuggest';
import style from "./themeAutosuggest.module.scss";

type Props = {}
type State = {
    value: string,
    suggestions: Array<Object>
}

let _client: ?algoliasearch;

const appID = process.env.REACT_APP_ALGOLIA_APP_ID;
const searchKey = process.env.REACT_APP_ALGOLIA_API_KEY;

// const client = algoliasearch (appID, searchKey);

// let queries = [{
//     indexName: 'products',
//     query: '',
//     // params: {
//     //     hitsPerPage: 3,
//     //     filters: '',
//     // },
// }];

const getClient = function (): Promise<algoliasearch> {
    _client = algoliasearch(appID, searchKey);
    return Promise.resolve(_client);
};

// const getSuggestionValue = suggestion => suggestion.data;

// const renderSuggestion = suggestion => (
//     <div>
//         {suggestion.brand} - {suggestion.material}
//     </div>
// );

const theme = {
    container: style.container,
    containerOpen: style.containerOpen,
    input: style.input,
    inputOpen: style.inputOpen,
    inputFocused: style.inputFocused,
    suggestionsContainer: style.suggestionsContainer,
    suggestionsContainerOpen: style.suggestionsContainerOpen,
    suggestionsList: style.suggestionsList,
    suggestion: style.suggestion,
    suggestionFirst: style.suggestionFirst,
    suggestionHighlighted: style.suggestionHighlighted,
    sectionContainer: style.sectionContainer,
    sectionContainerFirst: style.sectionContainerFirst,
    sectionTitle: style.sectionTitle,
};

function renderSuggestion(result): React.Element<'div'> {
    console.log('RESULTS', result);
    const product = result.data;
    return <div>{product}</div>;
}

const combineResults = function (resultSets) {
    const combined: Set<Object> = new Set();
    console.log('resultSets', resultSets);
    resultSets.forEach((result) => {
        result.hits.forEach((hit) => {
            combined.add(hit);
        });
    });

    return Array.from(combined);
};

const queryFetch = (query) => {
    return [{
        indexName: 'products',
        query: query,
    }];
};

class Algolia extends React.Component<Props, State> {
    lastSearch = null;

    constructor(props: Props) {
        super(props);

        this.state = {
            value: '',
            suggestions: [],
        };
    }

    componentDidMount() {
        // this.fetchProducts();
    }

    // fetchProducts = () => {
    //     getClient()
    //         .then((client) => {
    //             client.search(queries)
    //                 .then(results => {
    //                     // console.log(combineResults(results));
    //                     // const combined: Set<Object> = new Set();
    //                     // results && results.forEach((result) => {
    //                     //     result.hits.forEach((hit) => {
    //                     //         combined.add(hit);
    //                     //     });
    //                     // });
    //                     // Array.from(combined);
    //                     // console.log(combined);
    //                     this.setState({suggestions: results});
    //                 })
    //                 .catch(error => {
    //                     throw new Error(error);
    //                 });
    //         })
    //         .catch(error => {
    //             throw new Error(error);
    //         });
    // };

    onChange = (event, { newValue }) => {
        this.setState({ value: newValue });
    };

    getSuggestionValue = (suggestion): ?string => {
        console.log('suggestion.data', suggestion);
        return suggestion.data.brand;
    };

    onSuggestionsFetchRequested = ({ value }: { value: string }) => {
        this.lastSearch = new Promise((resolve, reject) => {
            getClient()
                .then((client) => {
                    client.search(queryFetch(value))
                        .then(resolve)
                        .catch(reject);
                })
                .catch(reject);
        });

        this.lastSearch
            .then(({ results }) => {
                this.setState({
                    suggestions: results.map(result => {
                        console.log(result);
                        console.log('result.hits', result.hits);
                        return {
                            hits: result.hits.map(hit => {
                                return { data: hit };
                            }),
                        };
                    }),
                    // .filter(results => results.hits.length > 0),

                });
            })
            .catch(() => this.setState({ suggestions: [] }));
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: [],
        });
    };

    render() {
        const { suggestions, value } = this.state;

        const inputProps = {
            placeholder: 'Type a programming language',
            value,
            onChange: this.onChange,
        };

        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps}
                    theme={theme}
                />
            </div>
        );
    }
}

export default Algolia;
