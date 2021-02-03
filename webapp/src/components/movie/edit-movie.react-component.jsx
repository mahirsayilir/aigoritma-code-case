import * as React from 'react';
import {connect} from "react-redux";
import classnames from 'classnames';
import styles from './add-movie.scss';
import {updateMovie} from "../../store/actions";
import Input from "../common/input.react-component";
import Button from "../common/button.react-component";
import StatusBox from "../common/status-box.react-component";
import {getMovieCreationStatus} from "../../store/reducer";

const cx = classnames.bind(styles);

class EditMovie extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.location.state.movie.name,
            director: props.location.state.movie.director,
            year: props.location.state.movie.year,
        }
    }

    onSubmit = () => {
        const {updateMovie, match} = this.props;
        updateMovie(match.params.movieId, this.state);
    }

    onHandleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
            [name]: value,
        });
    }

    render() {
        const { name, director, year } = this.state;
        const { movieCreationStatus } = this.props;
        return (
            <div className={cx('add-movie-container')}>
                {movieCreationStatus && (
                    <StatusBox
                        status={movieCreationStatus.status}
                        successMessage={"Movie Updated"}
                        errorMessage={"Movie Coudn't Update"}
                        progressMessage={"Movie is Updating..."}
                    />
                )}
                <div className={cx('input-item')}>
                    <p>Movie Name</p>
                    <Input
                        name="name"
                        placeholder="Movie Name"
                        onChange={this.onHandleChange}
                        value={name} />
                </div>
                <div className={cx('input-item')}>
                    <p>Movie Director</p>
                    <Input
                        name="director"
                        placeholder="Movie Director"
                        onChange={this.onHandleChange}
                        value={director} />
                </div>
                <div className={cx('input-item')}>
                    <p>Movie Year</p>
                    <Input
                        name="year"
                        placeholder="Movie Year"
                        onChange={this.onHandleChange}
                        value={year}
                        type="number" />
                </div>

                <div className={cx('action-buttons')}>
                    <Button onClick={this.onSubmit}>Update  Movie</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    movieCreationStatus: getMovieCreationStatus(state)
});

export default connect(mapStateToProps, {updateMovie})(EditMovie);