import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../utils/AxiosInstance";

const AddCuciMobil = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nomor_polisi: "",
    cuci_kolong: false,
    cuci_body: false,
    cuci_full: false
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AxiosInstance.post("/api/cuci-mobil", formData);
      navigate("/cuci-mobil");
    } catch (err) {
      setError("Failed to add car wash record");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Add New Car Wash Record</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            License Plate
          </label>
          <input
            type="text"
            name="nomor_polisi"
            value={formData.nomor_polisi}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength={15}
          />
        </div>

        <div className="mb-4 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              name="cuci_full"
              checked={formData.cuci_full}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700 text-sm font-bold">
              Full Wash
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="cuci_body"
              checked={formData.cuci_body}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700 text-sm font-bold">
              Body Wash
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="cuci_kolong"
              checked={formData.cuci_kolong}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label className="ml-2 block text-gray-700 text-sm font-bold">
              Undercarriage Wash
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add Record
          </button>
          <button
            type="button"
            onClick={() => navigate("/cuci-mobil")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCuciMobil;
