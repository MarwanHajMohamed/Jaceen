import axios from "axios";

const AUTHORIZE_NET_API_URL = process.env.AUTHORIZE_NET_API_URL || 
                             "https://apitest.authorize.net/xml/v1/request.api";

export const authorizeNetApi = axios.create({
    baseURL: AUTHORIZE_NET_API_URL,
    headers: { "Content-Type": "application/json" }
});
