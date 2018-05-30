export const afterEventCategoryCleaner = () => {
  let categories;

  const restaurantCategories = [
    { alias: 'airportlounges', label: 'Airport Lounges'},
    { alias: 'beerbar', label: 'Beer Bar'},
    { alias: 'champagne_bars', label: 'Champagne Bars'},
    { alias: 'cigarbars', label: 'Cigar Bars'},
    { alias: 'cocktailbars', label: 'Cocktail Bars'}
  ]

  categories = restaurantCategories.map((category, index) => {
    const { alias, label } = category;
    return {
      value: index,
      label,
      alias
    }
  });


  return {options: categories};
};