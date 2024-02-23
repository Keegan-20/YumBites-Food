// utils stores commonly used functions for better readibilty,modularity,maintainable

// filterData function to search restaurants
export const filterData = (searchText, restaurants) => {
    const filterData = restaurants.filter((restaurant) =>
    restaurant?.info?.name?.toLowerCase()?.includes(searchText.trim().toLowerCase()));
    console.log('filterRestaurant:', filterData)
    return filterData;
  }

//Filtering Restaurants based on Average Rating 
 export const ratingFilter = (filteredRestaurants,setFilteredRestaurants) => {
  const filteredList = filteredRestaurants.filter((res) => res.info.avgRating >= 4.3
  );

  setFilteredRestaurants(filteredList);
 }

 
//Filtering Restaurants based on Fast Delivery
export const filterFastDelivery= (filteredRestaurants,setFilteredRestaurants) => {
  const filteredList = filteredRestaurants.filter(
    (res) => res.info.sla.deliveryTime <= 25
  );

  setFilteredRestaurants(filteredList);
}

 //Filtering Restaurants based on low Price
 export const filterLowPrice=(filteredRestaurants,setFilteredRestaurants) => {
  const filteredList = filteredRestaurants.filter((res) => {
    const price = res.info.costForTwo?.substring(1, 4);
    if(price <= 300) return price;
    
 })
  setFilteredRestaurants(filteredList);
 }

 //Filtering Restaurants based on Mid Price
 export const filterMidPrice=(filteredRestaurants,setFilteredRestaurants) => {
  const filteredList = filteredRestaurants.filter((res) => {
    const price = res.info.costForTwo?.substring(1, 4);
    if(price >= 300 && price<=600) return price;
    
 })
  setFilteredRestaurants(filteredList);
 }

//Filtering Restaurants based on Pure Veg
export const filterPureVeg =(filteredRestaurants,setFilteredRestaurants) => {
  const filteredList=filteredRestaurants.filter((res) =>{
    return res.info.veg;
  });
  setFilteredRestaurants(filteredList);
}