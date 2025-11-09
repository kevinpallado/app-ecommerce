<template>
  <div class="container mx-auto p-6">
    <div class="flex items-center justify-between">
      <h1 class="text-3xl font-bold mb-6">Products Catalog</h1>

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

    <div v-if="pending" class="text-center py-10">
      <div
        class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"
      ></div>
      <p class="mt-4">Loading products...</p>
    </div>

    <div v-else-if="error" class="text-red-500 text-center py-10">
      <p class="text-xl font-semibold">Error loading products</p>
      <p class="mt-2">{{ error.message }}</p>
      <button
        @click="refresh()"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try Again
      </button>
    </div>

    <div v-else>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <NuxtLink
          v-for="product in transformedProducts"
          :key="product.id"
          :to="`/product/${product.id}`"
          class="block hover:shadow-lg transition-shadow"
        >
          <ProductsCard :product="product" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ShoppingCart } from "lucide-vue-next";
import { Badge } from "@/components/ui/badge";
import { cart } from "~/lib/api/cart";

const config = useRuntimeConfig();

const {
  data: apiData,
  pending,
  error,
  refresh,
} = await useFetch<any>(`${config.public.PRODUCTS_URL}/api/products`);

const transformedProducts = computed(() => {
  if (!apiData.value?.data) return [];

  return apiData.value.data.map((item: any) => {
    // Find the variant with the lowest price
    const cheapestVariant = item.variants?.reduce(
      (min: any, variant: any) => (variant.price < min.price ? variant : min),
      item.variants[0]
    );

    return {
      id: item.id,
      name: item.name,
      price: cheapestVariant?.price || 0,
      image: `https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/smartwatch-lifestyle-MqUJq7o0GQlVqJTAUQ6XsDAekJqaKQ.png`,
      rating: 2,
      description: item.description,
      stock: item.stock,
      category: item.category?.name,
      hasMultipleVariants: item.variants && item.variants.length > 1,
    };
  });
});
</script>
