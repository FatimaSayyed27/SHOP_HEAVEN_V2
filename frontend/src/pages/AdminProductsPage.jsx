import { useEffect, useState } from "react";

import {
  getAdminProducts,
  createAdminProduct,
  updateAdminProduct,
  deleteAdminProduct,
} from "../services/adminProductService";

import {
  getBrands,
  getCategories,
} from "../services/productService";

import getImageUrl from "../utils/imageUrl";

function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] =
    useState(null);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [showForm, setShowForm] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  const emptyForm = {
    name: "",
    slug: "",
    description: "",
    price: "",
    stock: "",
    brand: "",
    category: "",
    is_featured: false,
    image: null,
  };

  const [formData, setFormData] =
    useState(emptyForm);

  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  // =====================================================
  // FETCH PRODUCTS
  // =====================================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        productsData,
        brandsData,
        categoriesData,
      ] = await Promise.all([
        getAdminProducts(),
        getBrands(),
        getCategories(),
      ]);

      setProducts(
        productsData || []
      );

      setBrands(
        brandsData || []
      );

      setCategories(
        categoriesData || []
      );
    } catch (err) {
      console.error(
        "Admin products error:",
        err
      );

      setError(
        err.message ||
          "Failed to load admin products."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // =====================================================
  // HANDLE INPUT
  // =====================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
      files,
    } = e.target;

    if (type === "file") {
      setFormData((prev) => ({
        ...prev,
        [name]:
          files?.[0] || null,
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =====================================================
  // RESET
  // =====================================================

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingProduct(null);
    setShowForm(false);
  };

  // =====================================================
  // CREATE FORM
  // =====================================================

  const openCreateForm = () => {
    setEditingProduct(null);
    setFormData(emptyForm);
    setError("");
    setMessage("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // EDIT FORM
  // =====================================================

  const openEditForm = (product) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      slug: product.slug || "",
      description:
        product.description || "",
      price: product.price || "",
      stock:
        product.stock ?? "",
      brand:
        product.brand || "",
      category:
        product.category || "",
      is_featured:
        Boolean(
          product.is_featured
        ),
      image: null,
    });

    setError("");
    setMessage("");
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // SUBMIT
  // =====================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");
      setMessage("");

      const data =
        new FormData();

      data.append(
        "name",
        formData.name.trim()
      );

      data.append(
        "slug",
        formData.slug.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      data.append(
        "price",
        formData.price
      );

      data.append(
        "stock",
        formData.stock
      );

      data.append(
        "brand",
        formData.brand
      );

      data.append(
        "category",
        formData.category
      );

      data.append(
        "is_featured",
        formData.is_featured
          ? "true"
          : "false"
      );

      if (formData.image) {
        data.append(
          "image",
          formData.image
        );
      }

      let savedProduct;

      if (editingProduct) {
        savedProduct =
          await updateAdminProduct(
            editingProduct.id,
            data
          );

        setProducts((prev) =>
          prev.map((product) =>
            product.id ===
            savedProduct.id
              ? savedProduct
              : product
          )
        );

        setMessage(
          "Product updated successfully."
        );
      } else {
        savedProduct =
          await createAdminProduct(
            data
          );

        setProducts((prev) => [
          savedProduct,
          ...prev,
        ]);

        setMessage(
          "Product created successfully."
        );
      }

      resetForm();
    } catch (err) {
      console.error(
        "Save product error:",
        err
      );

      setError(
        err.message ||
          "Failed to save product."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // DELETE
  // =====================================================

  const handleDelete = async (
    productId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(productId);
      setError("");
      setMessage("");

      await deleteAdminProduct(
        productId
      );

      setProducts((prev) =>
        prev.filter(
          (product) =>
            product.id !==
            productId
        )
      );

      setMessage(
        "Product deleted successfully."
      );
    } catch (err) {
      console.error(
        "Delete product error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete product."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center px-6">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven Admin
          </p>

          <p className="font-serif text-2xl mt-3 text-[#1c1a18]">
            Loading products
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1c1a18] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <div className="max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">

          <div>

            <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
              Shop Haven Admin
            </p>

            <h1 className="font-serif text-4xl sm:text-5xl mt-3">
              Products
            </h1>

            <p className="text-sm text-[#756e65] mt-3">
              Manage your store collection and inventory.
            </p>

          </div>

          <button
            type="button"
            onClick={openCreateForm}
            className="bg-[#1b1917] text-white px-6 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black transition"
          >
            + Add Product
          </button>

        </div>

        {/* =================================================
            MESSAGES
        ================================================= */}

        {message && (
          <div className="mt-6 bg-[#edf3ea] border border-[#dce7d7] text-[#66755f] p-4 rounded-xl text-sm">
            {message}
          </div>
        )}

        {error && (
          <div className="mt-6 bg-[#fdf0ef] border border-[#efd9d5] text-[#a45d55] p-4 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* =================================================
            FORM
        ================================================= */}

        {showForm && (
          <section className="bg-white border border-[#e7e0d7] rounded-2xl p-5 sm:p-7 mt-8">

            <div className="flex items-center justify-between gap-4">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Catalogue
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl mt-2">
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

              </div>

              <button
                type="button"
                onClick={resetForm}
                className="w-9 h-9 rounded-full border border-[#d9d1c7] flex items-center justify-center text-[#756e65] hover:text-black transition"
                aria-label="Close product form"
              >
                ×
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-8"
            >

              <div className="grid md:grid-cols-2 gap-5">

                {/* NAME */}
                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                    Product Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                  />

                </div>

                {/* SLUG */}
                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                    Slug
                  </label>

                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                  />

                </div>

                {/* BRAND */}
                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                    Brand
                  </label>

                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    required
                    className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm bg-white outline-none focus:border-[#1c1a18] transition"
                  >

                    <option value="">
                      Select brand
                    </option>

                    {brands.map(
                      (brand) => (
                        <option
                          key={brand.id}
                          value={brand.id}
                        >
                          {brand.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* CATEGORY */}
                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                    Category
                  </label>

                  <select
                    name="category"
                    value={
                      formData.category
                    }
                    onChange={handleChange}
                    required
                    className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm bg-white outline-none focus:border-[#1c1a18] transition"
                  >

                    <option value="">
                      Select category
                    </option>

                    {categories.map(
                      (category) => (
                        <option
                          key={
                            category.id
                          }
                          value={
                            category.id
                          }
                        >
                          {category.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* PRICE */}
                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                    Price
                  </label>

                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                  />

                </div>

                {/* STOCK */}
                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                    Stock
                  </label>

                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    min="0"
                    required
                    className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                  />

                </div>

                {/* IMAGE */}
                <div>

                  <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                    Product Image
                  </label>

                  <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm bg-white"
                  />

                </div>

                {/* FEATURED */}
                <div className="flex items-center gap-3 md:pt-8">

                  <input
                    id="is_featured"
                    type="checkbox"
                    name="is_featured"
                    checked={
                      formData.is_featured
                    }
                    onChange={handleChange}
                    className="w-4 h-4 accent-black"
                  />

                  <label
                    htmlFor="is_featured"
                    className="text-sm text-[#454039]"
                  >
                    Featured Product
                  </label>

                </div>

              </div>

              {/* DESCRIPTION */}
              <div className="mt-5">

                <label className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3">
                  Description
                </label>

                <textarea
                  name="description"
                  value={
                    formData.description
                  }
                  onChange={handleChange}
                  rows="5"
                  required
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] resize-none transition"
                />

              </div>

              {/* BUTTONS */}
              <div className="mt-7 flex flex-wrap gap-3">

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#1b1917] text-white px-7 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black disabled:bg-[#aaa49d] transition"
                >
                  {saving
                    ? "Saving..."
                    : editingProduct
                    ? "Update Product"
                    : "Create Product"}
                </button>

                <button
                  type="button"
                  onClick={resetForm}
                  className="px-7 py-3.5 rounded-full border border-[#d4ccc2] text-[10px] uppercase tracking-[0.2em] text-[#655d55] hover:border-black hover:text-black transition"
                >
                  Cancel
                </button>

              </div>

            </form>
          </section>
        )}

        {/* =================================================
            PRODUCT TABLE
        ================================================= */}

        <section className="bg-white border border-[#e7e0d7] rounded-2xl overflow-hidden mt-8">

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="border-b border-[#e7e0d7] bg-[#faf8f4]">

                <tr>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Product
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Brand
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Category
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Price
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Stock
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Featured
                  </th>

                  <th className="text-left px-5 py-4 text-[9px] uppercase tracking-[0.2em] text-[#8d8378] font-medium">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {products.map(
                  (product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[#eee9e2] last:border-b-0 hover:bg-[#fcfaf7] transition"
                    >

                      {/* PRODUCT */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-4 min-w-[250px]">
{product.image ? (
  <img
    src={getImageUrl(product.image)}
    alt={product.name}
    className="w-16 h-20 object-cover rounded-xl bg-[#efebe5]"
  />
) : (
                            <div className="w-16 h-20 rounded-xl bg-[#efebe5] flex items-center justify-center text-[10px] text-[#9a9288]">
                              No Image
                            </div>
                          )}

                          <div className="min-w-0">

                            <p className="font-serif text-base text-[#1c1a18] truncate">
                              {product.name}
                            </p>

                            <p className="text-[9px] uppercase tracking-[0.12em] text-[#9a9085] mt-1">
                              #{product.id}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* BRAND */}
                      <td className="px-5 py-5 text-[#5f5850]">
                        {product.brand_name ||
                          "-"}
                      </td>

                      {/* CATEGORY */}
                      <td className="px-5 py-5 text-[#5f5850]">
                        {product.category_name ||
                          "-"}
                      </td>

                      {/* PRICE */}
                      <td className="px-5 py-5 font-medium text-[#292521]">
                        ₹
                        {Number(
                          product.price
                        ).toLocaleString(
                          "en-IN"
                        )}
                      </td>

                      {/* STOCK */}
                      <td className="px-5 py-5">

                        <span
                          className={
                            product.stock >
                            0
                              ? "inline-flex px-3 py-1.5 rounded-full bg-[#e8f0e5] text-[#687b60] text-[9px] uppercase tracking-[0.12em]"
                              : "inline-flex px-3 py-1.5 rounded-full bg-[#f8e9e8] text-[#a15d57] text-[9px] uppercase tracking-[0.12em]"
                          }
                        >
                          {product.stock}
                        </span>

                      </td>

                      {/* FEATURED */}
                      <td className="px-5 py-5">

                        {product.is_featured ? (
                          <span className="text-[9px] uppercase tracking-[0.12em] text-[#687b60]">
                            Yes
                          </span>
                        ) : (
                          <span className="text-[9px] uppercase tracking-[0.12em] text-[#9a9288]">
                            No
                          </span>
                        )}

                      </td>

                      {/* ACTIONS */}
                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              openEditForm(
                                product
                              )
                            }
                            className="px-4 py-2 rounded-full border border-[#d5cdc2] text-[9px] uppercase tracking-[0.14em] text-[#5e574f] hover:border-black hover:text-black transition"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(
                                product.id
                              )
                            }
                            disabled={
                              deletingId ===
                              product.id
                            }
                            className="px-4 py-2 rounded-full border border-[#e2c8c4] text-[9px] uppercase tracking-[0.14em] text-[#a15d57] hover:border-[#a15d57] disabled:opacity-50 transition"
                          >
                            {deletingId ===
                            product.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>

                        </div>

                      </td>

                    </tr>
                  )
                )}

              </tbody>

            </table>
          </div>

          {/* EMPTY */}
          {products.length === 0 && (
            <div className="p-12 text-center">

              <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                Catalogue
              </p>

              <h2 className="font-serif text-2xl mt-2">
                No Products Found
              </h2>

              <p className="text-sm text-[#756e65] mt-2">
                Add your first product to begin building the collection.
              </p>

              <button
                type="button"
                onClick={openCreateForm}
                className="mt-6 bg-[#1b1917] text-white px-7 py-3 rounded-full text-[10px] uppercase tracking-[0.2em]"
              >
                Add Product
              </button>

            </div>
          )}

        </section>

      </div>
    </div>
  );
}

export default AdminProductsPage;

