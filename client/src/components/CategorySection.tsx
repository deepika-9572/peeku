import { Link } from "wouter";

const categories = [
  {
    name: "Breads",
    icon: "fas fa-bread-slice",
    link: "/menu?category=breads"
  },
  {
    name: "Pastries",
    icon: "fas fa-cookie",
    link: "/menu?category=pastries"
  },
  {
    name: "Cakes",
    icon: "fas fa-birthday-cake",
    link: "/menu?category=cakes"
  },
  {
    name: "Desserts",
    icon: "fas fa-ice-cream",
    link: "/menu?category=desserts"
  }
];

const CategorySection = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-3xl text-center mb-8">Our Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.link} className="flex flex-col items-center hover:opacity-90 transition">
              <div className="w-24 h-24 rounded-full bg-secondary p-5 flex items-center justify-center mb-3">
                <i className={`${category.icon} text-3xl text-accent`}></i>
              </div>
              <span className="font-medium">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
