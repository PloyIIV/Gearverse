const CART_API = "/api/v1/shoppingcart";
const USER_ID_KEY = "gearverseUserId";

//แปลงจากเอกสาร MongoDB (snake_case) เป็น shape ที่ React แสดงผล (camelCase)
function toFrontendItem(item) {
  return {
    id: item.product_id || item._id,
    name: item.product_name,
    tag: item.tag ?? "",
    unitPrice: item.unit_price,
    quantity: item.quantity,
    delivery: item.delivery ?? "",
    image: item.image ?? "",
  };
}

//แปลงจาก shape ของ React (camelCase) ไปเป็นเอกสาร MongoDB (snake_case)
function toBackendItem(item) {
  return {
    product_id: item.id,
    product_name: item.name,
    tag: item.tag ?? "",
    unit_price: item.unitPrice,
    quantity: item.quantity,
    delivery: item.delivery ?? "",
    image: item.image ?? "",
  };
}

async function resolveUserId() {
  const saved = localStorage.getItem(USER_ID_KEY);
  if (saved) return saved;

  try {
    const res = await fetch("/api/v1/users");
    const result = await res.json();
    const firstUser = (result.data ?? [])[0];
    if (!firstUser) return null;

    localStorage.setItem(USER_ID_KEY, firstUser._id);
    return firstUser._id;
  } catch {
    return null;
  }
}

export async function fetchCart() {
  const userId = await resolveUserId();
  if (!userId) return null;

  try {
    const res = await fetch(`${CART_API}/${userId}`);
    const result = await res.json();
    const cart = result.data ?? null;
    if (!cart) return null;
    return cart.items.map(toFrontendItem);
  } catch {
    return null;
  }
}

export async function syncCart(items) {
  const userId = await resolveUserId();
  if (!userId) return null;

  try {
    const res = await fetch(`${CART_API}/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: items.map(toBackendItem) }),
    });
    const result = await res.json();
    return result.data ?? null;
  } catch {
    return null;
  }
}