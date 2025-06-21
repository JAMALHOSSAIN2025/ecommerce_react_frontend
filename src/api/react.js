# src/api/auth.js

export const getCurrentUser = async (accessToken) => {
    try {
        const response = await fetch("http://127.0.0.1:8000/accounts/api/me/", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user info");
        }

        return await response.json();
    } catch (error) {
        console.error("User Info Error:", error);
        return null;
    }
};
