import * as React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import styles from './pill.scss';

const cx = classnames.bind(styles);

export default class Pill extends React.Component {

    render() {
        const { children, theme } = this.props;
        return (
            <div className={cx('pill', `pill-${theme}`)}>
                {children}
            </div>
        )
    }
}

Pill.propTypes = {
    theme: PropTypes.oneOf(['blue', 'red']),
}

Pill.defaultProps = {
    theme: 'blue'
}