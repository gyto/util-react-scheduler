// @flow

import * as React from 'react';
import { SCHEDULE } from './schedule'
import { TOPIC_ARRAY_TAGS, TOPIC_TAGS, DAYS } from "./tags";
import { Accordion, AccordionItem } from 'react-sanfona';
import kebabCase from 'lodash.kebabcase';

class Scheduler extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedDay: DAYS[0],
            selectedTopic: 'Cardiovascular Disease',
        }
    }

    selectedDay = (e) => {
        this.setState({ selectedDay: e.target.value });
        console.log(this.state.selectedDay);
    };

    selectedTopic = (e) => {
        console.log(e.target.value);
    };

    render() {
        console.log(TOPIC_TAGS);
        // const topics = SCHEDULE.map(
        //     schedule => schedule.sections && schedule.sections.filter((section) => {
        //         return section.topicTags.indexOf(TITLE_TAGS.CardiovascularDisease)
        //     }));

        // const days = SCHEDULE.map((schedule) => {
        //     return schedule.sections;
        // }).filter(day => day.dayTags.indexOf(TITLE_TAGS.day1) > -1);

        // filter by date
        const days = SCHEDULE.filter(day => day.dayTags.indexOf(this.state.selectedDay) > -1);
        const daysToDisplay = [...DAYS];

        // filter by topics
        // const topics = SCHEDULE.filter(day => day.dayTags && day.dayTags.indexOf(this.state.selectedTopic) > -1).map(day => day.sections.filter(topic => topic.topicTags.indexOf(this.state.selectedTopic) > -1));
        const topics = SCHEDULE.filter(day => day.dayTags.indexOf(this.state.selectedTopic) > -1);
        // const topics = SCHEDULE.map(day => day.sections && day.sections.filter(topic => topic.topicTags.indexOf(this.state.selectedTopic) > -1));

        console.log('topcis', topics);

        return (
            <div>
                <div className="filter">
                    <Accordion>
                        <AccordionItem
                            title={'Filter by Day +'}
                            expanded={true}
                        >
                            {daysToDisplay.map((day, index) => {
                                return <label key={index}>
                                    <input
                                        type="radio"
                                        value={day}
                                        onClick={event => this.selectedDay(event)}
                                        name='date'
                                        defaultChecked={day === DAYS[0]}
                                    /> {day}
                                </label>
                            })}
                        </AccordionItem>
                        <AccordionItem
                            title={'Filter by topics +'}
                        >
                            <div>
                                {TOPIC_ARRAY_TAGS.map((tag, index) => {
                                    return <label key={index}>
                                        <input
                                            type="radio"
                                            value={tag}
                                            name='topic'
                                            onClick={event => this.selectedTopic(event)}
                                        /> {tag}
                                    </label>
                                })}
                            </div>
                        </AccordionItem>
                        <AccordionItem
                            title={'Filter by type +'}
                        >
                            <div>TODO</div>
                        </AccordionItem>
                    </Accordion>
                </div>
                {console.log(SCHEDULE)}
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
                                    </React.Fragment>
                                })}
                            </React.Fragment>
                        })}
                    </React.Fragment>
                })}
            </div>
        );
    }
}

export default Scheduler;


