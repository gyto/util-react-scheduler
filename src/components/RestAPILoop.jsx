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
        const queries = ['country=us', 'country=ua'];
        /**
         * link example https://newsapi.org/v2/top-headlines?country=us&apiKey=key
         */
        queries.forEach(query => {
            axios.get(`${API_LINK}/top-headlines?${query}&apiKey=${API_KEY}`)
                .then((response: ResponseData) => {
                    // queryArr.push(...response.data.articles);
                    this.setState(prevState => ({
                        news: [...prevState.news, ...response.data.articles],
                    }));
                })
                .catch(error => console.log(error));
        });
    }

    render() {
        const { news } = this.state;

        return <>
            {news.map((article, index) => {
                return <p key={index}>
                    {article.description} - <a
                        href={article.url}
                        rel='noopener noreferrer'
                        target='_blank'
                        style={linkStyle}
                    >link</a>
                </p>;
            })}
        </>;
    }
}
