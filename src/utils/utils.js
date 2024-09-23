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
          { id: 1, name: "Smartphones", link: "/smartphones" },
          { id: 2, name: "Accessories", link: "/accessories" },
        ],
      },
      {
        title: "Computers",
        subcategories: [
          { id: 3, name: "Laptops", link: "/laptops" },
          { id: 4, name: "Desktops", link: "/desktops" },
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
          { id: 5, name: "Chips", link: "/chips" },
          { id: 6, name: "Candy", link: "/candy" },
        ],
      },
      {
        title: "Beverages",
        subcategories: [
          { id: 7, name: "Soda", link: "/soda" },
          { id: 8, name: "Juice", link: "/juice" },
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
            link: "/all-purpose-cleaners",
          },
          { id: 10, name: "Glass Cleaners", link: "/glass-cleaners" },
        ],
      },
      {
        title: "Laundry Supplies",
        subcategories: [
          { id: 11, name: "Detergents", link: "/detergents" },
          { id: 12, name: "Fabric Softener", link: "/fabric-softener" },
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
          { id: 13, name: "Lipstick", link: "/lipstick" },
          { id: 14, name: "Foundation", link: "/foundation" },
        ],
      },
      {
        title: "Skincare",
        subcategories: [
          { id: 15, name: "Moisturizers", link: "/moisturizers" },
          { id: 16, name: "Sunscreen", link: "/sunscreen" },
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
          { id: 17, name: "Vitamins", link: "/vitamins" },
          { id: 18, name: "Protein Powder", link: "/protein-powder" },
        ],
      },
      {
        title: "Fitness Equipment",
        subcategories: [
          { id: 19, name: "Weights", link: "/weights" },
          { id: 20, name: "Yoga Mats", link: "/yoga-mats" },
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
          { id: 21, name: "Bikes", link: "/bikes" },
          { id: 22, name: "Kites", link: "/kites" },
        ],
      },
      {
        title: "Indoor Toys",
        subcategories: [
          { id: 23, name: "Board Games", link: "/board-games" },
          { id: 24, name: "Action Figures", link: "/action-figures" },
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
          { id: 25, name: "Sofas", link: "/sofas" },
          { id: 26, name: "Tables", link: "/tables" },
        ],
      },
      {
        title: "Gardening",
        subcategories: [
          { id: 27, name: "Plants", link: "/plants" },
          { id: 28, name: "Tools", link: "/tools" },
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
