import { ChevronRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Laptops',
      icon: '💻',
      gradient: 'from-blue-100 to-blue-200',
    },
    {
      id: 2,
      name: 'Smartphones',
      icon: '📱',
      gradient: 'from-emerald-100 to-emerald-200',
    },
    {
      id: 3,
      name: 'AirPods & Headphones',
      icon: '🎧',
      gradient: 'from-purple-100 to-purple-200',
    },
    {
      id: 4,
      name: 'Smartwatches',
      icon: '⌚',
      gradient: 'from-pink-100 to-pink-200',
    },
    {
      id: 5,
      name: 'Gaming Consoles',
      icon: '🎮',
      gradient: 'from-red-100 to-red-200',
    },
    {
      id: 6,
      name: 'Power Banks',
      icon: '🔋',
      gradient: 'from-yellow-100 to-yellow-200',
    },
    {
      id: 7,
      name: 'Cameras',
      icon: '📸',
      gradient: 'from-orange-100 to-orange-200',
    },
    {
      id: 8,
      name: 'More Gadgets',
      icon: '➕',
      gradient: 'from-gray-100 to-gray-200',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900">
          Explore Popular Categories
        </h2>

        <button className="flex items-center gap-1 text-sm sm:text-base text-blue-600 hover:text-blue-700 font-medium">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="group flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white hover:shadow-md transition"
          >
            {/* Icon */}
            <div
              className={`w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br ${category.gradient}
              flex items-center justify-center text-2xl sm:text-3xl md:text-4xl
              group-hover:scale-105 transition-transform`}
            >
              {category.icon}
            </div>

            {/* Text */}
            <span className="text-xs sm:text-sm md:text-base font-medium text-gray-900 text-center leading-tight line-clamp-2">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
