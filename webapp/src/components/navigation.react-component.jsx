import * as React from 'react';
import classnames from 'classnames';
import styles from './navigation.scss';
import {Add, List} from "@material-ui/icons";
import {Link} from "react-router-dom";

const cx = classnames.bind(styles);

export default class Navigation extends React.Component {

    render() {
        return (
            <div className={cx('navigation-container')}>
                <Link to='/create'>
                    <div className={cx('navigation-item')}>
                        <Add/>
                        Add Movie
                    </div>
                </Link>
                <Link to='/'>
                    <div className={cx('navigation-item')}>
                        <List/>
                        List Movies
                    </div>
                </Link>
            </div>
        )
    }
}