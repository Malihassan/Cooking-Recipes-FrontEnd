import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: "https://henday-cooking-recipes-server.herokuapp.com",
});