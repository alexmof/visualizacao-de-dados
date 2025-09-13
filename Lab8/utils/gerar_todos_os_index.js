// usar "import" é a sintaxe de Módulos ES (ESM)
import fs from "fs";
import path from "path";

// --- INÍCIO DO SCRIPT ---

console.log("Iniciando a geração de arquivos index.json...");

// Pega o diretório onde o script foi executado
const diretorioPai = process.cwd();
let pastasProcessadas = 0;
let pastasIgnoradas = 0;

try {
  // 1. Lê todos os itens no diretório pai
  const todosOsItens = fs.readdirSync(diretorioPai);

  // 2. Itera sobre cada item encontrado
  for (const nomeDoItem of todosOsItens) {
    const caminhoDoItem = path.join(diretorioPai, nomeDoItem);

    // 3. Verifica se o item é uma pasta (diretório)
    const stats = fs.statSync(caminhoDoItem);
    if (stats.isDirectory()) {
      try {
        // --- Lógica do seu script original, aplicada a cada pasta ---

        // 4. Lê os arquivos dentro da subpasta
        const arquivosNaPasta = fs.readdirSync(caminhoDoItem);

        // 5. Filtra para pegar apenas arquivos .json, ignorando um possível index.json antigo
        const arquivosJson = arquivosNaPasta.filter(
          (f) => f.endsWith(".json") && f !== "index.json"
        );
        
        // 6. Se encontrou arquivos .json, cria o index.json
        if (arquivosJson.length > 0) {
          const caminhoDoIndex = path.join(caminhoDoItem, "index.json");
          
          fs.writeFileSync(
            caminhoDoIndex,
            JSON.stringify(arquivosJson, null, 2), // O 'null, 2' formata o JSON para ficar legível
            "utf-8"
          );

          console.log(`✅ index.json criado em '${nomeDoItem}' com ${arquivosJson.length} arquivos.`);
          pastasProcessadas++;
        } else {
          console.log(`-> Ignorando '${nomeDoItem}': Nenhum arquivo .json encontrado.`);
          pastasIgnoradas++;
        }
      } catch (err) {
        console.error(`❌ Erro ao processar a pasta '${nomeDoItem}':`, err.message);
        pastasIgnoradas++;
      }
    }
  }

  console.log("\n--- Processo Concluído! ---");
  console.log(`Total de pastas processadas com sucesso: ${pastasProcessadas}`);
  console.log(`Total de pastas ignoradas ou com erro: ${pastasIgnoradas}`);

} catch (err) {
  console.error("❌ Erro fatal ao ler o diretório principal:", err.message);
}