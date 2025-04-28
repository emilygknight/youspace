import jwtDecode from "jwt-decode";

function getUserIdFromJWT(jwtToken) {
    if (!jwtToken) return null;
    try {
        const decodedToken = jwtDecode(jwtToken);
        return decodedToken.authenticatedPerson?._id || decodedToken.userId || decodedToken.id || null;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
}

export default getUserIdFromJWT;