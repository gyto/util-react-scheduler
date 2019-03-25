// @flow
import * as React from 'react';
import axios from 'axios';

type Props = {}

type State = {
    news: Array<Object>
}

type ResponseData = Object & {
    data: {
        articles: Object,
        status: string,
        totalResults: number,
    }
}

const API_LINK = process.env.REACT_APP_NEWS_API_LINK;
const API_KEY = process.env.REACT_APP_NEWS_API;

const linkStyle = {
    fontSize: '12px',
    color: '#fff',
    backgroundColor: '#008cff',
    borderRadius: '4px',
    padding: '3px',
};

export default class RestApiLoop extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            news: [],
        };
    }

    componentDidMount(): void {
        this.fetchApi();
    }

    fetchApi = () => {
        const queries = ['country=us', 'country=ua'];
        /**
         * link example https://newsapi.org/v2/top-headlines?country=us&apiKey=key
         */

        let requests = queries.map(query => axios
            .get(`${API_LINK}/top-headlines?${query}&apiKey=${API_KEY}`));

        axios.all(requests)
            .then((responses: ResponseData[]) => responses.forEach(response => {
                this.setState(prevState => ({
                    news: [...prevState.news, ...response.data.articles],
                }));
            })).catch(error => console.log(error));
    };

    handleRemove = (id: number) => {
        this.setState(({news}) => {
            let item = [ ...news ];
            item.splice(id, 1);
            return { news: item };
        });
    };

    handleRemoveAll = () => {
        this.setState({ news: []});
    };

    render() {
        const { news } = this.state;

        return <>
            <div>
                <button onClick={this.handleRemoveAll}>Remove All</button>
            </div>
            {news.map((article, index) => {
                return <p key={index}>
                    {article.title} - <a
                        href={article.url}
                        rel='noopener noreferrer'
                        target='_blank'
                        style={linkStyle}
                    >link</a>
                    <button onClick={() => this.handleRemove(index)}>Remove</button>
                </p>;
            })}
        </>;
    }
}
