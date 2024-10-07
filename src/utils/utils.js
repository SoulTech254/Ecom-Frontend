export const months = {
  January: "1",
  February: "2",
  March: "3",
  April: "4",
  May: "5",
  June: "6",
  July: "7",
  August: "8",
  September: "9",
  October: "10",
  November: "11",
  December: "12",
};

export const categories = [
  {
    id: 1,
    name: "Electronics",
    groups: [
      {
        title: "Mobile Phones",
        subcategories: [
          { id: 1, name: "Smartphones", link: encodeURIComponent("Smartphones") },
          { id: 2, name: "Accessories", link: encodeURIComponent("Accessories") },
        ],
      },
      {
        title: "Computers",
        subcategories: [
          { id: 3, name: "Laptops", link: encodeURIComponent("Laptops") },
          { id: 4, name: "Desktops", link: encodeURIComponent("Desktops") },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Foods",
    groups: [
      {
        title: "Snacks",
        subcategories: [
          { id: 5, name: "Chips", link: encodeURIComponent("Chips") },
          { id: 6, name: "Candy", link: encodeURIComponent("Candy") },
        ],
      },
      {
        title: "Beverages",
        subcategories: [
          { id: 7, name: "Soda", link: encodeURIComponent("Soda") },
          { id: 8, name: "Juice", link: encodeURIComponent("Juice") },
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Cleaning Supplies",
    groups: [
      {
        title: "Household Cleaners",
        subcategories: [
          {
            id: 9,
            name: "All-Purpose Cleaners",
            link: encodeURIComponent("All-Purpose Cleaners"),
          },
          { id: 10, name: "Glass Cleaners", link: encodeURIComponent("Glass Cleaners") },
        ],
      },
      {
        title: "Laundry Supplies",
        subcategories: [
          { id: 11, name: "Detergents", link: encodeURIComponent("Detergents") },
          { id: 12, name: "Fabric Softener", link: encodeURIComponent("Fabric Softener") },
        ],
      },
    ],
  },
  {
    id: 4,
    name: "Beauty",
    groups: [
      {
        title: "Makeup",
        subcategories: [
          { id: 13, name: "Lipstick", link: encodeURIComponent("Lipstick") },
          { id: 14, name: "Foundation", link: encodeURIComponent("Foundation") },
        ],
      },
      {
        title: "Skincare",
        subcategories: [
          { id: 15, name: "Moisturizers", link: encodeURIComponent("Moisturizers") },
          { id: 16, name: "Sunscreen", link: encodeURIComponent("Sunscreen") },
        ],
      },
    ],
  },
  {
    id: 5,
    name: "Health and Fitness",
    groups: [
      {
        title: "Supplements",
        subcategories: [
          { id: 17, name: "Vitamins", link: encodeURIComponent("Vitamins") },
          { id: 18, name: "Protein Powder", link: encodeURIComponent("Protein Powder") },
        ],
      },
      {
        title: "Fitness Equipment",
        subcategories: [
          { id: 19, name: "Weights", link: encodeURIComponent("Weights") },
          { id: 20, name: "Yoga Mats", link: encodeURIComponent("Yoga Mats") },
        ],
      },
    ],
  },
  {
    id: 6,
    name: "Toys and Outdoors",
    groups: [
      {
        title: "Outdoor Toys",
        subcategories: [
          { id: 21, name: "Bikes", link: encodeURIComponent("Bikes") },
          { id: 22, name: "Kites", link: encodeURIComponent("Kites") },
        ],
      },
      {
        title: "Indoor Toys",
        subcategories: [
          { id: 23, name: "Board Games", link: encodeURIComponent("Board Games") },
          { id: 24, name: "Action Figures", link: encodeURIComponent("Action Figures") },
        ],
      },
    ],
  },
  {
    id: 7,
    name: "Home & Garden",
    groups: [
      {
        title: "Furniture",
        subcategories: [
          { id: 25, name: "Sofas", link: encodeURIComponent("Sofas") },
          { id: 26, name: "Tables", link: encodeURIComponent("Tables") },
        ],
      },
      {
        title: "Gardening",
        subcategories: [
          { id: 27, name: "Plants", link: encodeURIComponent("Plants") },
          { id: 28, name: "Tools", link: encodeURIComponent("Tools") },
        ],
      },
    ],
  },
];


export const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};
