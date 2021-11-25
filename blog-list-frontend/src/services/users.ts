import axios from "axios";

const baseUrl = "/api/users";

async function getAll(): Promise<IUser[]> {
  const response = await axios.get(baseUrl);
  return response.data;
}

async function create(newUser: IUser) {
  const response = await axios.post(baseUrl, newUser);
  return response.data;
}

export default { getAll, create };
