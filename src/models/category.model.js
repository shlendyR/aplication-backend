import { pool } from "../db.js";

export async function getAllCategory() {
  try {
    const result = await pool.query("SELECT * FROM Category");
    return result;
  } catch (error) {
    console.error("Error en getAllCategory:", error);
    throw error;
  }
}

export async function getCategoryById(id) {
  try {
    const result = await pool.query(
      "SELECT id, name FROM category WHERE id = $1",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error en getCategoryById:", error);
    throw error;
  }
}

export async function createCategory(data) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO Category (name)
       VALUES ($1) RETURNING *`,
      [data.name]
    );
    return rows[0];
  } catch (error) {
    console.error("Error en createCategory:", error);
    throw error;
  }
}

export async function deleteCategory(id) {
  try {
    const result = await pool.query("DELETE FROM Category WHERE id = $1", [id]);
    return result; // result.rowCount lo usas en el controller
  } catch (error) {
    console.error("Error en deleteCategory:", error);
    throw error;
  }
}

export async function updateCategory(id, data) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error("No se enviaron campos para actualizar.");
    }

    // Crear el SET dinámicamente: name = $1, ...
    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const query = `UPDATE category SET ${setClause} WHERE id = $${
      keys.length + 1
    } RETURNING *`;

    values.push(id); // Añadir el id al final para el WHERE
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error("Error en updateCategory:", error);
    throw error;
  }
}
