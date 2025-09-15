function transformarDados(dados_cidades, tipoDado, ano) {
    const dadosTransformados = [];
    const indices = Object.keys(dados_cidades.STATE);

    for (const index of indices) {
        const nomeComposto = dados_cidades.NAME[index];
        const estado = dados_cidades.STATE[index];
        const valor = dados_cidades[tipoDado + ano][index];

        // Divide o nome pelo hífen. Se não houver hífen,
        // o resultado será um array com um único item.
        const nomesIndividuais = nomeComposto.split('-');

        // Itera sobre cada nome individual (seja um ou vários)
        for (const nome of nomesIndividuais) {
            dadosTransformados.push({
                name: nome.trim(), // .trim() remove espaços em branco extras
                state: estado,
                value: valor
            });
        }
    }
    return dadosTransformados;
}

function get_dados_state(state, dados_cidades, tipoDado, ano) {
    const listaDeCidades = transformarDados(dados_cidades, tipoDado, ano);

    console.log(listaDeCidades)

    const cidadesDoEstado = listaDeCidades.filter(cidade => {
        return cidade.state === state;
    });

    return cidadesDoEstado;
}