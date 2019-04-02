// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { toggleMenu } from '../../actions/toggleMenu';
import Event from './Events/Event';
import Header from './containers/Header';
import EventPanel from './Events/EventPanel';
import layoutStyles from './scss/layout.module.scss';
import buttonStyles from './scss/button.module.scss';

type Props = {
    toggleMenu: (boolean) => void,
    menu: ?boolean,
}

type State = {
    eventId: ?string
}

/**
 * TODO: create event cards
 * TODO: should accept {name, startIn(date, time), endsIn(date, time), serviceId, status, appxTotal }
 */

class Events extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            eventId: null,
        };
    }

    manageEvent = (id: string) => {
        this.props.toggleMenu(true);
        this.setState({ eventId: id });
    };

    render() {
        const { eventId } = this.state;

        return (
            <div id='outer-container'>
                <Header title={'Events'}/>
                <div className={layoutStyles.container}>
                    <EventPanel eventId={eventId}/>
                    <div id="page-wrap">
                        <Event callbackId={this.manageEvent}/>
                    </div>
                    <button
                        className={buttonStyles.addButton}
                        onClick={() => {
                            this.props.toggleMenu(true);
                            this.setState({ eventId: null });
                        }}
                    >Add</button>
                </div>
            </div>
        );
    }
}

const EventsRedux = connect(
    state => ({
        menu: state.menu,
    }),
    dispatch => ({
        toggleMenu: (toggle: boolean) => {
            dispatch(toggleMenu(toggle));
        },
    })
)(Events);

export default EventsRedux;
