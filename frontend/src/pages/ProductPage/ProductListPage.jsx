import React from "react";
import img_product1 from "../../assets/image-product/Gemini_Generated_Image_4knuxp4knuxp4knu.jpg";
import ProductCard from "#components/ProductCard/ProductCard";
import { useParams } from "react-router-dom";
import { DollarSign } from "lucide-react";

const mock_tags = [
  "wireless",
  "wired",
  "rgb",
  "pink",
  "blue",
  "orange",
  "collaboration",
];

const ProductListPage = () => {
  const param = useParams();
  console.log(param.id);
  return (
    <div className="min-h-screen relative z-10">
      <div className="h-60 border flex flex-col justify-center items-center border-gbase-1 bg-linear-to-br from-gbg-1 0% via-50% via-gbase-3 to-gpurple-5/40">
        <div className="text-white text-center">
          <h3 className="font-bold tracking-widest">COLLECTION</h3>
          <h1 className="font-light text-7xl tracking-tighter capitalize">
            {param.id}
            <span className="text-gcyan-light">.</span>
          </h1>
        </div>
      </div>
      <aside className="bg-gpurple-5/30 border border-gbase-1 w-9/12 flex flex-col gap-2 mx-auto mt-10 rounded-2xl text-white px-10 py-4">
        <div className="flex flex-col">
          <label htmlFor="name">Search name</label>
          <input
            type="text"
            id="name"
            className="border border-gpurple-2/40 bg-gbg-3/30 rounded-lg mt-2 py-1 px-2"
          />
        </div>
        <div className="flex gap-5">
          <div className="flex flex-col gap-2">
            <label>Price:</label>
            <div className="flex items-center">
              <div className="flex items-center border border-gpurple-2/40 bg-gbg-3/30 px-2 py-1 rounded-lg">
                <DollarSign size={14} color="gray" />
                <input type="number" className="outline-0" />
              </div>
              <span className="mx-2">-</span>
              <div className="flex items-center border border-gpurple-2/40 bg-gbg-3/30 px-2 py-1 rounded-lg">
                <DollarSign size={14} color="gray" />
                <input type="number" className="outline-0" />
              </div>
            </div>
          </div>
          {/* <div>
            <p>Sort</p>
          </div> */}
          <div className="flex flex-col gap-2">
            <label htmlFor="">Tags:</label>
            <div className="flex gap-2">
              {mock_tags.map((tag) => {
                return (
                  <p className="border border-gpurple-2/40 px-2 py-1 rounded-xl bg-gpink-3/30">
                    {tag}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </aside>
      <div className="w-9/12 py-14 mx-auto">
        <div className="grid grid-cols-3 gap-20">
          <ProductCard img={img_product1} />
          <ProductCard img={img_product1} />
          <ProductCard img={img_product1} />
          <ProductCard img={img_product1} />
          <ProductCard img={img_product1} />
        </div>
      </div>
    </div>
  );
};

export default ProductListPage;
