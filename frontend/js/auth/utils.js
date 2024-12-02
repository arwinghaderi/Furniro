import { getToken } from "../func/utils";
export const getingUaerInformation = async () => {
    const token = getToken()
    console.log(token);
    if (!token) {
        return false
    }

    const response = await fetch(`http://localhost:3000/user/api/get-user-info`, {
        headers: {
            Authorization: `bearer ${token}`
        }
    })

    let data = await response.json()
    console.log(data);
    return data
}