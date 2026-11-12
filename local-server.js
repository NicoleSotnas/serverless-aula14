// Aula 14: simula localmente o ambiente Serverless
// (sem vercel dev / netlify dev), para medir o TTFB do
// cenário "Ambiente Local" da atividade.
import http from "http";
import handler from "./api/hora.js";
const PORTA = 4000;
// Adapta o res do Node puro para o formato da Vercel:
// res.status(codigo).json(corpo)
function criarRespostaCompativel(res) {
  return {
    status(codigo) {
      res.statusCode = codigo;
      return {
        json(corpo) {
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(corpo));
        },
      };
    },
  };
}
http
  .createServer((req, res) => {
    if (req.url !== "/api/hora") {
      res.statusCode = 404;
      res.end("Rota não encontrada");
      return;
    }
    handler(req, criarRespostaCompativel(res));
  })
  .listen(PORTA, () => {
    console.log(`Função rodando em http://localhost:${PORTA}/api/hora`);
  });
