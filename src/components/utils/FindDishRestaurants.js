// Finding which restaurants actually serve a dish.
//
// The listing API only tells us a restaurant's CUISINES ("Pizzas", "Chinese"),
// while half the carousel categories are DISHES ("Idli", "Pav Bhaji") that no
// cuisine field will ever mention. So this works in two passes: a cuisine hit
// settles it for free, and anything else falls back to reading the restaurant's
// menu and looking for the dish by name.

import { swiggy_menu_api_URL } from "../../constant";

// A menu is a few hundred KB and does not change mid-session, so each
// restaurant is fetched at most once per page load.
const menuItemCache = new Map();

// Menus nest item cards at a depth that differs per restaurant, so walk the
// whole payload rather than guessing a path into it.
const collectItemNames = (node, names = []) => {
  if (Array.isArray(node)) {
    node.forEach((child) => collectItemNames(child, names));
    return names;
  }

  if (node && typeof node === "object") {
    if (Array.isArray(node.itemCards)) {
      node.itemCards.forEach((itemCard) => {
        const name = itemCard?.card?.info?.name;
        if (name) names.push(name.toLowerCase());
      });
    }
    Object.values(node).forEach((child) => collectItemNames(child, names));
  }

  return names;
};

export const fetchMenuItemNames = async (restaurantId) => {
  if (menuItemCache.has(restaurantId)) return menuItemCache.get(restaurantId);

  try {
    const response = await fetch(swiggy_menu_api_URL + restaurantId);
    const json = await response.json();
    const names = collectItemNames(json);
    menuItemCache.set(restaurantId, names);
    return names;
  } catch (error) {
    console.error(`Could not load the menu for restaurant ${restaurantId}:`, error);
    // A menu we cannot read is simply not a match — never a crash.
    return [];
  }
};

// "Pizzas" and "Pizza" are the same search, so compare on singular words.
const toWords = (text = "") =>
  text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .map((word) => word.replace(/s$/, ""));

// Exact word, or a longer term appearing inside one: "shake" has to find
// "Oreo Milkshake", but "veg" must not drag in every "Vegetable" on the menu.
const wordMatches = (word, term) =>
  word === term || (term.length >= 4 && word.includes(term));

const textMatches = (text, terms) => {
  const words = toWords(text);
  return terms.every((term) => words.some((word) => wordMatches(word, term)));
};

const cuisineMatches = (cuisines = [], terms) =>
  cuisines.some((cuisine) => textMatches(cuisine, terms));

// Menus are fetched a few at a time: 20 parallel requests at once is enough to
// get the proxy to start refusing them.
const mapWithLimit = async (items, limit, task) => {
  const results = new Array(items.length);
  let cursor = 0;

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (cursor < items.length) {
        const index = cursor++;
        results[index] = await task(items[index]);
      }
    }
  );

  await Promise.all(workers);
  return results;
};

export const findRestaurantsServing = async (dish, restaurants = []) => {
  const terms = toWords(dish);
  if (!terms.length) return restaurants;

  // "Pure Veg" rides in the carousel but is not a dish, and the listing already
  // flags it per restaurant — no point reading menus for it.
  if (dish.trim().toLowerCase() === "pure veg") {
    return restaurants.filter((restaurant) => restaurant?.info?.veg);
  }

  const verdicts = await mapWithLimit(restaurants, 6, async (restaurant) => {
    const info = restaurant?.info ?? {};

    // Free hit: the dish is the restaurant's whole cuisine.
    if (cuisineMatches(info.cuisines, terms)) return true;

    const itemNames = await fetchMenuItemNames(info.id);
    return itemNames.some((name) => textMatches(name, terms));
  });

  return restaurants.filter((_, index) => verdicts[index]);
};
