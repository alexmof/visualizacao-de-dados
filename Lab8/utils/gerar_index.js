import fs from "fs";
import path from "path";

try {
  const pastaArg = process.argv[2];
  if (!pastaArg) {
    console.error("⚠️  Uso: node gerar-index.js <nome-da-pasta>");
    process.exit(1);
  }

  const pasta = path.resolve(process.cwd(), pastaArg);
  const arquivos = fs.readdirSync(pasta).filter(f => f.endsWith(".json"));

  fs.writeFileSync(
    path.join(pasta, "index.json"),
    JSON.stringify(arquivos, null, 2),
    "utf-8"
  );

  console.log(`✅ index.json criado em ${pasta} com ${arquivos.length} arquivos.`);
} catch (err) {
  console.error("❌ Erro:", err.message);
}
