import * as React from 'react';
import classnames from 'classnames';
import styles from './status-box.scss';
import PropTypes from 'prop-types';

const cx = classnames.bind(styles);

export default class StatusBox extends React.Component {

    render() {
        const { status, successMessage, progressMessage, errorMessage } = this.props;
        return (
            <div className={cx('status',`status-${status}`)}>
                {status === 'success' && successMessage}
                {status === 'request' && progressMessage}
                {status === 'failure' && errorMessage}
            </div>
        )
    }
}

StatusBox.propTypes = {
    status: PropTypes.oneOf(['success', 'failure', 'request']),
    successMessage: PropTypes.string,
    progressMessage: PropTypes.string,
    errorMessage: PropTypes.string,
}