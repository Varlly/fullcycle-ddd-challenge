/** @type {import('jest').Config} */
const config = {
  // Configuração para ESM + TypeScript
  // Se estiver usando ts-jest, o preset é 'ts-jest/presets/default-esm'
  // Se estiver usando swc, não precisa de preset, apenas do transform abaixo.
  
  testEnvironment: 'node',
  
  // Ignora pastas de build e dependências
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  
  // Transforma arquivos TS usando @swc/jest e habilita parsing de TypeScript + decoradores
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
          decorators: true
        },
        transform: {
          react: {
            runtime: 'automatic'
          },
          legacyDecorator: true,
          decoratorMetadata: true
        },
        target: 'es2022'
      },
      module: {
        type: 'es6'
      }
    }],
  },
  
  // Extensões que o Jest deve tratar como módulos nativos
  extensionsToTreatAsEsm: ['.ts'],
  
  // Mapeamento para garantir que imports .js encontrem arquivos .ts
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  // Permite que alguns pacotes ESM em node_modules sejam transformados (ex.: uuid)
  transformIgnorePatterns: [
    '/node_modules/(?!(uuid)/)'
  ],
};

export default config;