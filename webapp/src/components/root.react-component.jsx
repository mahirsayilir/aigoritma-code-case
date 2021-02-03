import * as React from "react";
import {connect} from "react-redux";
import {getMovies} from "../store/api-action";
import {getMoviesFromEntities} from "../store/reducer";
import ListMovies from "./movie/list-movies.react-component";
import classnames from 'classnames';
import styles from './root.scss';
import Navigation from "./navigation.react-component";
import AddMovie from "./movie/add-movie.react-component";
import {BrowserRouter as Router, Route} from 'react-router-dom';
import EditMovie from "./movie/edit-movie.react-component";

const cx = classnames.bind(styles);

class Root extends React.Component {

    render() {
        return (
            <Router>
                <div className={cx('main-container')}>
                    <h1>Movie CMS</h1>
                    <div className={cx('movie-container')}>
                        <div className={cx('mb-10')}>
                            <Navigation/>
                        </div>

                        <Route path="/" exact={true} component={ListMovies}/>
                        <Route path="/create" component={AddMovie}/>
                        <Route path="/update/:movieId" component={EditMovie}/>

                    </div>
                </div>
            </Router>
        )
    }
}

const mapStateToProps = (state) => ({
    movies: getMoviesFromEntities(state),
});

export default connect(mapStateToProps, {getMovies})(Root);