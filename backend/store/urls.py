from django.urls import path
from .views import (
    register,
    product_list,
    product_detail,
    cart_detail,
    add_to_cart,
    update_cart_item,
    remove_cart_item,
    wishlist_detail,
    add_to_wishlist,
    remove_from_wishlist,
    place_order,
    order_list,
    order_detail,
    profile_detail,
    brand_list,
    category_list,
    cancel_order,
    update_order_status,
    admin_order_list,
    admin_product_list_create,
    admin_product_detail,
    admin_brand_list_create,
    admin_brand_detail,
    admin_category_list_create,
    admin_category_detail,

    admin_dashboard,
    MyTokenObtainPairView,
    
)
urlpatterns = [
    path("register/", register, name="register"),
    path("products/", product_list, name="product-list"),
    path("products/<int:pk>/", product_detail, name="product-detail"),
    path("cart/", cart_detail, name="cart-detail"),
    path("cart/add/", add_to_cart, name="cart-add"),
    path(
    "cart/items/<int:item_id>/",
    update_cart_item,
    name="cart-item-update",
),
    path(
    "cart/items/<int:item_id>/remove/",
    remove_cart_item,
    name="cart-item-remove",
),
    path("wishlist/", wishlist_detail, name="wishlist-detail"),
    path("wishlist/add/", add_to_wishlist, name="wishlist-add"),
    path(
    "wishlist/items/<int:item_id>/remove/",
    remove_from_wishlist,
    name="wishlist-remove",
),
    path(
    "orders/place/",
    place_order,
    name="place-order",
),
    path(
    "orders/",
    order_list,
    name="order-list",
),

    path(
    "orders/<int:order_id>/",
    order_detail,
    name="order-detail",
),
    path(
    "profile/",
    profile_detail,
    name="profile-detail",
),
    path(
    "brands/",
    brand_list,
    name="brand-list",
),

    path(
    "categories/",
    category_list,
    name="category-list",
),
    path(
    "orders/<int:order_id>/cancel/",
    cancel_order,
    name="order-cancel",
),
    path(
    "admin/orders/<int:order_id>/status/",
    update_order_status,
    name="admin-order-status-update",
),
    path(
    "admin/orders/",
    admin_order_list,
    name="admin-order-list",
),
    path(
    "admin/products/",
    admin_product_list_create,
    name="admin-product-list-create",
),

    path(
    "admin/products/<int:product_id>/",
    admin_product_detail,
    name="admin-product-detail",
),
    path(
    "admin/brands/",
    admin_brand_list_create,
    name="admin-brand-list-create",
),

    path(
    "admin/brands/<int:brand_id>/",
    admin_brand_detail,
    name="admin-brand-detail",
),

    path(
    "admin/categories/",
    admin_category_list_create,
    name="admin-category-list-create",
),

    path(
    "admin/categories/<int:category_id>/",
    admin_category_detail,
    name="admin-category-detail",
),

path(
    "admin/dashboard/",
    admin_dashboard,
    name="admin-dashboard",
),

path(
    "token/",
    MyTokenObtainPairView.as_view(),
    name="token_obtain_pair",
),
]