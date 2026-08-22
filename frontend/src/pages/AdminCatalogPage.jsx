import { useEffect, useState } from "react";

import {
  getAdminBrands,
  createAdminBrand,
  updateAdminBrand,
  deleteAdminBrand,
  getAdminCategories,
  createAdminCategory,
  updateAdminCategory,
  deleteAdminCategory,
} from "../services/adminCatalogService";

function AdminCatalogPage() {
  const BASEURL =
    import.meta.env.VITE_DJANGO_BASE_URL;

  // =====================================================
  // DATA
  // =====================================================

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] =
    useState([]);

  // =====================================================
  // UI STATES
  // =====================================================

  const [loading, setLoading] =
    useState(true);

  const [savingBrand, setSavingBrand] =
    useState(false);

  const [savingCategory, setSavingCategory] =
    useState(false);

  const [error, setError] =
    useState("");

  const [message, setMessage] =
    useState("");

  // =====================================================
  // BRAND FORM
  // =====================================================

  const emptyBrandForm = {
    name: "",
    slug: "",
    description: "",
    logo: null,
    hero_image: null,
    ambassador_image: null,
    ambassador_name: "",
    ambassador_description: "",
    ambassador_image_1: null,
    ambassador_image_2: null,
    ambassador_image_3: null,
    ambassador_image_4: null,
  };

  const [brandForm, setBrandForm] =
    useState(emptyBrandForm);

  const [editingBrandId, setEditingBrandId] =
    useState(null);

  // =====================================================
  // CATEGORY FORM
  // =====================================================

  const emptyCategoryForm = {
    name: "",
    slug: "",
  };

  const [categoryForm, setCategoryForm] =
    useState(emptyCategoryForm);

  const [editingCategoryId, setEditingCategoryId] =
    useState(null);

  // =====================================================
  // FETCH DATA
  // =====================================================

  const fetchCatalog = async () => {
    try {
      setLoading(true);
      setError("");

      const [
        brandsData,
        categoriesData,
      ] = await Promise.all([
        getAdminBrands(),
        getAdminCategories(),
      ]);

      setBrands(
        brandsData || []
      );

      setCategories(
        categoriesData || []
      );
    } catch (err) {
      console.error(
        "Admin catalog error:",
        err
      );

      setError(
        err.message ||
          "Failed to load brands and categories."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  // =====================================================
  // MESSAGES
  // =====================================================

  const resetMessages = () => {
    setError("");
    setMessage("");
  };

  // =====================================================
  // BRAND CHANGE
  // =====================================================

  const handleBrandChange = (e) => {
    const {
      name,
      value,
      files,
    } = e.target;

    const fileFields = [
      "logo",
      "hero_image",
      "ambassador_image",
      "ambassador_image_1",
      "ambassador_image_2",
      "ambassador_image_3",
      "ambassador_image_4",
    ];

    if (fileFields.includes(name)) {
      setBrandForm((prev) => ({
        ...prev,
        [name]:
          files?.[0] || null,
      }));

      return;
    }

    setBrandForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // BRAND SUBMIT
  // =====================================================

  const handleBrandSubmit = async (e) => {
    e.preventDefault();

    try {
      setSavingBrand(true);
      resetMessages();

      const data =
        new FormData();

      data.append(
        "name",
        brandForm.name.trim()
      );

      data.append(
        "slug",
        brandForm.slug.trim()
      );

      data.append(
        "description",
        brandForm.description.trim()
      );

      data.append(
        "ambassador_name",
        brandForm.ambassador_name.trim()
      );

      data.append(
        "ambassador_description",
        brandForm.ambassador_description.trim()
      );

      if (brandForm.logo) {
        data.append(
          "logo",
          brandForm.logo
        );
      }

      if (brandForm.hero_image) {
        data.append(
          "hero_image",
          brandForm.hero_image
        );
      }

      if (brandForm.ambassador_image) {
        data.append(
          "ambassador_image",
          brandForm.ambassador_image
        );
      }

      if (brandForm.ambassador_image_1) {
        data.append(
          "ambassador_image_1",
          brandForm.ambassador_image_1
        );
      }

      if (brandForm.ambassador_image_2) {
        data.append(
          "ambassador_image_2",
          brandForm.ambassador_image_2
        );
      }

      if (brandForm.ambassador_image_3) {
        data.append(
          "ambassador_image_3",
          brandForm.ambassador_image_3
        );
      }

      if (brandForm.ambassador_image_4) {
        data.append(
          "ambassador_image_4",
          brandForm.ambassador_image_4
        );
      }

      if (editingBrandId) {
        const updatedBrand =
          await updateAdminBrand(
            editingBrandId,
            data
          );

        setBrands((prev) =>
          prev.map((brand) =>
            brand.id ===
            updatedBrand.id
              ? updatedBrand
              : brand
          )
        );

        setMessage(
          "Brand updated successfully."
        );
      } else {
        const newBrand =
          await createAdminBrand(
            data
          );

        setBrands((prev) => [
          ...prev,
          newBrand,
        ]);

        setMessage(
          "Brand created successfully."
        );
      }

      setBrandForm(
        emptyBrandForm
      );

      setEditingBrandId(null);

      resetFileInputs();
    } catch (err) {
      console.error(
        "Brand save error:",
        err
      );

      setError(
        err.message ||
          "Failed to save brand."
      );
    } finally {
      setSavingBrand(false);
    }
  };

  // =====================================================
  // RESET FILE INPUTS
  // =====================================================

  const resetFileInputs = () => {
    const fileIds = [
      "brand-logo",
      "brand-hero-image",
      "ambassador-image",
      "ambassador-image-1",
      "ambassador-image-2",
      "ambassador-image-3",
      "ambassador-image-4",
    ];

    fileIds.forEach((id) => {
      const input =
        document.getElementById(id);

      if (input) {
        input.value = "";
      }
    });
  };

  // =====================================================
  // EDIT BRAND
  // =====================================================

  const editBrand = (brand) => {
    resetMessages();

    setEditingBrandId(
      brand.id
    );

    setBrandForm({
      name: brand.name || "",
      slug: brand.slug || "",
      description:
        brand.description || "",
      logo: null,
      hero_image: null,
      ambassador_image: null,
      ambassador_name:
        brand.ambassador_name || "",
      ambassador_description:
        brand.ambassador_description ||
        "",
      ambassador_image_1: null,
      ambassador_image_2: null,
      ambassador_image_3: null,
      ambassador_image_4: null,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CANCEL BRAND EDIT
  // =====================================================

  const cancelBrandEdit = () => {
    setEditingBrandId(null);

    setBrandForm(
      emptyBrandForm
    );

    resetFileInputs();
    resetMessages();
  };

  // =====================================================
  // DELETE BRAND
  // =====================================================

  const handleDeleteBrand = async (
    brandId
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this brand?"
      );

    if (!confirmed) {
      return;
    }

    try {
      resetMessages();

      await deleteAdminBrand(
        brandId
      );

      setBrands((prev) =>
        prev.filter(
          (brand) =>
            brand.id !== brandId
        )
      );

      setMessage(
        "Brand deleted successfully."
      );

      if (
        editingBrandId ===
        brandId
      ) {
        cancelBrandEdit();
      }
    } catch (err) {
      console.error(
        "Brand delete error:",
        err
      );

      setError(
        err.message ||
          "Failed to delete brand."
      );
    }
  };

  // =====================================================
  // CATEGORY CHANGE
  // =====================================================

  const handleCategoryChange = (
    e
  ) => {
    const {
      name,
      value,
    } = e.target;

    setCategoryForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // CATEGORY SUBMIT
  // =====================================================

  const handleCategorySubmit =
    async (e) => {
      e.preventDefault();

      try {
        setSavingCategory(true);
        resetMessages();

        const payload = {
          name:
            categoryForm.name.trim(),
          slug:
            categoryForm.slug.trim(),
        };

        if (editingCategoryId) {
          const updatedCategory =
            await updateAdminCategory(
              editingCategoryId,
              payload
            );

          setCategories((prev) =>
            prev.map((category) =>
              category.id ===
              updatedCategory.id
                ? updatedCategory
                : category
            )
          );

          setMessage(
            "Category updated successfully."
          );
        } else {
          const newCategory =
            await createAdminCategory(
              payload
            );

          setCategories((prev) => [
            ...prev,
            newCategory,
          ]);

          setMessage(
            "Category created successfully."
          );
        }

        setCategoryForm(
          emptyCategoryForm
        );

        setEditingCategoryId(null);
      } catch (err) {
        console.error(
          "Category save error:",
          err
        );

        setError(
          err.message ||
            "Failed to save category."
        );
      } finally {
        setSavingCategory(false);
      }
    };

  // =====================================================
  // EDIT CATEGORY
  // =====================================================

  const editCategory = (
    category
  ) => {
    resetMessages();

    setEditingCategoryId(
      category.id
    );

    setCategoryForm({
      name:
        category.name || "",
      slug:
        category.slug || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================================
  // CANCEL CATEGORY EDIT
  // =====================================================

  const cancelCategoryEdit =
    () => {
      setEditingCategoryId(null);

      setCategoryForm(
        emptyCategoryForm
      );

      resetMessages();
    };

  // =====================================================
  // DELETE CATEGORY
  // =====================================================

  const handleDeleteCategory =
    async (categoryId) => {
      const confirmed =
        window.confirm(
          "Are you sure you want to delete this category?"
        );

      if (!confirmed) {
        return;
      }

      try {
        resetMessages();

        await deleteAdminCategory(
          categoryId
        );

        setCategories((prev) =>
          prev.filter(
            (category) =>
              category.id !==
              categoryId
          )
        );

        setMessage(
          "Category deleted successfully."
        );

        if (
          editingCategoryId ===
          categoryId
        ) {
          cancelCategoryEdit();
        }
      } catch (err) {
        console.error(
          "Category delete error:",
          err
        );

        setError(
          err.message ||
            "Failed to delete category."
        );
      }
    };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8f6f2] flex items-center justify-center">

        <div className="text-center">

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven Admin
          </p>

          <p className="font-serif text-2xl mt-3 text-[#1c1a18]">
            Loading catalogue
          </p>

        </div>

      </div>
    );
  }

  // =====================================================
  // UI
  // =====================================================

  return (
    <div className="min-h-screen bg-[#f8f6f2] text-[#1c1a18] px-4 sm:px-6 lg:px-8 py-8 sm:py-10">

      <div className="w-full max-w-7xl mx-auto">

        {/* =================================================
            HEADER
        ================================================= */}

        <div>

          <p className="text-[9px] uppercase tracking-[0.4em] text-[#9a8666]">
            Shop Haven Admin
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl mt-3">
            Brands & Categories
          </h1>

          <p className="text-sm text-[#756e65] mt-3">
            Curate the houses and collections within your store.
          </p>

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
            MAIN GRID
        ================================================= */}

     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mt-8 items-start">

          {/* =================================================
              BRANDS
          ================================================= */}

          <section className="bg-white border border-[#e7e0d7] rounded-2xl p-5 sm:p-6">

            <div className="flex items-end justify-between gap-4">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Catalogue
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl mt-2">
                  Brands
                </h2>

              </div>

              <span className="text-[9px] uppercase tracking-[0.18em] text-[#9a9085]">
                {brands.length} Total
              </span>

            </div>

            {/* =================================================
                BRAND FORM
            ================================================= */}

            <form
              onSubmit={
                handleBrandSubmit
              }
              className="mt-7 space-y-5"
            >

              {/* Name */}
              <div>

                <label
                  htmlFor="brand-name"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Brand Name
                </label>

                <input
                  id="brand-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Gucci"
                  value={
                    brandForm.name
                  }
                  onChange={
                    handleBrandChange
                  }
                  required
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                />

              </div>

              {/* Slug */}
              <div>

                <label
                  htmlFor="brand-slug"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Slug
                </label>

                <input
                  id="brand-slug"
                  type="text"
                  name="slug"
                  placeholder="e.g. gucci"
                  value={
                    brandForm.slug
                  }
                  onChange={
                    handleBrandChange
                  }
                  required
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                />

              </div>

              {/* Description */}
              <div>

                <label
                  htmlFor="brand-description"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Description
                </label>

                <textarea
                  id="brand-description"
                  name="description"
                  placeholder="Brand description"
                  value={
                    brandForm.description
                  }
                  onChange={
                    handleBrandChange
                  }
                  rows="4"
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] resize-none transition"
                />

              </div>

              {/* Logo */}
              <div>

                <label
                  htmlFor="brand-logo"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Brand Logo
                </label>

                <input
                  id="brand-logo"
                  type="file"
                  name="logo"
                  accept="image/png,image/jpeg,image/webp,image/svg+xml"
                  onChange={
                    handleBrandChange
                  }
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 bg-white text-sm"
                />

                <p className="text-xs text-[#9b9186] mt-2">
                  PNG, JPG, WEBP or SVG
                </p>

                {brandForm.logo && (
                  <div className="mt-4 flex items-center gap-4">

                    <div className="w-16 h-16 rounded-xl bg-[#f8f6f2] border border-[#e1dad1] overflow-hidden flex items-center justify-center">

                      <img
                        src={URL.createObjectURL(
                          brandForm.logo
                        )}
                        alt="Logo preview"
                        className="w-full h-full object-contain p-2"
                      />

                    </div>

                    <p className="text-sm text-[#746d64] truncate">
                      {brandForm.logo.name}
                    </p>

                  </div>
                )}

              </div>

              {/* Hero */}
              <div>

                <label
                  htmlFor="brand-hero-image"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Brand Hero Image
                </label>

                <input
                  id="brand-hero-image"
                  type="file"
                  name="hero_image"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={
                    handleBrandChange
                  }
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 bg-white text-sm"
                />

                <p className="text-xs text-[#9b9186] mt-2">
                  Use a large luxury campaign or editorial image.
                </p>

                {brandForm.hero_image && (
                  <div className="mt-4 flex items-center gap-4">

                    <div className="w-20 h-20 rounded-xl bg-[#f8f6f2] border border-[#e1dad1] overflow-hidden">

                      <img
                        src={URL.createObjectURL(
                          brandForm.hero_image
                        )}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />

                    </div>

                    <p className="text-sm text-[#746d64] truncate">
                      {
                        brandForm.hero_image
                          .name
                      }
                    </p>

                  </div>
                )}

              </div>

              {/* Ambassador Name */}
              <div>

                <label
                  htmlFor="ambassador-name"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Ambassador Name
                </label>

                <input
                  id="ambassador-name"
                  type="text"
                  name="ambassador_name"
                  value={
                    brandForm.ambassador_name
                  }
                  onChange={
                    handleBrandChange
                  }
                  placeholder="Ambassador name"
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                />

              </div>

              {/* Ambassador Description */}
              <div>

                <label
                  htmlFor="ambassador-description"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Ambassador Description
                </label>

                <textarea
                  id="ambassador-description"
                  name="ambassador_description"
                  value={
                    brandForm.ambassador_description
                  }
                  onChange={
                    handleBrandChange
                  }
                  rows="4"
                  placeholder="Short editorial description about the ambassador..."
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] resize-none transition"
                />

              </div>

              {/* Ambassador Images */}
              <div>

                <p className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-4">
                  Ambassador Campaign Images
                </p>

                <div className="grid sm:grid-cols-2 gap-4">

                  {[
                    {
                      id: "ambassador-image-1",
                      name: "ambassador_image_1",
                      label: "Image 1",
                    },
                    {
                      id: "ambassador-image-2",
                      name: "ambassador_image_2",
                      label: "Image 2",
                    },
                    {
                      id: "ambassador-image-3",
                      name: "ambassador_image_3",
                      label: "Image 3",
                    },
                    {
                      id: "ambassador-image-4",
                      name: "ambassador_image_4",
                      label: "Image 4",
                    },
                  ].map((item) => (

                    <div
                      key={item.name}
                      className="border border-[#e3dcd3] rounded-xl p-4 bg-[#fcfaf7]"
                    >

                      <label
                        htmlFor={item.id}
                        className="block text-[9px] uppercase tracking-[0.18em] font-medium text-[#847a6f] mb-3"
                      >
                        Ambassador {item.label}
                      </label>

                      <input
                        id={item.id}
                        type="file"
                        name={item.name}
                        accept="image/png,image/jpeg,image/webp"
                        onChange={
                          handleBrandChange
                        }
                        className="w-full text-xs"
                      />

                      {brandForm[
                        item.name
                      ] && (
                        <div className="mt-3 w-24 h-24 rounded-xl overflow-hidden border border-[#ddd5ca]">

                          <img
                            src={URL.createObjectURL(
                              brandForm[
                                item.name
                              ]
                            )}
                            alt={`Ambassador preview ${item.label}`}
                            className="w-full h-full object-cover"
                          />

                        </div>
                      )}

                    </div>

                  ))}

                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">

                <button
                  type="submit"
                  disabled={
                    savingBrand
                  }
                  className="bg-[#1b1917] text-white px-6 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black disabled:bg-[#aaa49d] transition"
                >
                  {savingBrand
                    ? "Saving..."
                    : editingBrandId
                    ? "Update Brand"
                    : "Add Brand"}
                </button>

                {editingBrandId && (
                  <button
                    type="button"
                    onClick={
                      cancelBrandEdit
                    }
                    className="px-6 py-3.5 rounded-full border border-[#d4ccc2] text-[10px] uppercase tracking-[0.2em] text-[#655d55] hover:border-black hover:text-black transition"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

            {/* =================================================
                BRAND LIST
            ================================================= */}

            <div className="mt-9 space-y-3">

              {brands.map(
                (brand) => (
                  <div
                    key={brand.id}
                    className="border border-[#e2dbd2] rounded-2xl p-4 hover:border-[#cfc5b8] transition"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div className="flex items-center gap-4 min-w-0">

                        <div className="w-14 h-14 shrink-0 rounded-xl bg-[#f8f6f2] border border-[#e1dad1] overflow-hidden flex items-center justify-center">

                          {brand.logo ? (
                            <img
                              src={`${BASEURL}${brand.logo}`}
                              alt={brand.name}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <span className="font-serif text-xl">
                              {brand.name
                                .charAt(
                                  0
                                )
                                .toUpperCase()}
                            </span>
                          )}

                        </div>

                        <div className="min-w-0">

                          <p className="font-serif text-lg truncate">
                            {brand.name}
                          </p>

                          <p className="text-[9px] uppercase tracking-[0.12em] text-[#9a9085] mt-1 truncate">
                            /{brand.slug}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-2 shrink-0">

                        <button
                          type="button"
                          onClick={() =>
                            editBrand(
                              brand
                            )
                          }
                          className="px-3 sm:px-4 py-2 text-[9px] uppercase tracking-[0.14em] border border-[#d6cec3] rounded-full text-[#5f574f] hover:border-black hover:text-black transition"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteBrand(
                              brand.id
                            )
                          }
                          className="px-3 sm:px-4 py-2 text-[9px] uppercase tracking-[0.14em] border border-[#e2c8c4] text-[#a15d57] rounded-full hover:border-[#a15d57] transition"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                    {brand.description && (
                      <p className="text-sm text-[#756e65] mt-3 leading-6">
                        {brand.description}
                      </p>
                    )}

                  </div>
                )
              )}

              {brands.length === 0 && (
                <div className="text-center py-8 text-[#8b8177] text-sm">
                  No brands found.
                </div>
              )}

            </div>

          </section>

          {/* =================================================
              CATEGORIES
          ================================================= */}

          <section className="self-start bg-white border border-[#e7e0d7] rounded-2xl p-5 sm:p-6">

            <div className="flex items-end justify-between gap-4">

              <div>

                <p className="text-[9px] uppercase tracking-[0.3em] text-[#9a8666]">
                  Catalogue
                </p>

                <h2 className="font-serif text-2xl sm:text-3xl mt-2">
                  Categories
                </h2>

              </div>

              <span className="text-[9px] uppercase tracking-[0.18em] text-[#9a9085]">
                {categories.length} Total
              </span>

            </div>

            {/* =================================================
                CATEGORY FORM
            ================================================= */}

            <form
              onSubmit={
                handleCategorySubmit
              }
              className="mt-7 space-y-5"
            >

              {/* Name */}
              <div>

                <label
                  htmlFor="category-name"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Category Name
                </label>

                <input
                  id="category-name"
                  type="text"
                  name="name"
                  placeholder="e.g. Bags"
                  value={
                    categoryForm.name
                  }
                  onChange={
                    handleCategoryChange
                  }
                  required
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                />

              </div>

              {/* Slug */}
              <div>

                <label
                  htmlFor="category-slug"
                  className="block text-[10px] uppercase tracking-[0.2em] font-medium text-[#847a6f] mb-3"
                >
                  Slug
                </label>

                <input
                  id="category-slug"
                  type="text"
                  name="slug"
                  placeholder="e.g. bags"
                  value={
                    categoryForm.slug
                  }
                  onChange={
                    handleCategoryChange
                  }
                  required
                  className="w-full border border-[#dcd4ca] rounded-xl px-4 py-3.5 text-sm outline-none focus:border-[#1c1a18] transition"
                />

              </div>

              {/* Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">

                <button
                  type="submit"
                  disabled={
                    savingCategory
                  }
                  className="bg-[#1b1917] text-white px-6 py-3.5 rounded-full text-[10px] uppercase tracking-[0.2em] hover:bg-black disabled:bg-[#aaa49d] transition"
                >
                  {savingCategory
                    ? "Saving..."
                    : editingCategoryId
                    ? "Update Category"
                    : "Add Category"}
                </button>

                {editingCategoryId && (
                  <button
                    type="button"
                    onClick={
                      cancelCategoryEdit
                    }
                    className="px-6 py-3.5 rounded-full border border-[#d4ccc2] text-[10px] uppercase tracking-[0.2em] text-[#655d55] hover:border-black hover:text-black transition"
                  >
                    Cancel
                  </button>
                )}

              </div>

            </form>

            {/* =================================================
                CATEGORY LIST
            ================================================= */}

            <div className="mt-9 space-y-3">

              {categories.map(
                (category) => (
                  <div
                    key={category.id}
                    className="border border-[#e2dbd2] rounded-2xl p-4 hover:border-[#cfc5b8] transition"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div className="min-w-0">

                        <p className="font-serif text-lg truncate">
                          {category.name}
                        </p>

                        <p className="text-[9px] uppercase tracking-[0.12em] text-[#9a9085] mt-1 truncate">
                          /{category.slug}
                        </p>

                      </div>

                      <div className="flex gap-2 shrink-0">

                        <button
                          type="button"
                          onClick={() =>
                            editCategory(
                              category
                            )
                          }
                          className="px-3 sm:px-4 py-2 text-[9px] uppercase tracking-[0.14em] border border-[#d6cec3] rounded-full text-[#5f574f] hover:border-black hover:text-black transition"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteCategory(
                              category.id
                            )
                          }
                          className="px-3 sm:px-4 py-2 text-[9px] uppercase tracking-[0.14em] border border-[#e2c8c4] text-[#a15d57] rounded-full hover:border-[#a15d57] transition"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  </div>
                )
              )}

              {categories.length === 0 && (
                <div className="text-center py-8 text-[#8b8177] text-sm">
                  No categories found.
                </div>
              )}

            </div>

          </section>

        </div>
      </div>
    </div>
  );
}

export default AdminCatalogPage;

