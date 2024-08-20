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
    name: "Quick Foods",
    groups: [
      {
        title: "Snacks",
        subcategories: [
          { id: 1, name: "Chips", link: "/chips" },
          { id: 2, name: "Biscuits", link: "/biscuits" },
          { id: 3, name: "Sweets", link: "/sweets" },
        ],
      },
      {
        title: "Dairy",
        subcategories: [
          { id: 4, name: "Yoghurt", link: "/yogurt" },
          { id: 5, name: "Cheese", link: "/cheese" },
          { id: 6, name: "Butter", link: "/butter" },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Category 2",
    groups: [
      {
        title: "Group A",
        subcategories: [
          { id: 7, name: "Item 1", link: "/item1" },
          { id: 8, name: "Item 2", link: "/item2" },
        ],
      },
      {
        title: "Group B",
        subcategories: [
          { id: 9, name: "Item 3", link: "/item3" },
          { id: 10, name: "Item 4", link: "/item4" },
        ],
      },
    ],
  },
  // Add more categories as needed
];

export const chunkArray = (array, size) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};