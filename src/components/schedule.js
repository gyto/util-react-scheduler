import { TOPIC_TAGS, DAYS } from "./tags";

export const SCHEDULE = [
    {
        day: 'Friday, May 3, 2019',
        sections: [
            {
                topic: 'This is Section 1',
                topics: [
                    {
                        from: '6:30',
                        to: '7:00',
                        text: 'Registration and Exhibits',
                        typeTags: []
                    },
                    {
                        from: '6:30',
                        to: '7:00',
                        text: 'Registration and Exhibits',
                        typeTags: []
                    }
                ],
                topicTags: [TOPIC_TAGS.cardiovascularDisease]
            },
            {
                topic: 'This is Section 2',
                topics: [
                    {
                        from: '6:30',
                        to: '7:00',
                        text: 'Registration and Exhibits'
                    }
                ],
                topicTags: []
            }
        ],
        dayTags: [DAYS[0], TOPIC_TAGS.cardiovascularDisease]
    },
    {
        day: 'Saturday, May 4, 2019',
        dayTags: [DAYS[1]]
    },
    {
        day: 'Sunday, May 5, 2019',
        dayTags: [DAYS[2]]
    }
];
