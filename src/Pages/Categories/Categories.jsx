import axios from "axios";
import { useQuery } from "@tanstack/react-query"; 
import Loader from "../../Components/Loader/Loader";

const baseUrl = "https://ecommerce.routemisr.com"; 


function getCategories() {
  return axios.get(`${baseUrl}/api/v1/categories`); 
}

function Categories() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["getCategories"], 
    queryFn: getCategories,      
  });

  if (isLoading) return <Loader />;
  if (error) return <div className="text-center text-red-500">Failed to load categories</div>;

  return (
    <div className="min-h-screen bg-[#fff]">
      <div className="text-center">
        <div className="max-w-full flex items-center justify-center flex-wrap py-5">
          {data?.data.data.map((category) => (
            <div
              className="w-[23%] max-lg:w-[29%] max-md:w-[45%] max-sm:w-[100%] grid place-items-center border border-[#f0f3f2] rounded product m-2 shadow-md cursor-pointer"
              key={category._id}
            >
              <img
                className="w-[200px] h-[300px] mb-2"
                src={category.image || ""} 
                alt={category.name}
              />
              <div className="w-full p-2 title border border-[#f0f3f2]">
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;
