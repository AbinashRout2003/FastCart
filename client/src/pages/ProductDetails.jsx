import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, addToCart } = useAppContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  // Find product safely
  const product = products.find(
    (item) => String(item._id) === String(id)
  );

  // Set thumbnail
  useEffect(() => {
    if (product?.image?.length > 0) {
      setThumbnail(product.image[0]);
    }
  }, [product]);

  // Related products
  useEffect(() => {
    if (product) {
      const filtered = products.filter(
        (item) =>
          item.category === product.category &&
          item._id !== product._id
      );
      setRelatedProducts(filtered.slice(0, 5));
    }
  }, [product, products]);

  if (!product) {
    return <div className="mt-20 text-center">Product Not Found</div>;
  }

  return (
    <div className="mt-16 px-6 md:px-16">

      {/* Breadcrumb */}
      <p className="text-sm">
        <Link to="/">Home</Link> /
        <Link to="/products"> Products</Link> /
        <span className="text-indigo-500"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-6">

        {/* IMAGES */}
        <div className="flex gap-4">

          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product.image.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border w-20 border-gray-300 rounded cursor-pointer"
              >
                <img
                  src={img?.startsWith("http")
                    ? img
                    : `${backendUrl}/uploads/${img}`}
                  alt="thumb"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-300 rounded w-80">
            <img
              src={thumbnail?.startsWith("http")
                ? thumbnail
                : `${backendUrl}/uploads/${thumbnail}`}
              alt="product"
            />
          </div>

        </div>

        {/* PRODUCT INFO */}
        <div className="w-full md:w-1/2">

          <h1 className="text-3xl font-semibold">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <img
                  key={i}
                  src={
                    i < 4
                      ? assets.star_icon
                      : assets.star_dull_icon
                  }
                  alt="star"
                  className="w-4"
                />
              ))}
            <p className="ml-2 text-sm">(4)</p>
          </div>

          {/* Price */}
          <div className="mt-6">
            <p className="line-through text-gray-500">
              ₹{product.price}
            </p>
            <p className="text-2xl font-bold text-indigo-600">
              ₹{product.offerPrice}
            </p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <p className="font-medium">About Product</p>
            <ul className="list-disc ml-5 text-gray-600 mt-2">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3 rounded-xl bg-gray-200 hover:bg-gray-300"
            >
              Add to Cart
            </button>

            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
                window.scrollTo(0, 0);
              }}
              className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg"
            >
              Buy Now
            </button>
          </div>

        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-20">

        <h2 className="text-2xl font-semibold text-center">
          Related Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          {relatedProducts.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              navigate("/products");
              window.scrollTo(0, 0);
            }}
            className="px-8 py-3 bg-indigo-500 text-white rounded"
          >
            See More
          </button>
        </div>

      </div>

    </div>
  );
};

export default ProductDetails;