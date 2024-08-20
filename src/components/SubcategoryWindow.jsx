const SubcategoryWindow = ({ groups }) => {
  return (
    <div className="fixed inset-x-0  min-h-[88%] mt-1 p-3 bg-white border border-gray-200 shadow-lg z-20">
      <div className="">
        {groups.map((group) => (
          <div key={group.title} className="mb-2">
            <h4 className="text-md text-md mb-2"><span className="text-sm cursor-default">{group.title}</span></h4>
            <ul className="list-none p-0">
              {group.subcategories.map((subcategory) => (
                <li key={subcategory.id} className="mb-1">
                  <a href={subcategory.link} className="block text-sm font-normal text-gray-500">
                    {subcategory.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubcategoryWindow;
