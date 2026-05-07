export const DATABASES = [
  {
    name: "my_database",
    url: "postgresql://user:password@localhost:5432/my_database",
  },
  {
    name: "my_database_2",
    url: "postgresql://user:password@localhost:5432/my_database_2",
  },
  {
    name: "my_database_3",
    url: "postgresql://user:password@localhost:5432/my_database_3",
  },
  {
    name: "my_database_4",
    url: "postgresql://user:password@localhost:5432/my_database_4",
  },
  {
    name: "my_database_5",
    url: "postgresql://user:password@localhost:5432/my_database_5",
  },
];

export const TABLES = [
  "users",
  "orders",
  "products",
  "categories",
  "customers",
];

export const COLUMNS = {
  users: ["id", "name", "email", "created_at"],
  orders: ["id", "user_id", "product_id", "quantity", "created_at"],
  products: ["id", "name", "price", "category_id"],
  categories: ["id", "name"],
  customers: ["id", "name", "email"],
};
