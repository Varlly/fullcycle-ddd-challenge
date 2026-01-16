import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Rotas
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: '🏗️ DDD App - Domain-Driven Design em TypeScript',
    status: 'running',
    timestamp: new Date().toISOString(),
  });
});

app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
  });
});

app.get('/api/info', (req: Request, res: Response) => {
  res.json({
    name: 'ddd-app',
    version: '1.0.0',
    description: 'Aplicação de exemplo com Domain-Driven Design',
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    path: req.path,
    method: req.method,
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`ℹ️  Info: http://localhost:${PORT}/api/info`);
});
