import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "Bensin Management",
      description: "Manage fuel types and prices",
      path: "/bensin",
      color: "bg-blue-500",
      hoverColor: "hover:bg-blue-600"
    },
    {
      title: "Car Wash Service",
      description: "Manage car wash records and services",
      path: "/cuci-mobil",
      color: "bg-green-500",
      hoverColor: "hover:bg-green-600"
    },
    {
      title: "Customer Records",
      description: "View and manage customer information",
      path: "/pembeli",
      color: "bg-purple-500",
      hoverColor: "hover:bg-purple-600"
    }
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to SPBU Management System
        </h1>
        <p className="text-lg text-gray-600">
          Manage your gas station operations efficiently
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature) => (
          <Link
            key={feature.title}
            to={feature.path}
            className={`${feature.color} ${feature.hoverColor} rounded-lg shadow-lg p-6 text-white transform transition duration-300 hover:scale-105`}
          >
            <h2 className="text-2xl font-bold mb-3">{feature.title}</h2>
            <p className="text-white/90">{feature.description}</p>
          </Link>
        ))}
      </div>

      <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Guide</h2>
        <div className="space-y-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600">
                1
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Manage Fuel Types
              </h3>
              <p className="mt-1 text-gray-600">
                Add, edit, or remove fuel types and set their prices
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-600">
                2
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Track Car Wash Services
              </h3>
              <p className="mt-1 text-gray-600">
                Record and manage car wash services for your customers
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-600">
                3
              </div>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">
                Customer Management
              </h3>
              <p className="mt-1 text-gray-600">
                Keep track of customer preferences and vehicle types
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
