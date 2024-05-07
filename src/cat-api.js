import axios from "axios";

export const fetchBreeds = () => {
    axios.defaults.headers.common["x-api-key"] = "live_Ka0LtzbkicYrK80wzO3mhAFP79KSr73KnRE9B6IYjXlV2ngAF5OabrveLknnDaX6";
    
    return axios
        .get('https://api.thecatapi.com/v1/breeds')
        .then(response => response.data);
};

export const fetchCatByBreed = breedId => {
    return axios
        .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
        .then(response => response.data);
};