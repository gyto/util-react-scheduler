// @flow
import * as React from 'react';
import EventInputs from './EventInputs';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import TopicInputs from "./TopicInputs";

type Props = {}

type State = {
    treeData: Array<Object>,
    events: Array<Object>,
    inputValue: string
}

class SchedulerBuilder extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            treeData: [{title: 'super', note: 'nesty'}],
            events: [],
            topics: [],
            inputValue: '',
        };
    }

    addEvents = () => {
        // const events = this.state.events.concat(EventInputs);
        const events = this.state.events.concat(EventInputs);
        this.setState({ events });
    };

    addTopics = () => {
        const topics = this.state.topics.concat(TopicInputs);
        this.setState({ topics });
    }

    handleChange = (e) => {
        this.setState({inputValue: e.target.value});
    }

    handleKeyDown = (e: SyntheticKeyboardEvent<HTMLButtonElement>) => {
        const key = e.key;
        if (key === 'Enter') {
            e.preventDefault();
            console.log('Works');
            this.setState({
                treeData: [...this.state.treeData, {title: e.currentTarget.value}],
            })
            console.log(this.state.treeData);
        }
    };

    render() {
        const events = this.state.events.map((Input, index) => {
            return <Input key={index} index={'input' + index} />;
        });

        const topics = this.state.topics.map((Input, index) => {
            return <Input key={index} index={'topic' + index}>
                {events}
                <button onClick={this.addEvents}>Add Add Event</button>
            </Input>;
        });

        return (
            <div>
                <div>
                    Days<br/>
                    <label>
                        Day <input type="text" />
                    </label><br/>
                    <label>
                        Day Tags
                    </label>
                    <hr/>

                    {topics}
                    <button onClick={this.addTopics}>Add Topic</button>

                </div>

                <div>
                    <input
                        type="text"
                        onKeyDown={this.handleKeyDown}
                        // onChange={this.handleChange}
                    />
                </div>

                <div style={{ height: 400 }}>
                    <SortableTree
                        treeData={this.state.treeData}
                        onChange={treeData => this.setState({ treeData })}
                    />
                </div>
            </div>
        );
    }
}

export default SchedulerBuilder;
