<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex justify-between items-center">
      <NuxtLink
        to="/products"
        class="inline-flex items-center gap-2 mb-6 text-primary hover:underline"
      >
        <ArrowLeft class="h-4 w-4" />
        Back to Products
      </NuxtLink>

      <NuxtLink
        to="/checkout"
        class="inline-flex items-center gap-2 mb-6 text-primary hover:underline"
      >
        <Button variant="link" class="relative cursor-pointer">
          <ShoppingCart class="h-6 w-6" />
          <Badge
            class="absolute -top-3 -right-3 h-5 min-w-5 flex items-center justify-center p-1 text-xs"
            variant="destructive"
          >
            {{ cart.length }}
          </Badge>
        </Button>
      </NuxtLink>
    </div>

    <div v-if="pending" class="text-center py-12">Loading...</div>

    <div v-else-if="error" class="text-center py-12 text-red-500">
      Error loading product: {{ error.message }}
    </div>

    <ProductsDetails
      v-else-if="productDetails && !pending"
      :productDetails="productDetails"
    />
  </div>
</template>

<script setup lang="ts">
import { ArrowLeft, ShoppingCart } from "lucide-vue-next";
import { cart } from "~/lib/api/cart";
import { Badge } from "@/components/ui/badge";
const route = useRoute();

const config = useRuntimeConfig();

const {
  data: apiData,
  pending,
  error,
  refresh,
} = await useFetch<any>(
  `${config.public.PRODUCTS_URL}/api/products/${route.params.id}`
);

const productDetails = computed(() => {
  const _product = apiData.value?.data;

  // Return null if no product data
  if (!_product) return null;

  // Format variant prices if variants exist
  const _productVariants =
    _product.variants?.map((variant: any) => ({
      ...variant,
    })) || [];

  return {
    ..._product,
    rating: 5,
    variants: _productVariants,
  };
});
</script>
