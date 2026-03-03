type CategoryFilterProps = {
    categories: string[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

function CategoryFilter({ categories, selectedCategory, onCategoryChange }: CategoryFilterProps) {
    return (
        <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => {
                        onCategoryChange(category);
                    }}
                    className={`px-3 py-1 rounded text-sm ${
                        selectedCategory === category ?
                            "bg-blue-600 text-white" :
                            "bg-gray-700 text-gray-200 cursor-pointer"}`}
                >
                    {category}
                </button>
            ))}
        </div>
    );
}

export default CategoryFilter;
