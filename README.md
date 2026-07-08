# INVENTORY-MANAGEMENT

## MongoDB Database: `INVENTORY_MANAGEMENT`

---

### 1. Collection: `users`

| Field     | Type     | Notes                   |
|-----------|----------|-------------------------|
| name      | String   |                         |
| email     | String   | unique, indexed         |
| password  | String   | hashed                  |
| createdAt | Date     |                         |
| updatedAt | Date     |                         |

---

### 2. Collection: `categories`

| Field        | Type     | Notes                  |
|--------------|----------|------------------------|
| name         | String   | unique                 |
| barcode      | String   | unique, optional       |
| description  | String   |                        |
| status       | String   | "Active" \| "Inactive"  |
| createdAt    | Date     |                        |

> When creating/updating a product, if the provided category name exists it will be reused; otherwise a new category document is created on the fly.

---

### 3. Collection: `customers`

| Field         | Type     | Notes                        |
|---------------|----------|------------------------------|
| name          | String   |                              |
| email         | String   |                              |
| phone         | String   |                              |
| company       | String   |                              |
| panVat        | String   | PAN / VAT number             |
| address       | String   |                              |
| city          | String   |                              |
| country       | String   |                              |
| totalOrders   | Number   | count of orders placed       |
| totalSpent    | Number   | cumulative spend             |
| lastOrderDate | Date     | date of most recent order    |
| createdAt     | Date     |                              |

> Each order is linked to a customer via `customer` (ObjectId ref). When an order is placed, `totalOrders`, `totalSpent`, and `lastOrderDate` on the customer document are updated accordingly.

---

### 4. Collection: `products`

| Field        | Type     | Notes                                          |
|--------------|----------|------------------------------------------------|
| name         | String   |                                                |
| barcode      | String   | unique, optional                               |
| sku          | String   | unique                                         |
| hsnCode      | String   | optional                                       |
| category     | ObjectId | ref: categories                                |
| costPrice    | Number   | CP                                             |
| sellingPrice | Number   | SP                                             |
| discount     | Number   | percentage (0–100)                             |
| stock        | Number   | current quantity on hand                       |
| minStock     | Number   | low-stock threshold                            |
| description  | String   |                                                |
| status       | String   | "In Stock" \| "Low Stock" \| "Out of Stock"     |
| createdAt    | Date     |                                                |
| updatedAt    | Date     |                                                |

---

### 5. Collection: `settings` (Singleton)

| Field         | Type   | Notes                                  |
|---------------|--------|----------------------------------------|
| storeName     | String |                                        |
| storeEmail    | String |                                        |
| systemTheme   | String | e.g. "light", "dark"                   |
| storeAddress  | String |                                        |
| storePhone    | String |                                        |
| currency      | String | e.g. "NPR", "USD"                      |
| taxRate       | Number | default tax percentage                 |
| lowStockAlert | Number | global low-stock threshold             |
| createdAt     | Date   |                                        |
| updatedAt     | Date   |                                        |

> Singleton collection — only one document for the whole app.

---

### 6. Collection: `orders`

| Field           | Type     | Notes                                      |
|-----------------|----------|--------------------------------------------|
| customer        | ObjectId | ref: customers                             |
| customerName    | String   | snapshot from customer at time of order    |
| customerPhone   | String   | snapshot from customer at time of order    |
| customerEmail   | String   | snapshot from customer at time of order    |
| items           | Array    | see below — snapshot of product data       |
| total           | Number   |                                            |
| status          | String   | "Ordered" \| "Cancelled"                    |
| shippingAddress | String   |                                            |
| paymentMethod   | String   |                                            |
| createdAt       | Date     |                                            |
| updatedAt       | Date     |                                            |

**OrderItem sub-document (snapshot of product at time of order):**

| Field      | Type     | Notes                  |
|------------|----------|------------------------|
| productId  | ObjectId | ref: products          |
| name       | String   | snapshot               |
| sku        | String   | snapshot               |
| quantity   | Number   |                        |
| costPrice  | Number   | CP at time of order    |
| sellPrice  | Number   | SP at time of order    |
| discount   | Number   | discount applied       |

> When placing an order, customer details and product details are **snapshotted** (denormalized) into the order document. This ensures the order record is preserved even if customer or product data changes later.

---

### Business Logic: Order Lifecycle & Stock Sync

- **Order Placed (`status: "Ordered"`):** Each product's `stock` is **decremented** by the ordered quantity. The customer's `totalOrders`, `totalSpent`, and `lastOrderDate` are updated.
- **Order Cancelled (`status: "Cancelled"`):** Each product's `stock` is **incremented** back by the cancelled quantity. The customer's `totalOrders` and `totalSpent` remain as-is (the order is still counted, but the stock is restored).
- **Low-Stock Status:** After any stock change, the product's `status` is recalculated — if `stock <= 0` it becomes `"Out of Stock"`; if `stock <= minStock` it becomes `"Low Stock"`; otherwise `"In Stock"`.
