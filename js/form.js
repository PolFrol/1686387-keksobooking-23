const toggleForm = (selector, isActive) => {
  const formAd = document.querySelector('.ad-form');
  const formItems = Array.from(formAd.querySelectorAll('fieldset'));

  formAd.classList.toggle('ad__filters--disabled', isActive);
  formItems.forEach((fieldset) => fieldset.disabled = isActive);
};

toggleForm('.ad-form', true);

const toggleFilters = (selector, isActive) => {
  const formFilter = document.querySelector('.map__filters');
  const formFilterItems = Array.from(formFilter.children);

  formFilter.classList.toggle('map__filters--disabled', isActive);
  formFilterItems.forEach((filter) => filter.disabled = isActive);
};

toggleFilters('.map__filters', true);
