// @flow
import * as React from 'react';
// import algoliasearch from 'algoliasearch';
// import algoilaSettings from '../config/algoial_settings';
import style from './themeAutosuggest.module.scss';
import { InstantSearch, Configure, /*Index,*/ connectHighlight } from 'react-instantsearch-dom';
import { connectAutoComplete } from 'react-instantsearch/connectors';
import Autosuggest from 'react-autosuggest';

type Props = {
    hits: Array<Object>,
    refine: Function
}
type State = {
    value: string,
    hits: Array<Object>,
    visibleSearch: boolean
}

const appID = process.env.REACT_APP_ALGOLIA_APP_ID;
const searchKey = process.env.REACT_APP_ALGOLIA_API_KEY;
const indexName = 'dev_products';

const Algolia = () => (
    <InstantSearch
        appId={appID}
        apiKey={searchKey}
        indexName={indexName}
        onSearchStateChange={searchState => searchState}
    >
        <AutoComplete/>
        <Configure hitsPerPage={5}/>
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
                        <React.Fragment key={index}>{part.value}</React.Fragment>
                    )
            )}
        </>
    );
};

const CustomHighlight = connectHighlight(Highlight);

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

class Hits extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            value: '',
            hits: [],
            visibleSearch: false,
        };
    }

    componentWillReceiveProps(props) {
        this.setState({ hits: !this.state.value ? [] : props.hits });
    }

    onSuggestionSelected = (
        event: SyntheticInputEvent<HTMLInputElement>,
        hit
    ): void => {
        event.preventDefault();
        event.stopPropagation();
        window.location.assign(hit.suggestion._webUrl);
    };

    renderSuggestion = (hit) => {
        return (
            <div className={style.itemContainer}>
                <figure className={style.itemImg}>
                    <img src={hit.img} alt=""/>
                </figure>
                <div className={style.itemDesc}>
                    <h2><CustomHighlight attribute="brand" hit={hit}/></h2>
                    <p><CustomHighlight attribute="material" hit={hit}/>
                        <CustomHighlight attribute="reference" hit={hit}/></p>
                </div>
            </div>
        );
    };

    handleSearch = () => {
        this.setState({ visibleSearch: true });
    };

    render() {
        const { visibleSearch, hits } = this.state;
        const { /*hits, currentRefinement,*/ refine } = this.props;

        const openSearch = (visibleSearch) ? style.autoCompleteInputOpen : style.autoCompleteInputClosed;

        return (
            <div className={style.tempClass}>
                <div className={[openSearch, style.autoCompleteInput].join(' ')} onClick={this.handleSearch}>
                    <Autosuggest
                        suggestions={hits}
                        multiSection={false}
                        onSuggestionsFetchRequested={({ value }) => refine(value)}
                        onSuggestionsClearRequested={() => this.setState({ hits: [] })}
                        getSuggestionValue={hit => hit.brand}
                        onSuggestionSelected={this.onSuggestionSelected}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={{
                            placeholder: 'Type a product',
                            value: this.state.value,
                            id: 'search',
                            onBlur: () => this.setState({ visibleSearch: false }),
                            onChange: (event, { newValue }) => this.setState({ value: newValue }),
                        }}
                        renderSectionTitle={section => section.index}
                        getSectionSuggestions={section => section.hits}
                        theme={theme}
                    />
                </div>
            </div>
        );
    }
}

const AutoComplete = connectAutoComplete(Hits);

export default Algolia;

