# INVENTORY-MANAGEMENT

## MongoDB Database: `INVENTORY_MANAGEMENT`

---

### 1. Collection: `users`

| Field     | Type     | Notes                        |
|-----------|----------|------------------------------|
| name      | String   |                              |
| email     | String   | unique, indexed              |
| password  | String   | hashed                       |
| createdAt | Date     |                              |
| updatedAt | Date     |                              |

---

### 2. Collection: `categories`

| Field        | Type     | Notes                |
|--------------|----------|----------------------|
| name         | String   | unique               |
| slug         | String   | unique, indexed      |
| description  | String   |                      |
| status       | String   | "Active" \| "Inactive" |
| createdAt    | Date     |                      |

---

### 3. Collection: `customers`

| Field         | Type     | Notes                  |
|---------------|----------|------------------------|
| name          | String   |                        |
| email         | String   |                        |
| phone         | String   |                        |
| company       | String   |                        |
| panVat        | String   | PAN / VAT number       |
| address       | String   |                        |
| city          | String   |                        |
| country       | String   |                        |
| totalOrders   | Number   |                        |
| totalSpent    | Number   |                        |
| status        | String   | "Active" \| "Inactive"  |
| lastOrderDate | Date     |                        |
| createdAt     | Date     |                        |

---

### 4. Collection: `products`

| Field        | Type     | Notes                        |
|--------------|----------|------------------------------|
| name         | String   |                              |
| sku          | String   | unique                       |
| barcode      | String   | optional                     |
| hsnCode      | String   | optional                     |
| category     | ObjectId | ref: categories              |
| costPrice    | Number   | CP                           |
| sellingPrice | Number   | SP                           |
| discount     | Number   | percentage (0–100)           |
| stock        | Number   | current quantity on hand     |
| minStock     | Number   | low-stock threshold          |
| description  | String   |                              |
| status       | String   | "In Stock" \| "Low Stock" \| "Out of Stock" |
| createdAt    | Date     |                              |
| updatedAt    | Date     |                              |

---

### 5. Collection: `settings`

| Field         | Type   | Notes                                  |
|---------------|--------|----------------------------------------|
| storeName     | String |                                        |
| storeEmail    | String |                                        |
| storePhone    | String |                                        |
| storeAddress  | String |                                        |
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
| status          | String   | "Pending" \| "Processing" \| "Shipped" \| "Delivered" \| "Cancelled" \| "Returned" |
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

### Notes

- **Returns / Reverse:** When a delivered order is returned, the product stock should be incremented back. This can be handled by either:
  - Creating a separate `returns` collection to track return transactions, or
  - Marking the order status as "Returned" and using a middleware/hook to restore stock.
- **Inventory preview:** Products should have a **BUY** (purchase from supplier) and **SELL** (sell to customer) action in the UI. Buying increases stock at CP, selling decreases stock at SP.
