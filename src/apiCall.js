import Cookies from 'universal-cookie';
import axios from 'axios';

export const cookie = new Cookies();
axios.defaults.baseURL = 'http://localhost:8000/api/v1';

export const signUpUser = async(user) => {
    return await axios.post('/auth/signup', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export const signInUser = async(user) => {
    return await axios.post('/auth/signin', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const validateUser = async() => {
    return await axios.get(`/auth/validate`, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const bookBusTicket = async(body) => {
    return await axios.post(`/bus/create`, body, {
        headers: {
            'Content-Type': 'application/json',
            authorization: cookie.get('Authorization')
        }
    });
}

export const getProducts = async(category) => {
    return await axios.get(`/product/products?${category}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getRestaurants = async(restaurant) => {
    return await axios.get(`/food/restaurants?${restaurant}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export const getCartItem = async() => {
    return await axios.get(`/product/cart`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

export const addToCart = async(body) => {
    return await axios.post(`/product/cart`, body, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}

export const checkout = async() => {
    return await axios.put(`/product/checkout`, {}, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': cookie.get('Authorization')
        }
    });
}
