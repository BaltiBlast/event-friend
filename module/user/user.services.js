import { UserMapper } from "../../models/index.mapper.js";

export async function deleteUser(userId) {
  return UserMapper.deleteUser(userId);
}

export async function updateUser(userId, userData) {
  return UserMapper.updateUser(userId, userData);
}
