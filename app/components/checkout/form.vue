<template>
  <Card>
    <CardContent>
      <div class="pb-4">
        <h3 class="text-2xl font-semibold leading-none tracking-tight">
          Shipping Information
        </h3>
      </div>
      <div class="pt-0 space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2"
              >First Name</label
            >
            <input
              v-model="props.formData.firstName"
              type="text"
              placeholder="John"
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2"
              >Last Name</label
            >
            <input
              v-model="props.formData.lastName"
              type="text"
              placeholder="Doe"
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-2"
            >Email</label
          >
          <input
            v-model="props.formData.email"
            type="email"
            placeholder="john@example.com"
            class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-foreground mb-2"
            >Address</label
          >
          <input
            v-model="props.formData.address"
            type="text"
            placeholder="123 Main St"
            class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        <div class="grid grid-cols-3 gap-4">
          <div>
            <label class="block text-sm font-medium text-foreground mb-2"
              >City</label
            >
            <input
              v-model="props.formData.city"
              type="text"
              placeholder="New York"
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2"
              >State</label
            >
            <input
              v-model="props.formData.state"
              type="text"
              placeholder="NY"
              class="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-foreground mb-2"
              >ZIP Code</label
            >
            <input
              v-model="props.formData.zipCode"
              type="text"
              placeholder="10001"
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
