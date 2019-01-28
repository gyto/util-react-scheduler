// @flow

import * as React from 'react';
import { SCHEDULE } from './schedule';
import { TYPE_ARRAY_TAGS, TOPIC_ARRAY_TAGS, DAYS } from './tags';
import { Accordion, AccordionItem } from 'react-sanfona';

type Props = {}

type State = {
    selectedDay: ?Array<string>,
    selectedTopic: ?Object,
    selectedType: ?Object

}

class Scheduler extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            selectedDay: DAYS[0],
            selectedTopic: null,
            selectedType: null,
        };
    }

    selectedDay = (e: Event) => {
        let target = e.target;
        if (target instanceof HTMLInputElement) {
            this.setState({
                selectedDay: e.target.value,
                selectedTopic: null,
                selectedType: null,
            });
        }
    };

    selectedTopic = (e) => {
        this.setState({
            selectedDay: null,
            selectedTopic: e.target.value,
            selectedType: null,
        });
    };

    selectedType = (e) => {
        this.setState({
            selectedDay: null,
            selectedTopic: null,
            selectedType: e.target.value,
        });
    };

    render() {
        // filter by date
        const days = SCHEDULE.filter(day => day.dayTags.indexOf(this.state.selectedDay) > -1);
        const daysToDisplay = [...DAYS];

        // filter by topics
        const topics = SCHEDULE.filter(day => day.dayTags.indexOf(this.state.selectedTopic) > -1);

        // filter by type
        const types = SCHEDULE.filter(day => day.dayTags.indexOf(this.state.selectedType) > -1);

        return (
            <div>
                <div className="filter">
                    <Accordion>
                        <AccordionItem
                            title={'Filter by Day +'}
                            expanded={true}
                        >
                            {daysToDisplay.map((day, index) => {
                                return <label key={'day-' + index}>
                                    <input
                                        type="radio"
                                        value={day}
                                        onClick={event => this.selectedDay(event)}
                                        name='date'
                                        defaultChecked={day === DAYS[0]}
                                    /> {day}
                                </label>;
                            })}
                        </AccordionItem>
                        <AccordionItem
                            title={'Filter by topics +'}
                        >
                            <div>
                                {TOPIC_ARRAY_TAGS.map((topic, index) => {
                                    return <label key={'topic-' + index}>
                                        <input
                                            type="radio"
                                            value={topic}
                                            name='topic'
                                            onClick={event => this.selectedTopic(event)}
                                        /> {topic}
                                    </label>;
                                })}
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            title={'Filter by type +'}
                        >
                            <div>
                                {TYPE_ARRAY_TAGS.map((type, index) => {
                                    return <label key={'type-' + index}>
                                        <input
                                            type="radio"
                                            value={type}
                                            name='type'
                                            onClick={event => this.selectedType(event)}
                                        /> {type}
                                    </label>;
                                })}
                            </div>
                        </AccordionItem>
                    </Accordion>
                </div>
                {days.map((schedule, index) => {
                    return <React.Fragment key={index}>
                        <h2>{schedule.day}</h2>
                        {schedule.sections && schedule.sections.map((section, sectionIndex) => {
                            return <React.Fragment key={'section-' + sectionIndex}>
                                <h3>{section.topic}</h3>
                                {section.topics && section.topics.map((time, blockIndex) => {
                                    return <React.Fragment key={'block' + blockIndex}>
                                        <p>{time.from} - {time.to}</p>
                                        <p>{time.text}</p>
                                    </React.Fragment>;
                                })}
                            </React.Fragment>;
                        })}
                    </React.Fragment>;
                })}
                {topics.map((schedule, index) => {
                    return <React.Fragment key={index}>
                        <h2>{schedule.day}</h2>
                        {schedule.sections.filter(section => section.topicTags.indexOf(this.state.selectedTopic) > -1).map((section, sectionIndex) => {
                            return <React.Fragment key={'section-' + sectionIndex}>
                                <h3>{section.topic}</h3>
                                {section.topics && section.topics.map((time, blockIndex) => {
                                    return <React.Fragment key={'block' + blockIndex}>
                                        <p>{time.from} - {time.to}</p>
                                        <p>{time.text}</p>
                                    </React.Fragment>;
                                })}
                            </React.Fragment>;
                        })}
                    </React.Fragment>;
                })}
                {types.map((schedule, index) => {
                    return <React.Fragment key={index}>
                        <h2>{schedule.day}</h2>
                        {schedule.sections.filter(section => section.topicTags.indexOf(this.state.selectedType) > -1).map((section, sectionIndex) => {
                            return <React.Fragment key={'section-' + sectionIndex}>
                                <h3>{section.topic}</h3>
                                {section.topics && section.topics.filter(time => time.typeTags.indexOf(this.state.selectedType) > -1).map((time, blockIndex) => {
                                    return <React.Fragment key={'block' + blockIndex}>
                                        <p>{time.from} - {time.to}</p>
                                        <p>{time.text}</p>
                                    </React.Fragment>;
                                })}
                            </React.Fragment>;
                        })}
                    </React.Fragment>;
                })}
            </div>
        );
    }
}

export default Scheduler;

