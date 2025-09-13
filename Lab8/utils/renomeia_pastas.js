// Importa os módulos 'fs' (File System) e 'path' do Node.js
// Usamos '.promises' para trabalhar com a versão moderna baseada em Promises
const fs = require('fs').promises;
const path = require('path');

/**
 * Renomeia as pastas em um diretório-pai das siglas dos estados dos EUA
 * para seus nomes completos em inglês.
 *
 * Exemplo: 'tx' será renomeado para 'Texas'.
 *
 * @param {string} parentDirectory O caminho para o diretório que contém as pastas
 * dos estados. O padrão é o diretório atual.
 */
async function renameStateFolders(parentDirectory = '../maps') {
    const stateMap = {
        'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas', 'CA': 'California',
        'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware', 'FL': 'Florida', 'GA': 'Georgia',
        'HI': 'Hawaii', 'ID': 'Idaho', 'IL': 'Illinois', 'IN': 'Indiana', 'IA': 'Iowa',
        'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana', 'ME': 'Maine', 'MD': 'Maryland',
        'MA': 'Massachusetts', 'MI': 'Michigan', 'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri',
        'MT': 'Montana', 'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey',
        'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 'OH': 'Ohio',
        'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pennsylvania', 'RI': 'Rhode Island', 'SC': 'South Carolina',
        'SD': 'South Dakota', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont',
        'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 'WY': 'Wyoming',
        'DC': 'District of Columbia', 'PR': 'Puerto Rico'
    };

    // path.resolve transforma o caminho relativo (como '.') em um caminho absoluto
    const absolutePath = path.resolve(parentDirectory);
    console.log(`Procurando por pastas no diretório: '${absolutePath}'\n`);

    let renamedCount = 0;
    let skippedCount = 0;

    try {
        // Lê todos os itens (arquivos e pastas) do diretório
        const items = await fs.readdir(parentDirectory);

        // Usamos um loop for...of para poder usar await dentro dele
        for (const currentName of items) {
            const oldPath = path.join(parentDirectory, currentName);
            
            try {
                // Pega as informações do item (para saber se é um diretório)
                const stats = await fs.stat(oldPath);

                if (stats.isDirectory()) {
                    // Converte o nome para maiúsculas para corresponder às chaves do mapa
                    const key = currentName.toUpperCase();

                    if (stateMap[key]) {
                        const newName = stateMap[key];
                        const newPath = path.join(parentDirectory, newName);

                        // Medida de segurança: verifica se um diretório com o novo nome já existe
                        try {
                            await fs.access(newPath);
                            // Se o comando acima não der erro, o arquivo/pasta já existe
                            console.log(`-> Atenção: A pasta '${currentName}' não foi renomeada porque '${newName}' já existe.`);
                            skippedCount++;
                        } catch (error) {
                            // Se deu erro, significa que o caminho NÃO existe e podemos renomear
                            await fs.rename(oldPath, newPath);
                            console.log(`✅ Sucesso: '${currentName}' foi renomeado para '${newName}'`);
                            renamedCount++;
                        }
                    }
                }
            } catch (err) {
                console.log(`❌ Erro ao processar '${currentName}': ${err.message}`);
                skippedCount++;
            }
        }

    } catch (error) {
        console.error(`❌ Erro Crítico: Não foi possível ler o diretório '${absolutePath}'. Verifique se o caminho está correto.`);
        console.error(error);
        return; // Encerra a função se o diretório não puder ser lido
    }
    
    console.log("\n--- Concluído! ---");
    console.log(`Pastas renomeadas: ${renamedCount}`);
    console.log(`Pastas ignoradas ou com erro: ${skippedCount}`);
}

// Para executar o script, chame a função.
// O script irá rodar no mesmo diretório onde ele está localizado.
// Se as pastas estiverem em outro lugar, altere o caminho na chamada da função.
// Exemplo: renameStateFolders('/caminho/para/suas/pastas');
renameStateFolders();