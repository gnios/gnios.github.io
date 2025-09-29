#!/usr/bin/env node

// Script para testar o MCP Browser Tools
const http = require('http');

const MCP_SERVER_URL = 'http://localhost:3001';

// Função para enviar erro de teste
function sendTestError(errorData) {
  const postData = JSON.stringify(errorData);
  
  const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/errors',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(postData)
    }
  };

  const req = http.request(options, (res) => {
    console.log(`📤 Status: ${res.statusCode}`);
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
      console.log(`📥 Resposta: ${chunk}`);
    });
  });

  req.on('error', (e) => {
    console.error(`❌ Erro na requisição: ${e.message}`);
  });

  req.write(postData);
  req.end();
}

// Dados de teste
const testErrors = [
  {
    type: 'console_error',
    timestamp: new Date().toISOString(),
    message: 'Erro de JavaScript no console',
    stack: 'Error: Teste de erro\n    at Object.<anonymous> (test.js:1:1)',
    url: 'http://localhost:3000/test'
  },
  {
    type: 'network_error',
    timestamp: new Date().toISOString(),
    message: 'Falha na requisição de rede',
    url: 'http://api.exemplo.com/dados',
    status: 500,
    method: 'GET'
  },
  {
    type: 'unhandled_rejection',
    timestamp: new Date().toISOString(),
    message: 'Promise rejeitada sem tratamento',
    stack: 'UnhandledPromiseRejectionWarning: Error: Falha na operação\n    at Promise.reject (test.js:5:1)'
  },
  {
    type: 'resource_error',
    timestamp: new Date().toISOString(),
    message: 'Falha ao carregar recurso',
    resource: 'https://cdn.exemplo.com/script.js',
    errorType: 'script'
  }
];

console.log('🧪 Iniciando testes do MCP Browser Tools...');
console.log(`🎯 Enviando para: ${MCP_SERVER_URL}/errors`);
console.log('');

// Enviar erros de teste com intervalo
let index = 0;
const interval = setInterval(() => {
  if (index < testErrors.length) {
    const error = testErrors[index];
    console.log(`📤 Enviando erro ${index + 1}/${testErrors.length}: ${error.type}`);
    sendTestError(error);
    index++;
  } else {
    clearInterval(interval);
    console.log('');
    console.log('✅ Testes concluídos!');
    console.log('🌐 Verifique os logs em: http://localhost:8080');
  }
}, 2000);
