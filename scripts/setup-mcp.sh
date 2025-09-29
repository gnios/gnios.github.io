#!/bin/bash

# Script para configurar e executar o MCP Browser Tools
echo "🚀 Configurando MCP Browser Tools..."

# Criar diretório de logs se não existir
mkdir -p logs

# Dar permissões de execução
chmod +x mcp-browser-setup.js

# Construir e executar com Docker Compose
echo "📦 Construindo container Docker..."
docker-compose -f docker-compose.mcp.yml build

echo "🎯 Iniciando MCP Browser Tools..."
docker-compose -f docker-compose.mcp.yml up -d

echo "✅ MCP Browser Tools iniciado!"
echo ""
echo "📊 Serviços disponíveis:"
echo "  - MCP Server: http://localhost:3001"
echo "  - Log Viewer: http://localhost:8080"
echo ""
echo "🔧 Comandos úteis:"
echo "  - Ver logs: docker-compose -f docker-compose.mcp.yml logs -f"
echo "  - Parar: docker-compose -f docker-compose.mcp.yml down"
echo "  - Reiniciar: docker-compose -f docker-compose.mcp.yml restart"
echo ""
echo "📡 Para enviar erros do browser:"
echo "  curl -X POST http://localhost:3001/errors \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"type\":\"test\",\"message\":\"Erro de teste\",\"timestamp\":\"$(date -Iseconds)\"}'"
