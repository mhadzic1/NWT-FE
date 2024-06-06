import {jwtDecode} from "jwt-decode";
import {resolve} from "../resolver";
import {getEmailByUserId} from "../user/userAPI"
import api from "../api";
import {acceptEmail} from "./emails";
import {denyEmail} from "./emails"

export async function sendEmail(to, body, type, username) {
    const token = sessionStorage.getItem('token');
    if (!token) {
        console.error('No token found');
        return false;
    }

    try {
        const decodedToken = jwtDecode(token);
        const user = decodedToken.sub;
        body = {
            "to": to,
            "subject": type === "APPROVED" ? "Your request has been accepted!" : "Your request has been rejected",
            "body": type === "APPROVED" ? acceptEmail(username) : denyEmail(username),
            isHtml: true
        };
        console.log('Request body:', body);

        return await resolve(
            api.post('http://localhost:8080/send-email', body, {
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                }
            })
        );
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
}