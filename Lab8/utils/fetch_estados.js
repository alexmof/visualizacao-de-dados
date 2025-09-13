// Adicione "return" aqui para que a função retorne a Promise
function fetchEstadosJson(stateName) {
    return fetch(`./maps/${stateName}/index.json`) // <<--- A ÚNICA MUDANÇA É AQUI
        .then(response => {
            if (!response.ok) {
                throw new Error(`Não foi possível encontrar o índice para o estado: ${stateName}`);
            }
            return response.json();
        })
        .then(cityFiles => {
            const promises = cityFiles.map(fileName =>
                fetch(`./maps/${stateName}/${fileName}`)
                    .then(res => res.json())
            );
            return Promise.all(promises);
        })
        .then(arrayOfCityGeoJsons => {
            const combinedFeatures = arrayOfCityGeoJsons.reduce((accumulator, currentGeoJson) => {
                return accumulator.concat(currentGeoJson.features || []);
            }, []);

            const combinedGeoJson = {
                type: 'FeatureCollection',
                features: combinedFeatures
            };

            // Este return agora resolve a Promise que a função principal retornou
            return combinedGeoJson;
        })
        .catch(error => {
            console.error("Ocorreu um erro no processo:", error);
            // É uma boa prática relançar o erro para que o código que chamou a função saiba que algo deu errado
            throw error;
        });
}