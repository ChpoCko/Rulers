'use strict';

// const new1 = document.querySelectorAll(`.filtering-option--input`);

// new1.forEach(element => {
//   element.addEventListener('input', () => {
//     console.log(element.name);
//   });
// });

const sytleTag = document.querySelector(`.style-for-slider`);
const filterBtn = document.querySelector(`.filter-btn`);
const filterOptionsBox = document.querySelector(`.filOptions`);
const filterInnerSectionBox = document.querySelectorAll(
  '.filter-inner-section'
);
const filterArrowDown = document.querySelector('.filter-arrow-down');
const filterArrowUp = document.querySelector('.filter-arrow-up');

filterBtn.addEventListener('click', () => {
  if (filterOptionsBox.classList.contains('filter-options-hidden')) {
    filterOptionsBox.classList.remove('filter-options-hidden');
    filterArrowUp.style.opacity = '1';
    filterArrowDown.style.opacity = '0';
  } else {
    filterArrowUp.style.opacity = '0';
    filterArrowDown.style.opacity = '1';
    filterOptionsBox.style.animation = 'filterReduce 0.6s ease-in';

    filterInnerSectionBox.forEach(innerBox => {
      innerBox.style.animation = 'filterInnerSectionOut 0.2s ease-in';
    });

    setTimeout(() => {
      filterOptionsBox.style.animation = '';
      filterInnerSectionBox.forEach(innerBox => {
        innerBox.style.animation = '';
      });

      filterOptionsBox.classList.add('filter-options-hidden');
    }, 590);
  }
});

// FUNCTION TO ROTATE CARDS
function cardRotate(el) {
  el.classList.toggle(`rotated`);
}

// const cardProductBox = document.querySelector('[data-card-product-box]');
// cardProductBox.setAttribute('rarity', 'legendary');

// ************************************* RENDER CARDS *************************************

const API_URL = 'https://rulers-sh.com'
const cardTemplate = document.querySelector(`[data-card-template]`);
const cardContainer = document.querySelector(`.catalog-container`);
const allcardsRoute = `${API_URL}/api/catalog/all-cards`;
//define an empty array to store the cards (needed for map function)
let cards = [];
fetch(allcardsRoute, {credentials: 'include' })
  .then(res => res.json())
  .then(data => {
    cards = data.map(champ => {
      const card = cardTemplate.content.cloneNode(true).children[0];
      const cardProduct = card.querySelector(`[data-card-product-box]`);
      const cardPrice = card.querySelector(`[data-card-price]`);
      const cardImgFront = card.querySelector(`[data-card-img-front]`);
      const cardImgBack = card.querySelector(`[data-card-img-back]`);
      const cardInfoLink = card.querySelector(`[data-card-champ-link`);

      cardProduct.setAttribute('data-card-id', champ.id);
      cardProduct.setAttribute('data-card-rarity', champ.rarity);
      cardPrice.textContent = champ.price;
      cardImgFront.src = champ.img_front;
      cardImgBack.src = champ.img_back;
      cardInfoLink.href = champ.info_link;
      cardContainer.append(card);
      return {
        name: champ.name,
        rarity: champ.rarity,
        role: champ.role,
        price: champ.price,
        element: card,
      };
    });
  });

// ************************************* FILTER FUNCTIONS *************************************
const searchInput = document.querySelector(`[data-search]`);
const searchIcon = document.querySelector(`.search-icon`);

//search bar function to filter cards
searchInput.addEventListener('input', input => {
  if (searchInput.value) {
    searchIcon.style.left = 'calc(92% - 2.4rem)';
  } else {
    searchIcon.style.left = '';
  }

  const value = input.target.value.toLowerCase();
  cards.forEach(card => {
    const isVisible = card.name.toLowerCase().includes(value);
    card.element.classList.toggle('filter-options-hidden', !isVisible);
  });
});

//selecting all filter boxes
const filterBoxes = document.querySelectorAll('.filtering-option--input');
//creating an object to store the filters
const filters = {
  rarity: [],
  role: [],
  price: 400,
};

filterBoxes.forEach(filterBox => {
  filterBox.addEventListener('click', () => {
    //get the rarity or role value
    const value = filterBox.name.toLowerCase();
    //get the type of filter by looking at the title of the filter box
    const type = filterBox.parentNode.parentNode
      .querySelector('.filter-title')
      .textContent.toLowerCase();
    //check if the filter box is checked or not
    if (filterBox.checked) {
      //if it is checked, add the value to the filters object
      filters[type].push(value);
    } else {
      //if it is not checked, remove the value from the filters object
      const index = filters[type].indexOf(value);
      if (index >= 0) {
        filters[type].splice(index, 1);
      }
    }
    //loop through the cards and check if they match the filters
    cards.forEach(card => {
      //check if the card matches the rarity and role filters ( or if there are no filters selected )
      const matchesRarity =
        filters.rarity.length === 0 ||
        filters.rarity.includes(card.rarity.toLowerCase());
      const matchesRole =
        filters.role.length === 0 ||
        filters.role.includes(card.role.toLowerCase());
      const matchesPrice = card.price <= filters.price;
      //Hide cards that do not match the filters
      card.element.classList.toggle(
        'filter-options-hidden',
        !matchesRarity || !matchesRole || !matchesPrice
      );
    });
  });
});

// selecting filter slider
const slider = document.querySelector(`.filter-slider`);

//GET SLIDER INPUT DATA
slider.addEventListener('input', () => {
  // console.log(slider.value);
  sytleTag.innerHTML = `.filter-slider::after {content: '${slider.value}';z-index: 3;height: 6px;}`;

  //set the price in the filters object  to the slider value
  filters.price = slider.value;

  cards.forEach(card => {
    //check if the card matches the rarity and role filters ( or if there are no filters selected )
    //if the array is empty then all cards match (true)
    const matchesRarity =
      filters.rarity.length === 0 ||
      filters.rarity.includes(card.rarity.toLowerCase());
    const matchesRole =
      filters.role.length === 0 ||
      filters.role.includes(card.role.toLowerCase());
    const matchesPrice = card.price <= filters.price;
    //Hide cards that do not match the filters
    card.element.classList.toggle(
      'filter-options-hidden',
      !matchesRarity || !matchesRole || !matchesPrice
    );
  });
});

//sort cards
// giving a numeric order to the rarity
const rarityOrder = { rare: 1, epic: 2, legendary: 3 };

//Low to High  rarity sorting
function sortByRarityLtH() {
  cards.sort((card1, card2) => {
    const rarityA = rarityOrder[card1.rarity];
    const rarityB = rarityOrder[card2.rarity];
    if (rarityA < rarityB) {
      return -1;
    } else if (rarityA > rarityB) {
      return 1;
    } else {
      return 0;
    }
  });
}

//high to low  rarity sorting
function sortByRarityHtL() {
  cards.sort((card1, card2) => {
    const rarityA = rarityOrder[card1.rarity];
    const rarityB = rarityOrder[card2.rarity];
    if (rarityA < rarityB) {
      return 1;
    } else if (rarityA > rarityB) {
      return -1;
    } else {
      return 0;
    }
  });
}

//Low to High  price sorting
function sortByPriceLtH() {
  cards.sort((card1, card2) => {
    return card1.price - card2.price;
  });
}

//high to low  price sorting
function sortByPriceHtL() {
  cards.sort((card1, card2) => {
    return card2.price - card1.price;
  });
}

//selecting the sort by box
const sortBySelect = document.querySelector('.sort-by');

//adding event listen for each option
sortBySelect.addEventListener('change', () => {
  const selectedOption = sortBySelect.value;
  if (selectedOption === 'rarity-high-to-low') {
    // sort by rarity high to low
    sortByRarityHtL();
    cards.forEach(card => {
      cardContainer.append(card.element);
    });
  } else if (selectedOption === 'rarity-low-to-high') {
    // sort by rarity low to high
    sortByRarityLtH();
    cards.forEach(card => {
      cardContainer.append(card.element);
    });
  } else if (selectedOption === 'price-high-to-low') {
    // sort by price high to low

    sortByPriceHtL();
    cards.forEach(card => {
      cardContainer.append(card.element);
    });
  } else if (selectedOption === 'price-low-to-high') {
    // sort by price low to high
    sortByPriceLtH();
    cards.forEach(card => {
      cardContainer.append(card.element);
    });
  }
});
