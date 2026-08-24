from pathlib import Path

import cloudinary.uploader

from django.conf import settings
from django.core.management.base import BaseCommand

from store.models import Brand, Product


BRAND_IMAGE_FIELDS = [
    "logo",
    "hero_image",
    "ambassador_image",
    "ambassador_image_1",
    "ambassador_image_2",
    "ambassador_image_3",
    "ambassador_image_4",
]


class Command(BaseCommand):
    help = "Upload existing local media images to Cloudinary"

    def upload_file(self, field_file):
        if not field_file or not field_file.name:
            return None

        local_path = Path(settings.MEDIA_ROOT) / field_file.name

        if not local_path.exists():
            self.stdout.write(
                self.style.WARNING(
                    f"❌ Local file not found: {local_path}"
                )
            )
            return None

        self.stdout.write(
            f"⬆ Uploading: {local_path}"
        )

        result = cloudinary.uploader.upload(
            str(local_path),
            folder="shop-heaven",
            use_filename=True,
            unique_filename=False,
            overwrite=True,
        )

        public_id = result.get("public_id")

        self.stdout.write(
            self.style.SUCCESS(
                f"✅ Uploaded: {public_id}"
            )
        )

        return public_id

    def migrate_products(self):
        self.stdout.write(
            self.style.SUCCESS(
                "\n===== PRODUCTS ====="
            )
        )

        for product in Product.objects.all():

            if not product.image:
                continue

            old_name = product.image.name

            public_id = self.upload_file(
                product.image
            )

            if public_id:
                product.image.name = public_id

                product.save(
                    update_fields=["image"]
                )

                self.stdout.write(
                    self.style.SUCCESS(
                        f"✅ Product {product.id}: "
                        f"{old_name} -> {public_id}"
                    )
                )

    def migrate_brands(self):
        self.stdout.write(
            self.style.SUCCESS(
                "\n===== BRANDS ====="
            )
        )

        for brand in Brand.objects.all():

            changed_fields = []

            for field_name in BRAND_IMAGE_FIELDS:

                field = getattr(
                    brand,
                    field_name
                )

                if not field:
                    continue

                old_name = field.name

                public_id = self.upload_file(
                    field
                )

                if public_id:

                    setattr(
                        brand,
                        field_name,
                        public_id
                    )

                    changed_fields.append(
                        field_name
                    )

                    self.stdout.write(
                        self.style.SUCCESS(
                            f"✅ Brand {brand.id} "
                            f"{field_name}: "
                            f"{old_name} -> {public_id}"
                        )
                    )

            if changed_fields:
                brand.save(
                    update_fields=changed_fields
                )

    def handle(self, *args, **options):

        self.stdout.write(
            self.style.SUCCESS(
                "\n🚀 Starting Cloudinary image migration...\n"
            )
        )

        self.migrate_products()
        self.migrate_brands()

        self.stdout.write(
            self.style.SUCCESS(
                "\n🎉 Cloudinary image migration completed!"
            )
        )