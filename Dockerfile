# Última versão LTS do Node.js baseada no Alpine
FROM node:22-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar package.json e package-lock.json primeiro para aproveitar cache
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY . .

# Variáveis de ambiente padrão
ENV PORT=3000

# Expor a porta da API
EXPOSE 3000

# Comando padrão
CMD ["npm", "run", "dev"]