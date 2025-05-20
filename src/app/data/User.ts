export interface User {
  createdAt: string;
  email: string;
  name: string;
  role: Roles
  updatedAt: string;
}
enum Roles {
  admin = "admin",
  user = "user"
}
