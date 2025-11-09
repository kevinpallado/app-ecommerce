<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <div class="bg-muted rounded-lg overflow-hidden h-96 md:h-full">
      <NuxtImg
        :src="
          productDetails.image ||
          'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/smartwatch-lifestyle-MqUJq7o0GQlVqJTAUQ6XsDAekJqaKQ.png'
        "
        :alt="productDetails.name"
        class="w-full h-full object-cover"
      />
    </div>

    <div class="flex flex-col gap-3">
      <h1 class="text-4xl font-bold text-foreground mb-4">
        {{ productDetails.name }}
      </h1>

      <div class="flex items-center gap-2 mb-2">
        <div class="flex gap-1">
          <span
            v-for="i in 5"
            :key="i"
            :class="[
              'inline-block',
              i <= Math.floor(productDetails.rating || 0)
                ? 'text-yellow-400'
                : 'text-muted-foreground',
            ]"
          >
            ★
          </span>
        </div>
        <span class="text-lg text-muted-foreground">
          ({{ productDetails.rating }})
        </span>
      </div>

      <span class="text-lg text-muted-foreground">
        Stock {{ selectedVariants.stock }} | {{ selectedVariants.sku }}
      </span>

      <p class="text-5xl font-bold text-foreground">
        {{ usdFormatter.format(selectedVariants.price) }}
      </p>

      <p class="text-lg text-muted-foreground">
        {{ productDetails.description }}
      </p>

      <Card>
        <CardContent class="p-6">
          <h3 class="font-semibold text-foreground mb-4">Select Options</h3>
          <div class="space-y-4">
            <label
              class="text-sm font-medium text-foreground capitalize mb-2 block"
            >
              Size
            </label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="variant in productDetails.variants"
                @click="updateVariant(variant)"
                :class="[
                  'px-4 py-2 rounded-lg border-2 transition-colors',
                  selectedVariants.id === variant.id
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border text-foreground hover:border-primary',
                ]"
              >
                {{ variant.name }}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Button class="w-full gap-2 py-6 text-lg" @click="addCart()">
        <ShoppingCart class="h4-w4" />
        Add to Cart
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ShoppingCart } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { addToCart } from "~/lib/api/cart";

const props = defineProps<{
  productDetails: any;
}>();

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

let selectedVariants = ref<any>(props.productDetails.variants[0]);

const updateVariant = (variant: any) => {
  selectedVariants.value = variant;
};

const addCart = () => {
  addToCart({
    qty: 1,
    product_name: props.productDetails.name,
    product_variant: selectedVariants.value.name,
    sku: selectedVariants.value.sku,
    variant_id: selectedVariants.value.id,
    variant_name: selectedVariants.value.name,
    product_id: selectedVariants.value.products_id,
    price: selectedVariants.value.price,
  });
};
</script>
