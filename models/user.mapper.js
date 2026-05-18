import CoreMapper from "./core.mapper.js";
import userSchema from "../schemas/user.schemas.js";

class User extends CoreMapper {
  constructor(mongoose) {
    super(mongoose);
    this.model = this.mongoose.models.User || this.mongoose.model("User", userSchema);
  }

  async createUser(userData) {
    return this.model.create(userData);
  }

  async deleteUser(userId) {
    return this.model.findByIdAndDelete(userId);
  }

  async updateUser(userId, userData) {
    return this.model.findByIdAndUpdate(userId, userData, {
      new: true,
      runValidators: true,
    });
  }

  async getUser(userId) {
    return this.model.findById(userId);
  }
}

export default User;
