import axios from "axios";

// const baseUrl = "https://fullstackopen-project.onrender.com/api/persons";
// const baseUrl = "http://localhost:5000/api/persons";

const getAll = () => {
	const request = axios.get(baseUrl);
	return request.then((res) => res.data);
};

const create = (newObject) => {
	const request = axios.post(baseUrl, newObject);
	return request.then((res) => res.data);
};

const deleteUser = (id) => {
	const request = axios.delete(`${baseUrl}/${id}`);
	request.then((res) => res.data);
};

const update = (id, newObject) => {
	const request = axios.put(`${baseUrl}/${id}`, newObject);
	return request.then((res) => res.data);
};

export { getAll, create, update, deleteUser };
