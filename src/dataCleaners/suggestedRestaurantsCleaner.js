export const suggestedRestaurantsCleaner = (restaurants) => {
  
  const allRestaurants = restaurants.map(restaurant => {
    const {
      id,
      name,
      rating,
      location,
      price,
      review_count,
      image_url
    } = restaurant;

    const address = location.display_address[0] + ' ' + location.display_address[1];

    return {
      id,
      name,
      rating,
      address,
      price, 
      review_count,
      image_url
    };
  });

  const suggestedRestaurants = allRestaurants.slice(0, 3);

  return suggestedRestaurants;
};

