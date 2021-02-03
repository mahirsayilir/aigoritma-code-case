import * as React from 'react';
import classnames from 'classnames';
import styles from './button.scss';
import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

export default class Button extends React.Component {

    render() {
        const { children, theme, onClick } = this.props;
        return (
            <div className={cx('button', `button-${theme}`)} onClick={onClick}>
                {children}
            </div>
        )
    }
}

Button.propTypes = {
    theme: PropTypes.oneOf(['blue', 'green', 'red']),
    onClick: PropTypes.func,
}

Button.defaultProps = {
    theme: 'blue'
}