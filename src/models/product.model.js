import { pool } from "../db.js";

export async function getProductsByCategory(categoryId) {
  try {
    const result = await pool.query(
      `SELECT 
         id,             -- id del producto
         description,
         price_sale,
         cost_price,
         stock,
         id_category,
         id_supplier
       FROM product
       WHERE id_category = $1`,
      [categoryId]
    );
    return result;
  } catch (error) {
    console.error("Error en getProductsByCategoryModel:", error);
    throw error;
  }
}
