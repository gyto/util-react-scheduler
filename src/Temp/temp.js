// @flow
import * as React from 'react';
import algoliasearch from 'algoliasearch';
// import algoilaSettings from '../config/algoial_settings';
import style from "./themeAutosuggest.module.scss";
import {
    InstantSearch,
    Configure,
    Index,
    Highlight
} from "react-instantsearch/dom";
import {
    connectAutoComplete,
    connectStateResults
} from "react-instantsearch/connectors";
import AutoComplete from './AutoComplete';

type Props = {}
type State = {
    value: string,
    suggestions: Array<Object>
}

let _client: ?algoliasearch;

const appID = process.env.REACT_APP_ALGOLIA_APP_ID;
const searchKey = process.env.REACT_APP_ALGOLIA_API_KEY;
const indexName = 'products';

// const client = algoliasearch (appID, searchKey);

// let queries = [{
//     indexName: 'products',
//     query: '',
//     // params: {
//     //     hitsPerPage: 3,
//     //     filters: '',
//     // },
// }];

// const getClient = function (): Promise<algoliasearch> {
//     _client = algoliasearch(appID, searchKey);
//     return Promise.resolve(_client);
// };

// const getSuggestionValue = suggestion => suggestion.data;

// const renderSuggestion = suggestion => (
//     <div>
//         {suggestion.brand} - {suggestion.material}
//     </div>
// );

// const theme = {
//     container: style.container,
//     containerOpen: style.containerOpen,
//     input: style.input,
//     inputOpen: style.inputOpen,
//     inputFocused: style.inputFocused,
//     suggestionsContainer: style.suggestionsContainer,
//     suggestionsContainerOpen: style.suggestionsContainerOpen,
//     suggestionsList: style.suggestionsList,
//     suggestion: style.suggestion,
//     suggestionFirst: style.suggestionFirst,
//     suggestionHighlighted: style.suggestionHighlighted,
//     sectionContainer: style.sectionContainer,
//     sectionContainerFirst: style.sectionContainerFirst,
//     sectionTitle: style.sectionTitle,
// };

// function renderSuggestion(result): React.Element<'div'> {
//     // console.log('RESULTS', result.hits.forEach(val => console.log(val)));
//     // return result.hits.forEach(val => <div>{val.brand}</div>);
//     console.log('simple result', result);
//     return result.brand;
// }
//
// const combineResults = function (resultSets) {
//     const combined: Set<Object> = new Set();
//     console.log('resultSets', resultSets);
//     resultSets.forEach((result) => {
//         result.hits.forEach((hit) => {
//             combined.add(hit);
//         });
//     });
//
//     return Array.from(combined);
// };
//
// const queryFetch = (query) => {
//     return [{
//         indexName: 'products',
//         query: query,
//     }];
// };

class Algolia extends React.Component<Props, State> {
    // lastSearch = null;

    constructor(props: Props) {
        super(props);

        // this.state = {
        //     value: '',
        //     suggestions: [],
        // };
    }

    // onChange = (event, { newValue }) => {
    //     this.setState({ value: newValue });
    // };
    //
    // getSuggestions = value => {
    //     console.log('VALUES', value);
    //     console.log('VALUE', value.brand);
    //     const inputValue = value.trim();
    //     console.log('GET');
    //
    //     return value.brand;
    // };
    //
    // getSuggestionValue = (result): ?string => {
    //     console.log('result.data', result.brand);
    //     return result.brand;
    // };
    //
    // onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    //     this.lastSearch = new Promise((resolve, reject) => {
    //         getClient()
    //             .then((client) => {
    //                 client.search(queryFetch(value))
    //                     .then(resolve)
    //                     .catch(reject);
    //             })
    //             .catch(reject);
    //     });
    //
    //     this.lastSearch
    //         .then(({ results }) => {
    //             this.setState({
    //                 suggestions: results.map(result => {
    //                     console.log(result);
    //                     return {
    //                         hits: result.hits.map(hit => {
    //                             console.log('result.hits', result.hits);
    //                             return this.getSuggestions(hit);
    //                             // return hit;
    //                         }),
    //                     };
    //                 }),
    //                 // .filter(results => results.hits.length > 0),
    //
    //             });
    //         })
    //         .catch(() => this.setState({ suggestions: [] }));
    // };
    //
    // onSuggestionsClearRequested = () => {
    //     this.setState({
    //         suggestions: [],
    //     });
    // };

    render() {
        // const { suggestions, value } = this.state;
        //
        // const inputProps = {
        //     placeholder: 'Type a programming language',
        //     value,
        //     onChange: this.onChange,
        // };

        return (
            <div>
                <InstantSearch
                    appId={appID}
                    apiKey={searchKey}
                    indexName={indexName}
                    onSearchStateChange={searchState => console.log(searchState)}
                >
                    <AutoComplete />
                    <Configure hitsPerPage={4} />
                </InstantSearch>
            </div>
        );
    }
}

export default Algolia;
