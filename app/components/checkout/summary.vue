<template>
  <Card>
    <CardContent>
      <CardTitle>
        <h3 class="text-2xl font-semibold leading-none tracking-tight">
          Order Summary
        </h3>
      </CardTitle>
      <div class="pt-0 space-y-6">
        <div class="space-y-4 border-b border-border pb-4">
          <h3 class="font-semibold text-sm text-muted-foreground">
            Items ({{ length }})
          </h3>
          <div class="space-y-3 max-h-64 overflow-y-auto">
            <div
              v-for="item in cart"
              :key="`${item.id}-${item.variant}`"
              class="flex gap-3 py-2 border-b border-border/50 last:border-b-0"
            >
              <!-- <div
                class="w-16 h-16 bg-muted rounded-lg flex-shrink-0 flex items-center justify-center"
              >
                <img
                  :src="item.image"
                  :alt="item.product_name"
                  class="w-14 h-14 object-cover rounded"
                />
              </div> -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-foreground truncate">
                  {{ item.product_name }}
                </p>
                <p class="text-xs text-muted-foreground">
                  {{ item.product_variant }} | {{ item.sku }}
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  Qty: {{ item.qty }}
                </p>
                <p class="text-xs text-muted-foreground mt-1">
                  {{ usdFormatter.format(item.price) }}
                </p>
              </div>
              <div class="text-right flex-shrink-0">
                <p class="text-sm font-semibold text-foreground">
                  {{ usdFormatter.format(item.price * item.qty) }}
                </p>
                <Button>
                  <Trash class="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <!-- Price Breakdown -->
        <div class="space-y-3 border-b border-border pb-4">
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Subtotal</span>
            <span class="text-foreground font-semibold">{{
              usdFormatter.format(subtotal)
            }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Shipping</span>
            <span class="text-foreground font-semibold">
              <span v-if="shipping === 0" class="text-green-600">FREE</span>
              <span v-else>{{ usdFormatter.format(shipping) }}</span>
            </span>
          </div>
          <p v-if="shipping === 0" class="text-xs text-green-600">
            Free shipping on orders over $100!
          </p>
          <div class="flex justify-between text-sm">
            <span class="text-muted-foreground">Tax</span>
            <span class="text-foreground font-semibold">{{
              usdFormatter.format(tax)
            }}</span>
          </div>
        </div>

        <!-- Total -->
        <div class="flex justify-between items-center pt-2">
          <span class="text-foreground font-semibold">Total</span>
          <span class="text-3xl font-bold text-foreground">{{
            usdFormatter.format(total)
          }}</span>
        </div>
      </div>
    </CardContent>
  </Card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Button } from "@/components/ui/button";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import { Trash } from "lucide-vue-next";

const props = defineProps<{
  cart: any;
  length: number;
}>();

const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const subtotal = computed(() => {
  return props.cart.reduce(
    (acc: any, item: any) => acc + item.price * item.qty,
    0
  );
});

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 10.0;
});

const tax = computed(() => {
  return subtotal.value * 0.087;
});

const total = computed(() => {
  return subtotal.value + shipping.value + tax.value;
});
</script>
