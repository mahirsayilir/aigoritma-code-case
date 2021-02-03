import * as React from 'react';
import {getMoviesFromEntities} from "../../store/reducer";
import {connect} from "react-redux";
import {getMovies} from "../../store/api-action";
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './list-movie.scss';
import Pill from "../common/pill.react-component";
import {DeleteForever, Movie} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {deleteMovie} from "../../store/actions";

const cx = classnames.bind(styles);


class ListMovies extends React.Component {

    componentDidMount() {
        const {getMovies} = this.props;
        getMovies();
    }

    onDelete = (event, movieId) => {
        event.stopPropagation();
        event.preventDefault();
        const { deleteMovie, getMovies } = this.props;
        console.log(movieId);
        deleteMovie(movieId);
        getMovies();
    }

    render() {
        const {movies} = this.props;
        return <div className={cx('list-container')}>
            {movies && movies.response.length > 0 && movies.response.map(movie => (
                <Link to={{
                    pathname: `/update/${movie.id}`,
                    state: {movie: movie},
                }} key={movie.id}>
                    <div className={cx('list-item')}>
                        <div className={cx('title')}>
                            {movie.name}
                        </div>
                        <p>Director: {movie.director}</p>
                        <div className={cx('pill-container')}>
                            <Pill>
                                {movie.year}
                            </Pill>
                        </div>
                        <div className={cx('delete-icon')} onClick={(event) => this.onDelete(event, movie.id)}>
                            <Pill  theme="red">
                                <DeleteForever fontSize={"small"}/>
                            </Pill>
                        </div>
                    </div>
                </Link>
            ))}
            {movies && movies.response.length === 0 && (
                <div className={cx('not-found')}>
                    <Movie fontSize={'large'}/>
                    No Movie Found To Show
                </div>
            )}
        </div>
    }
}

ListMovies.propTypes = {
    movies: PropTypes.object
}

const mapStateToProps = (state) => ({
    movies: getMoviesFromEntities(state),
});

export default connect(mapStateToProps, {getMovies, deleteMovie})(ListMovies);