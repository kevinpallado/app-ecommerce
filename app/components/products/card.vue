<template>
  <Card class="overflow-hidden hover:shadow-lg transition-shadow">
    <CardContent class="p-0">
      <div class="relative w-full h-64 bg-muted">
        <img
          :src="product.image || '/placeholder.svg'"
          :alt="product.name"
          class="w-full h-full object-cover"
        />
      </div>
    </CardContent>
    <div class="p-4">
      <h3 class="text-lg font-semibold text-foreground truncate">
        {{ product.name }}
      </h3>

      <!-- Category badge -->
      <span
        v-if="product.category"
        class="inline-block text-xs bg-gray-200 rounded-full px-2 py-1 mt-2"
      >
        {{ product.category }}
      </span>

      <div class="flex items-center gap-1 mt-2">
        <div class="flex">
          <Star
            v-for="i in 5"
            :key="i"
            :size="16"
            :class="
              i <= Math.floor(product.rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-muted-foreground'
            "
          />
        </div>
        <span class="text-sm text-muted-foreground ml-1">
          ({{ product.rating }})
        </span>
      </div>

      <!-- Stock info -->
      <div
        v-if="product.stock !== undefined"
        class="text-sm text-muted-foreground mt-2"
      >
        Stock: {{ product.stock }}
      </div>

      <div class="flex items-end justify-between mt-4">
        <span class="text-xl font-bold text-foreground">
          {{ usdFormatter.format(product.price) }}
        </span>
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-vue-next";

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

defineProps<{
  product: any;
}>();
</script>
