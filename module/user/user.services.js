import { UserMapper } from "../../models/index.mapper.js";

export async function deleteUser(userId) {
  return UserMapper.deleteUser(userId);
}
