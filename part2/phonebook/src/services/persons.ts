import axios from "axios";
import { IPerson } from "../App";

import { IFormInfo } from "../components/Form";

const baseUrl = "http://localhost:3001/persons";

async function getAllPeople(): Promise<IPerson[]> {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}
async function create(newPersonInfo: IFormInfo): Promise<IPerson> {
  const request = axios.post(baseUrl, newPersonInfo);
  return request.then((response) => response.data);
}

async function update(id: number, newPersonInfo: IFormInfo): Promise<IPerson> {
  const request = axios.put(`${baseUrl}/${id}`, newPersonInfo);
  return request.then((response) => response.data);
}

export { getAllPeople, create, update };
