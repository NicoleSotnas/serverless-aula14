// Formato Netlify Functions: (event, context) e retorno
// { statusCode, body }. Mesmo conteúdo da função da Vercel.
export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      hora: new Date().toISOString(),
      localizacaoServidor: process.env.AWS_REGION || "local (sem deploy)",
    }),
  };
}
