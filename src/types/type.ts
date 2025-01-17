export interface IUser {
  id: string; // User's unique identifier
  name: string; // Full name
  email: string; // Email address
  password: string; // Hashed password
  createdAt: Date; // Account creation date
  updatedAt: Date; // Account last updated date
}
