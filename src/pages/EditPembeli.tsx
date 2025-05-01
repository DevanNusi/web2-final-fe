import { useState, useEffect } from "react";
import AxiosInstance from "../utils/AxiosInstance";
import { useNavigate, useParams } from "react-router-dom";

interface Pembeli {
  id: number;
  jenis_bensin: string;
  jenis_kendaraan: string;
  created_at: string;
  updated_at: string;
}

const EditPembeli = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    jenis_bensin: "",
    jenis_kendaraan: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        const response = await AxiosInstance.get(`/api/pembeli/${id}`);
        const record: Pembeli = response.data;
        setFormData({
          jenis_bensin: record.jenis_bensin,
          jenis_kendaraan: record.jenis_kendaraan
        });
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch customer record");
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AxiosInstance.patch(`/api/pembeli/${id}`, formData);
      navigate("/pembeli");
    } catch (err) {
      setError("Failed to update customer record");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Edit Customer Record</h1>
      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Fuel Type
          </label>
          <input
            type="text"
            name="jenis_bensin"
            value={formData.jenis_bensin}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            maxLength={100}
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vehicle Type
          </label>
          <select
            name="jenis_kendaraan"
            value={formData.jenis_kendaraan}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Select Vehicle Type</option>
            <option value="Mobil">Car</option>
            <option value="Motor">Motorcycle</option>
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Record
          </button>
          <button
            type="button"
            onClick={() => navigate("/pembeli")}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPembeli;
