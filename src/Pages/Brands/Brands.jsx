import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";

const baseUrl = "https://ecommerce.routemisr.com";


function getBrands() {
  return axios.get(`${baseUrl}/api/v1/brands`);
}

function Brands() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getBrands"],   
    queryFn: getBrands,       
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-500">Failed to load brands</div>;

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="text-center">
        <div className="max-w-full flex items-center justify-center flex-wrap py-5">
          {data?.data.data.map((brand) => (
            <div
              className="w-[23%] max-lg:w-[29%] max-md:w-[45%] max-sm:w-[100%] grid place-items-center product m-2 p-2 rounded border border-[#f0f3f2] shadow-md cursor-pointer"
              key={brand._id}
            >
              <img
                src={brand.image || "path-to-placeholder-image.png"}
                alt={brand.name}
              />
              <span className="title">{brand.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Brands;
