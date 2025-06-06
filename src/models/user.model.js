import { pool } from "../db.js";

export async function getAllUsers() {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result;
  } catch (error) {
    console.error("Error en getAllUsers:", error);
    throw error;
  }
}

export async function getUserById(id) {
  try {
    const result = await pool.query(
      "SELECT name, email, phone, birthdate, id_rol FROM users WHERE id = $1",
      [id]
    );
    return result;
  } catch (error) {
    console.error("Error en getUserById:", error);
    throw error;
  }
}

export async function createUser(data) {
  try {
    const { rows } = await pool.query(
      `INSERT INTO users (name, email, password, phone, birthdate, id_rol)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        data.name,
        data.email,
        data.password,
        data.phone,
        data.birthdate,
        data.id_rol,
      ]
    );
    return rows[0];
  } catch (error) {
    console.error("Error en createUser:", error);
    throw error;
  }
}

export async function deleteUser(id) {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1", [id]);
    return result; // result.rowCount lo usas en el controller
  } catch (error) {
    console.error("Error en deleteUser:", error);
    throw error;
  }
}

export async function updateUser(id, data) {
  try {
    const keys = Object.keys(data);
    const values = Object.values(data);

    if (keys.length === 0) {
      throw new Error("No se enviaron campos para actualizar.");
    }

    const setClause = keys.map((key, idx) => `${key} = $${idx + 1}`).join(", ");
    const query = `UPDATE users SET ${setClause} WHERE id = $${
      keys.length + 1
    } RETURNING *`;

    values.push(id);
    const result = await pool.query(query, values);
    return result;
  } catch (error) {
    console.error("Error en updateUser:", error);
    throw error;
  }
}
