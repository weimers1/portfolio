export async function executeFetch(url, headers = {}, method = 'GET') {
    try {
        const response = await fetch(url, {
            method: method,
            headers: headers,
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(
                `Fetch API error: ${response.status} - ${
                    errorData.message || response.statusText
                }`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        // @TODO: email errors
        console.error('Error fetching data:', error);
        throw error;
    }
}

export function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
