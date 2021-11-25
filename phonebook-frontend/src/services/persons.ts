import axios from "axios";

import { IPerson } from "../App";

import { IFormInfo } from "../components/Form";

require("dotenv").config();

const baseUrl =
  process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/api/persons";

async function getAllPeople(): Promise<IPerson[]> {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
}
async function createPerson(newPersonInfo: IFormInfo): Promise<IPerson> {
  const request = axios.post(baseUrl, newPersonInfo);
  return request.then((response) => response.data);
}

async function updatePerson(
  id: string,
  newPersonInfo: IFormInfo
): Promise<IPerson> {
  const request = axios.put(`${baseUrl}/${id}`, newPersonInfo);
  return request.then((response) => response.data);
}

async function deletePerson(id: string): Promise<any> {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
}

export { getAllPeople, createPerson, updatePerson, deletePerson };
