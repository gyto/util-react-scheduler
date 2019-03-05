// @flow
import * as React from 'react';
import {
    InstantSearch,
    Hits,
    SearchBox,
    Pagination,
    Highlight,
    ClearRefinements,
    RefinementList,
    Configure,
} from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch/lite';

const searchClient = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);

type Props = {}

type State = {}

const Hit = (props: Object) => {
    return (
        <div>
            <img src={props.hit.img} align="left" alt={props.hit.brand}/>
            <div className="hit-name">
                <Highlight attribute="brand" hit={props.hit}/>
            </div>
            <div className="hit-description">
                <Highlight attribute="description" hit={props.hit}/>
            </div>
            <div className="hit-price">${props.hit.material}</div>
        </div>
    );
};

class Sort extends React.Component<Props, State> {
    render() {
        return (
            <div>
                <div className="ais-InstantSearch">
                    <h1>React InstantSearch e-commerce demo</h1>
                    <InstantSearch indexName="dev_products" searchClient={searchClient}>
                        <div className="left-panel">
                            <ClearRefinements />
                            <h2>Brands</h2>
                            <RefinementList attribute="brand" />
                            <Configure hitsPerPage={8} />
                        </div>
                        <div className="right-panel">
                            <SearchBox />
                            <Hits hitComponent={Hit} />
                            <Pagination />
                        </div>
                    </InstantSearch>
                </div>
            </div>
        );
    }
}

export default Sort;
