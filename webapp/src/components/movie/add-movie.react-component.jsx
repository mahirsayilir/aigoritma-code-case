import * as React from 'react';
import {connect} from "react-redux";
import classnames from 'classnames';
import styles from './add-movie.scss';
import {createMovie} from "../../store/actions";
import Input from "../common/input.react-component";
import Button from "../common/button.react-component";
import {getMovieCreationStatus} from "../../store/reducer";
import StatusBox from "../common/status-box.react-component";

const cx = classnames.bind(styles);

class AddMovie extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            fields: {
                name: "",
                director: "",
                year: "",
            },
            validation: {
                name: {
                    rule: "Not Empty",
                    isValid: true,
                },
                director: {
                    rule: "Not Empty",
                    isValid: true,
                },
                year: {
                    rule: "Year should be equal or between 1900 and 2100",
                    isValid:  true,
                }
            }
        }
    }

    onSubmit = () => {
        const {createMovie} = this.props;
        if(this.validateInputs()) {
            createMovie(this.state.fields);
            this.resetInputs();
        }
    }

    validateInputs() {
        const { fields, validation } = this.state;
        let valid = true;
        if (fields["name"].length === 0) {
            this.setState({ validation: {...validation, name: {...validation.name, isValid: false}} });
        } else {
            this.setState({ validation: {...validation, name: {...validation.name, isValid: true}} });
        }

        if (fields["director"].length === 0) {
            this.setState({ validation: {...validation, director: {...validation.director, isValid: false}} });
        } else {
            this.setState({ validation: {...validation, director: {...validation.director, isValid: true}} });
        }

        if (fields["year"] < 1900 || fields["year"] > 2100) {
            this.setState({ validation: {...validation, year: {...validation.year, isValid: false}} });
            valid = false;
        } else {
            this.setState({ validation: {...validation, year: {...validation.year, isValid: true}} });
            valid = true;
        }

        return valid;
    }

    resetInputs() {
        this.setState({
            fields:  {
                name: "",
                director: "",
                year: "",
            }
        });
    }

    onHandleChange = (e) => {
        const {name, value} = e.target;
        const { fields } = this.state;
        this.setState({
            fields: {
                ...fields,
                [name]: value,
            }
        });
    }

    redirect = () => {
        this.props.history.push("/");
    }

    render() {
        const { fields, validation } = this.state;
        const { name, director, year } = fields;
        const { movieCreationStatus } = this.props;
        return (
            <div className={cx('add-movie-container')}>
                {movieCreationStatus && (
                    <StatusBox
                        status={movieCreationStatus.status}
                        successMessage={"Movie Created"}
                        errorMessage={"Movie Coudn't Create"}
                        progressMessage={"Movie is Creating..."}
                    />
                )}
                <div className={cx('input-item')}>
                    <p>Movie Name</p>
                    <Input
                        name="name"
                        placeholder="Movie Name"
                        onChange={this.onHandleChange}
                        value={name}
                        valid={!validation.name.isValid} />
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
                        type="number"
                        valid={!validation.year.isValid}/>
                    {!validation.year.isValid && validation.year.rule}
                </div>

                <div className={cx('action-buttons')}>
                    <Button onClick={this.onSubmit} theme="green">Create  Movie</Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    movieCreationStatus: getMovieCreationStatus(state)
});

export default connect(mapStateToProps, {createMovie})(AddMovie);