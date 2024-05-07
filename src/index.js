import { fetchBreeds, fetchCatByBreed } from './cat-api.js';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';


const catBreed = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const errorTxt = document.querySelector('.error');   
const catInfo = document.querySelector('.cat-info');
const breedsArr = [];

fetchBreeds()
    .then(catsBreedData => {
        provideBreedsData(catsBreedData);
        loader.classList.add('hidden');
    })
    .catch(errorTxt => {
        Notiflix.Notify.failure(`${errorTxt}`);
        errorAppearance();
    });

function errorAppearance() {
    errorTxt.classList.remove('hidden');
    loader.classList.add('hidden');
}

function provideBreedsData(catsBreedData) {
    catsBreedData.map(({ id, name }) => {
        breedsArr.push({ text: name, value: id });
    });

new SlimSelect({
    select: '.breed-select',
    data: breedsArr,
});

    loader.classList.remove('hidden');
    errorTxt.classList.add('hidden');
    console.log(catsBreedData);
}

catBreed.addEventListener('change', ev => {
    loader.classList.remove('hidden')
    fetchCatByBreed(ev.target.value)
        .then(data => provideCatsData(data[0]), errorTxt.classList.add('hidden'))
        .catch(errorTxt => {
            Notiflix.Notify.failure(`${errorTxt}`);
            errorAppearance();
            catInfo.innerHTML = '';
        });
});

function provideCatsData(catData) {
    const { url } = catData;
    const { name, description, temperament } = catData.breeds[0];

    catInfo.innerHTML = '';
    catInfo.insertAdjacentHTML('beforeend', `<div class="cat-box"><h2>${name}</h2><div class="img-box"><img src=${url} alt="cat"/></div><div class="paragraph"><p>${description}</p></div><div class="temp"><span>Temperament:</span> ${temperament}</div></div>`);

    loader.classList.add('hidden');
}