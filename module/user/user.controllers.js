import { deleteUser, updateUser } from "./user.services.js";

export async function removeUser(req, res) {
  try {
    const deletedUser = await deleteUser(req.params.userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.status(200).json({ message: "Utilisateur supprime" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}

export async function updateUserById(req, res) {
  try {
    const updatedUser = await updateUser(req.params.userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "Utilisateur introuvable" });
    }

    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
}
