<template>
  <Card>
    <CardContent>
      <div class="pb-4">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">
          Payment Information
        </h3>
      </div>
      <div class="pt-0 space-y-4">
        <div>
          <label class="block text-sm font-medium text-foreground mb-2"
            >Card Number</label
          >
          <input
            v-model="props.formData.cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2"
              >Expiry Date</label
            >
            <input
              v-model="props.formData.expiryDate"
              type="text"
              placeholder="MM/YY"
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2"
              >CVC</label
            >
            <input
              v-model="props.formData.cvc"
              type="text"
              placeholder="123"
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
<script setup lang="ts">
import { Card, CardContent } from "@/components/ui/card";

const props = defineProps<{
  formData: any;
}>();
</script>
