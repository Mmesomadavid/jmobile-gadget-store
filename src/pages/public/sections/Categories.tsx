import { ChevronRight } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      id: 1,
      name: 'Laptops',
      icon: '💻',
      color: 'bg-blue-100',
    },
    {
      id: 2,
      name: 'Smartphones',
      icon: '📱',
      color: 'bg-green-100',
    },
    {
      id: 3,
      name: 'AirPods & Headphones',
      icon: '🎧',
      color: 'bg-purple-100',
    },
    {
      id: 4,
      name: 'Smartwatches',
      icon: '⌚',
      color: 'bg-pink-100',
    },
    {
      id: 5,
      name: 'Gaming Consoles',
      icon: '🎮',
      color: 'bg-red-100',
    },
    {
      id: 6,
      name: 'Power Banks',
      icon: '🔋',
      color: 'bg-yellow-100',
    },
    {
      id: 7,
      name: 'Cameras',
      icon: '📸',
      color: 'bg-orange-100',
    },
    {
      id: 8,
      name: 'More Gadgets',
      icon: '➕',
      color: 'bg-gray-100',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Explore Popular Categories</h2>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            className="group flex flex-col items-center gap-3 p-4 rounded-lg hover:shadow-md transition"
          >
            <div className={`w-16 h-16 md:w-20 md:h-20 ${category.color} rounded-full flex items-center justify-center text-3xl md:text-4xl group-hover:scale-110 transition`}>
              {category.icon}
            </div>
            <span className="text-sm md:text-base font-medium text-gray-900 text-center line-clamp-2">
              {category.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Categories;
