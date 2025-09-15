
async function fetchData(jsonPath) {
    try {
        const response = await fetch('./df_estado.json');

        if (!response.ok) {
            throw new Error('Erro ao carregar dados: ' + response.statusText);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Falha ao buscar os dados:", error);
        return null;
    }
};