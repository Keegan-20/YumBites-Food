// utils stores commonly used functions for better readibilty,modularity,maintainable

// filterData function to search restaurants
export const filterData = (searchText, restaurants) => {
    const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase()?.includes(searchText.trim().toLowerCase()));
    console.log('filterRestaurant:', filterData)
    return filterData;
  }

