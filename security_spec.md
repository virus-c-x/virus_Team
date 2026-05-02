# Security Specification - NEON Digital Experience

## Data Invariants
1. **Site Content**: Publicly readable, writeable only by authorized admins.
2. **Products**: Publicly readable, managed exclusively by admins.
3. **Orders**: 
   - Anyone can create an order (submission).
   - Only admins can list, read individual orders, or update statuses.
   - Orders must have a "pending" status initially.
   - All fields must be within size limits to prevent storage attacks.

## The "Dirty Dozen" Payloads (Denial Expected)
1. Guest attempts to update `siteContent`.
2. Guest attempts to read `orders` collection.
3. Guest attempts to delete a product.
4. Guest submits an order with an "already done" status.
5. User attempts to submit an order with a 1MB string in the name field.
6. Guest attempts to write to a collection that doesn't exist (Catch-all deny).
7. Admin attempts to delete an order (if we decide orders are immutable/archived only).
8. Submission with missing required fields (email).
9. Submission with invalid email format.
10. Submission with negative numbers in "age".
11. Submission with injected "isAdmin: true" field in a user profile.
12. Attempting to update the `timestamp` of an existing order.
