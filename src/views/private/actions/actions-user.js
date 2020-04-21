import axios from 'axios';
import {axiosWithAuth} from '../../../helpers/axiosWithAuth';

export const FETCHING_START = 'FETCHING_START'
export const SET_ERROR = 'SET_ERROR'
export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'
export const LOGOUT = 'LOGOUT'


//login
export const login = (user) => dispatch => {
    dispatch({ type: FETCHING_START })
    axiosWithAuth()
        .post('/users/login', user)
            .then(response => {
                dispatch({ type: LOGIN })

                console.log("login response", response)

                //set token to local storage
                window.localStorage.setItem('token', response.data.token)

                //history.push('/UserDashboard') <--- to be built out
            })
            .catch(error => {
                console.log("ERROR: ", error)
                dispatch({type: SET_ERROR, payload: error})
            })
}

//register
export const register = (user) => dispatch => {
    dispatch({ type: FETCHING_START })
    axios
        .post('https://lab23-refresh-be.herokuapp.com/users/register', user)
            .then(response => {
                dispatch({ type: REGISTER })

                console.log("register response", response)

                //set token to local storage
                window.localStorage.setItem('token', response.data.token)

                //history.push('/')
            })
            .catch(error => {
                dispatch({type: SET_ERROR, payload: error})
            })
}


//logout
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
    window.localStorage.clear();
    //history.push('/');
}