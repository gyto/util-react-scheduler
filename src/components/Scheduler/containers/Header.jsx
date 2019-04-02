// @flow

import * as React from 'react';
import styles from './Header.module.scss';

type Props = {
  title: string
}

type State = {}

class Header extends React.Component<Props, State> {
    render() {
        return (
            <header className={styles.header}>
                <div className={styles.title}>{this.props.title}</div>
            </header>
        );
    }
}

export default Header;
