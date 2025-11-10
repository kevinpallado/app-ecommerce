<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <NuxtLink
      to="/products"
      class="inline-flex items-center gap-2 mb-6 text-primary hover:underline"
    >
      <ArrowLeft class="h-4 w-4" />
      Back to Products
    </NuxtLink>

    <h1 class="text-4xl font-bold text-foreground mb-8">Checkout</h1>

    <!-- Success Message -->
    <div
      v-if="orderSuccess"
      class="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-md"
    >
      Order placed successfully! Order ID: {{ orderId }}
    </div>

    <!-- Error Message -->
    <div
      v-if="errorMessage"
      class="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md"
    >
      {{ errorMessage }}
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="lg:col-span-2 space-y-6">
        <CheckoutForm :formData="formData" />
        <CheckoutPayment :formData="formData" />
        <Button
          @click="handleSubmit"
          :disabled="isSubmitting"
          class="w-full py-6 text-lg gap-2 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:bg-primary/90 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span v-if="isSubmitting">Processing...</span>
          <span v-else>Place Order</span>
        </Button>
      </div>

      <!-- Order Summary -->
      <CheckoutSummary
        :cart="cart"
        :length="cart.length"
        v-if="cart.length > 0"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-vue-next";
import { cart } from "~/lib/api/cart";

const formData = ref({
  firstName: "",
  lastName: "",
  email: "",
  address: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  cardNumber: "",
  expiryDate: "",
  cvc: "",
});

const isSubmitting = ref(false);
const orderSuccess = ref(false);
const orderId = ref(null);
const errorMessage = ref("");

const handleSubmit = async () => {
  // Reset states
  orderSuccess.value = false;
  errorMessage.value = "";
  isSubmitting.value = true;

  try {
    // Validate form data
    if (
      !formData.value.firstName ||
      !formData.value.lastName ||
      !formData.value.email
    ) {
      errorMessage.value = "Please fill in all required fields";
      isSubmitting.value = false;
      return;
    }

    if (cart.length === 0) {
      errorMessage.value = "Your cart is empty";
      isSubmitting.value = false;
      return;
    }

    // Prepare the payload
    const payload = {
      user_id: 1, // You should replace this with actual user ID from your auth system
      name: `${formData.value.firstName} ${formData.value.lastName}`,
      email: formData.value.email,
      phone_number: formData.value.phoneNumber || "",
      street_address: formData.value.address,
      city: formData.value.city,
      state_province: formData.value.state,
      postal: formData.value.zipCode,
      cart: cart.map((item) => ({
        qty: item.qty || item.quantity || 1,
        sku: item.sku || "",
        product_id: item.product_id || item.id,
        variant_name: item.variant_name || "",
        variant_id: item.variant_id || null,
        product_name: item.product_name || item.name,
        price: item.price,
      })),
    };

    console.log("Submitting order:", payload);

    const config = useRuntimeConfig();

    // Make the POST request
    const response = await fetch(`${config.public.CHECKOUT_URL}/api/shopping`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const result = await response.json();
    console.log("Order response:", result);

    // Handle success
    orderSuccess.value = true;
    orderId.value = result.order_id || result.id || "N/A";

    // Clear form and cart after successful order
    setTimeout(() => {
      // Clear form data
      formData.value = {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phoneNumber: "",
        cardNumber: "",
        expiryDate: "",
        cvc: "",
      };

      // Clear cart (adjust based on your cart implementation)
      if (typeof cart.splice === "function") {
        cart.splice(0, cart.length);
      }
    }, 2000);
  } catch (error) {
    console.error("Order submission error:", error);
    errorMessage.value =
      error.message || "Failed to place order. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Add any component-specific styles here if needed */
</style>
