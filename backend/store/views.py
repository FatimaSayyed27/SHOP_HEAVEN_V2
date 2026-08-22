from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import RegisterSerializer
from .models import (
    Brand,
    Category,
    Product,
    Cart,
    CartItem,
    Wishlist,
    WishlistItem,
    Order,
    OrderItem,
    UserProfile,
)
from .serializers import ProductSerializer, CartSerializer, WishlistSerializer, OrderSerializer, UserProfileSerializer, BrandSerializer, CategorySerializer, AdminOrderSerializer,AdminProductSerializer, AdminBrandSerializer, AdminCategorySerializer, MyTokenObtainPairSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.shortcuts import get_object_or_404
from django.db import transaction
from django.db import models

from django.contrib.auth.models import User
from django.db.models import Sum, Count

from rest_framework.pagination import PageNumberPagination

from rest_framework_simplejwt.views import TokenObtainPairView

@api_view(["POST"])
def register(request):
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()

        return Response(
            {
                "message": "Account created successfully!"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

class ProductPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = "page_size"
    max_page_size = 48

@api_view(["GET"])
@permission_classes([AllowAny])
def product_list(request):
    products = Product.objects.all()

    search = request.GET.get("search")
    brand = request.GET.get("brand")
    category = request.GET.get("category")
    min_price = request.GET.get("min_price")
    max_price = request.GET.get("max_price")
    sort = request.GET.get("sort", "default")

    # Search
    if search:
        products = products.filter(
            models.Q(name__icontains=search)
            | models.Q(description__icontains=search)
            | models.Q(brand__name__icontains=search)
            | models.Q(category__name__icontains=search)
            | models.Q(category__slug__icontains=search)
        )

    # Brand
    if brand:
        products = products.filter(
            brand__slug=brand
        )

    # Category
    if category:
        products = products.filter(
            category__slug=category
        )

    # Price range
    if min_price:
        products = products.filter(
            price__gte=min_price
        )

    if max_price:
        products = products.filter(
            price__lte=max_price
        )

    # Sorting
    if sort == "price-low":
        products = products.order_by("price")

    elif sort == "price-high":
        products = products.order_by("-price")

    elif sort == "newest":
        products = products.order_by("-created_at")

    else:
        products = products.order_by("-created_at")

    paginator = ProductPagination()

    page = paginator.paginate_queryset(
        products,
        request
    )

    serializer = ProductSerializer(
        page,
        many=True
    )

    return paginator.get_paginated_response(
        serializer.data
    )

@api_view(["GET"])
@permission_classes([AllowAny])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(
            {"detail": "Product not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = ProductSerializer(product)

    return Response(serializer.data)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def cart_detail(request):
    cart, created = Cart.objects.get_or_create(
        user=request.user
    )

    serializer = CartSerializer(cart)

    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_cart(request):
    product_id = request.data.get("product")
    quantity = request.data.get("quantity", 1)

    if not product_id:
        return Response(
            {"detail": "Product is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        quantity = int(quantity)
    except (TypeError, ValueError):
        return Response(
            {"detail": "Quantity must be a number."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if quantity < 1:
        return Response(
            {"detail": "Quantity must be at least 1."},
            status=status.HTTP_400_BAD_REQUEST
        )

    product = get_object_or_404(Product, id=product_id)

    if quantity > product.stock:
        return Response(
            {"detail": "Not enough stock available."},
            status=status.HTTP_400_BAD_REQUEST
        )

    cart, created = Cart.objects.get_or_create(
        user=request.user
    )

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart,
        product=product,
        defaults={"quantity": quantity}
    )

    if not created:
        cart_item.quantity = quantity
        cart_item.save()

    serializer = CartSerializer(cart)

    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )

@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_cart_item(request, item_id):
    cart_item = get_object_or_404(
        CartItem,
        id=item_id,
        cart__user=request.user
    )

    quantity = request.data.get("quantity")

    try:
        quantity = int(quantity)
    except (TypeError, ValueError):
        return Response(
            {"detail": "Quantity must be a number."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if quantity < 1:
        return Response(
            {"detail": "Quantity must be at least 1."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if quantity > cart_item.product.stock:
        return Response(
            {"detail": "Not enough stock available."},
            status=status.HTTP_400_BAD_REQUEST
        )

    cart_item.quantity = quantity
    cart_item.save()

    serializer = CartSerializer(cart_item.cart)

    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_cart_item(request, item_id):
    cart_item = get_object_or_404(
        CartItem,
        id=item_id,
        cart__user=request.user
    )

    cart = cart_item.cart
    cart_item.delete()

    serializer = CartSerializer(cart)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def wishlist_detail(request):
    wishlist, created = Wishlist.objects.get_or_create(
        user=request.user
    )

    serializer = WishlistSerializer(wishlist)

    return Response(serializer.data)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def add_to_wishlist(request):
    product_id = request.data.get("product")

    if not product_id:
        return Response(
            {"detail": "Product is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    product = get_object_or_404(Product, id=product_id)

    wishlist, created = Wishlist.objects.get_or_create(
        user=request.user
    )

    WishlistItem.objects.get_or_create(
        wishlist=wishlist,
        product=product
    )

    serializer = WishlistSerializer(wishlist)

    return Response(
        serializer.data,
        status=status.HTTP_201_CREATED
    )


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def remove_from_wishlist(request, item_id):
    item = get_object_or_404(
        WishlistItem,
        id=item_id,
        wishlist__user=request.user
    )

    wishlist = item.wishlist
    item.delete()

    serializer = WishlistSerializer(wishlist)

    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def place_order(request):
    shipping_address = request.data.get("shipping_address")
    payment_method = request.data.get("payment_method", "COD")

    if not shipping_address:
        return Response(
            {"detail": "Shipping address is required."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if payment_method not in ["COD", "ONLINE"]:
        return Response(
            {"detail": "Invalid payment method."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with transaction.atomic():

            cart = Cart.objects.select_for_update().get(
                user=request.user
            )

            cart_items = list(
                cart.items.select_related("product")
            )

            if not cart_items:
                return Response(
                    {"detail": "Your cart is empty."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            total_price = 0

            # Check stock and calculate total
            for item in cart_items:
                if item.quantity > item.product.stock:
                    return Response(
                        {
                            "detail": (
                                f"Not enough stock for "
                                f"{item.product.name}."
                            )
                        },
                        status=status.HTTP_400_BAD_REQUEST
                    )

                total_price += (
                    item.product.price * item.quantity
                )

            # Create Order
            order = Order.objects.create(
                user=request.user,
                total_price=total_price,
                payment_method=payment_method,
                shipping_address=shipping_address,
            )

            # Create OrderItems + reduce stock
            for item in cart_items:
                OrderItem.objects.create(
                    order=order,
                    product=item.product,
                    quantity=item.quantity,
                    price=item.product.price,
                )

                item.product.stock -= item.quantity
                item.product.save(
                    update_fields=["stock"]
                )

            # Clear cart
            cart.items.all().delete()

        serializer = OrderSerializer(order)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    except Cart.DoesNotExist:
        return Response(
            {"detail": "Cart not found."},
            status=status.HTTP_404_NOT_FOUND
        )

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_list(request):
    orders = Order.objects.filter(
        user=request.user
    ).prefetch_related("items__product").order_by("-created_at")

    serializer = OrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def order_detail(request, order_id):
    order = get_object_or_404(
        Order.objects.prefetch_related("items__product"),
        id=order_id,
        user=request.user
    )

    serializer = OrderSerializer(order)

    return Response(serializer.data)

@api_view(["GET", "PATCH"])
@permission_classes([IsAuthenticated])
def profile_detail(request):
    profile, created = UserProfile.objects.get_or_create(
        user=request.user
    )

    if request.method == "GET":
        serializer = UserProfileSerializer(profile)
        return Response(serializer.data)

    serializer = UserProfileSerializer(
        profile,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET"])
@permission_classes([AllowAny])
def brand_list(request):
    brands = Brand.objects.all().order_by("name")
    serializer = BrandSerializer(brands, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([AllowAny])
def category_list(request):
    categories = Category.objects.all().order_by("name")
    serializer = CategorySerializer(categories, many=True)

    return Response(serializer.data)

@api_view(["POST"])
@permission_classes([IsAuthenticated])
def cancel_order(request, order_id):
    with transaction.atomic():
        order = get_object_or_404(
            Order.objects.select_for_update(),
            id=order_id,
            user=request.user
        )

        if order.status == "CANCELLED":
            return Response(
                {"detail": "Order is already cancelled."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if order.status not in ["PENDING", "CONFIRMED"]:
            return Response(
                {
                    "detail": (
                        "This order cannot be cancelled "
                        "at its current status."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        for item in order.items.select_related("product"):
            item.product.stock += item.quantity
            item.product.save(
                update_fields=["stock"]
            )

        order.status = "CANCELLED"
        order.save(update_fields=["status"])

    serializer = OrderSerializer(order)

    return Response(
        serializer.data,
        status=status.HTTP_200_OK
    )

@api_view(["PATCH"])
@permission_classes([IsAdminUser])
def update_order_status(request, order_id):
    new_status = request.data.get("status")

    valid_statuses = [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
        "CANCELLED",
    ]

    if new_status not in valid_statuses:
        return Response(
            {
                "detail": (
                    "Invalid status. "
                    "Allowed: PENDING, CONFIRMED, "
                    "SHIPPED, DELIVERED, CANCELLED."
                )
            },
            status=status.HTTP_400_BAD_REQUEST,
        )

    with transaction.atomic():
        order = get_object_or_404(
            Order.objects.select_for_update(),
            id=order_id,
        )

        old_status = order.status

        if old_status == new_status:
            serializer = OrderSerializer(order)
            return Response(serializer.data)

        # Cancel order → restore stock
        if (
            new_status == "CANCELLED"
            and old_status != "CANCELLED"
        ):
            for item in order.items.select_related("product"):
                item.product.stock += item.quantity
                item.product.save(
                    update_fields=["stock"]
                )

        # Prevent cancelled order from becoming active again
        if (
            old_status == "CANCELLED"
            and new_status != "CANCELLED"
        ):
            return Response(
                {
                    "detail": (
                        "A cancelled order cannot be "
                        "moved back to an active status."
                    )
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        order.status = new_status
        order.save(update_fields=["status"])

    serializer = OrderSerializer(order)

    return Response(
        serializer.data,
        status=status.HTTP_200_OK,
    )

@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_order_list(request):
    orders = (
        Order.objects
        .select_related("user")
        .prefetch_related("items__product")
        .order_by("-created_at")
    )

    serializer = AdminOrderSerializer(
        orders,
        many=True
    )

    return Response(serializer.data)

@api_view(["GET", "POST"])
@permission_classes([IsAdminUser])
def admin_product_list_create(request):

    if request.method == "GET":
        products = (
            Product.objects
            .select_related("brand", "category")
            .order_by("-created_at")
        )

        serializer = AdminProductSerializer(
            products,
            many=True
        )

        return Response(serializer.data)

    serializer = AdminProductSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAdminUser])
def admin_product_detail(request, product_id):
    product = get_object_or_404(
        Product,
        id=product_id
    )

    if request.method == "GET":
        serializer = AdminProductSerializer(product)
        return Response(serializer.data)

    if request.method == "PATCH":
        serializer = AdminProductSerializer(
            product,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    product.delete()

    return Response(
        {"detail": "Product deleted successfully."},
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(["GET", "POST"])
@permission_classes([IsAdminUser])
def admin_brand_list_create(request):

    if request.method == "GET":
        brands = Brand.objects.all().order_by("name")

        serializer = AdminBrandSerializer(
            brands,
            many=True
        )

        return Response(serializer.data)

    serializer = AdminBrandSerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAdminUser])
def admin_brand_detail(request, brand_id):
    brand = get_object_or_404(
        Brand,
        id=brand_id
    )

    if request.method == "GET":
        serializer = AdminBrandSerializer(brand)
        return Response(serializer.data)

    if request.method == "PATCH":
        serializer = AdminBrandSerializer(
            brand,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    brand.delete()

    return Response(
        {"detail": "Brand deleted successfully."},
        status=status.HTTP_204_NO_CONTENT
    )

@api_view(["GET", "POST"])
@permission_classes([IsAdminUser])
def admin_category_list_create(request):

    if request.method == "GET":
        categories = Category.objects.all().order_by("name")

        serializer = AdminCategorySerializer(
            categories,
            many=True
        )

        return Response(serializer.data)

    serializer = AdminCategorySerializer(
        data=request.data
    )

    if serializer.is_valid():
        serializer.save()

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )

@api_view(["GET", "PATCH", "DELETE"])
@permission_classes([IsAdminUser])
def admin_category_detail(request, category_id):
    category = get_object_or_404(
        Category,
        id=category_id
    )

    if request.method == "GET":
        serializer = AdminCategorySerializer(category)
        return Response(serializer.data)

    if request.method == "PATCH":
        serializer = AdminCategorySerializer(
            category,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    category.delete()

    return Response(
        {"detail": "Category deleted successfully."},
        status=status.HTTP_204_NO_CONTENT
    )
@api_view(["GET"])
@permission_classes([IsAdminUser])
def admin_dashboard(request):
    total_products = Product.objects.count()

    total_orders = Order.objects.count()

    total_users = User.objects.count()

    total_revenue = (
        Order.objects
        .exclude(status="CANCELLED")
        .aggregate(
            total=Sum("total_price")
        )["total"]
        or 0
    )

    pending_orders = Order.objects.filter(
        status="PENDING"
    ).count()

    low_stock_products = Product.objects.filter(
        stock__lte=5
    ).count()

    recent_orders = (
        Order.objects
        .select_related("user")
        .order_by("-created_at")[:5]
    )

    recent_orders_data = [
        {
            "id": order.id,
            "username": order.user.username,
            "total_price": order.total_price,
            "status": order.status,
            "payment_method": order.payment_method,
            "created_at": order.created_at,
        }
        for order in recent_orders
    ]

    low_stock = (
        Product.objects
        .select_related("brand", "category")
        .filter(stock__lte=5)
        .order_by("stock")[:5]
    )

    low_stock_data = [
        {
            "id": product.id,
            "name": product.name,
            "stock": product.stock,
            "brand": product.brand.name,
            "category": product.category.name,
        }
        for product in low_stock
    ]

    return Response({
        "total_products": total_products,
        "total_orders": total_orders,
        "total_users": total_users,
        "total_revenue": total_revenue,
        "pending_orders": pending_orders,
        "low_stock_products": low_stock_products,
        "recent_orders": recent_orders_data,
        "low_stock_items": low_stock_data,
    })


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer