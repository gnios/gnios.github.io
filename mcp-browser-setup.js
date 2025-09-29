#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando MCP Browser Tools...');

// Configuração do MCP Server
const mcpConfig = {
  name: 'browser-tools',
  version: '1.0.0',
  description: 'MCP Server para capturar erros do browser',
  capabilities: {
    browser: {
      captureConsoleErrors: true,
      captureNetworkErrors: true,
      captureUnhandledRejections: true,
      captureResourceErrors: true
    }
  }
};

// Função para capturar erros do console
function captureConsoleErrors() {
  console.log('📊 Configurando captura de erros do console...');
  
  // Interceptar console.error
  const originalError = console.error;
  console.error = function(...args) {
    const errorData = {
      type: 'console_error',
      timestamp: new Date().toISOString(),
      message: args.join(' '),
      stack: new Error().stack
    };
    
    // Enviar para o MCP server
    process.send && process.send({ type: 'error', data: errorData });
    
    // Chamar o console.error original
    originalError.apply(console, args);
  };
}

// Função para capturar erros não tratados
function captureUnhandledErrors() {
  console.log('⚠️  Configurando captura de erros não tratados...');
  
  process.on('uncaughtException', (error) => {
    const errorData = {
      type: 'uncaught_exception',
      timestamp: new Date().toISOString(),
      message: error.message,
      stack: error.stack
    };
    
    console.error('Erro não capturado:', errorData);
    process.send && process.send({ type: 'error', data: errorData });
  });
  
  process.on('unhandledRejection', (reason, promise) => {
    const errorData = {
      type: 'unhandled_rejection',
      timestamp: new Date().toISOString(),
      message: reason.toString(),
      stack: reason.stack || 'No stack trace available'
    };
    
    console.error('Promise rejeitada:', errorData);
    process.send && process.send({ type: 'error', data: errorData });
  });
}

// Função para iniciar o servidor MCP
function startMCPServer() {
  console.log('🌐 Iniciando servidor MCP na porta 3001...');
  
  const server = require('http').createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/errors') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        try {
          const errorData = JSON.parse(body);
          console.log('📝 Erro recebido:', errorData);
          
          // Aqui você pode processar o erro (salvar em arquivo, enviar para API, etc.)
          processError(errorData);
          
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ status: 'received' }));
        } catch (error) {
          console.error('Erro ao processar dados:', error);
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not found' }));
    }
  });
  
  server.listen(3001, () => {
    console.log('✅ Servidor MCP rodando em http://localhost:3001');
    console.log('📡 Endpoint para erros: POST http://localhost:3001/errors');
  });
}

// Função para processar erros
function processError(errorData) {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] ${errorData.type}: ${errorData.message}\n`;
  
  // Aqui você pode implementar diferentes estratégias de processamento:
  // - Salvar em arquivo de log
  // - Enviar para serviço de monitoramento
  // - Notificar via webhook
  // - etc.
  
  console.log('🔍 Processando erro:', logEntry.trim());
}

// Função principal
function main() {
  console.log('🎯 MCP Browser Tools iniciado!');
  console.log('📋 Configuração:', JSON.stringify(mcpConfig, null, 2));
  
  // Configurar captura de erros
  captureConsoleErrors();
  captureUnhandledErrors();
  
  // Iniciar servidor MCP
  startMCPServer();
  
  // Manter o processo vivo
  process.on('SIGINT', () => {
    console.log('\n👋 Encerrando MCP Browser Tools...');
    process.exit(0);
  });
}

// Iniciar aplicação
main();
