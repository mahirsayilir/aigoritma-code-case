import * as React from 'react';
import classnames from 'classnames';
import styles from './input.scss';

const cx = classnames.bind(styles);

export default class Input extends React.Component {

    render() {
        return (
            <input className={cx('movie-input', {'has-error': this.props.valid})} {...this.props} />
        )
    }
}