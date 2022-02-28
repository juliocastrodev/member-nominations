import path from 'path'

export const config = {
  api: {
    port: parseInt(process.env.API_PORT ?? '3000'),
  },
  jwt: {
    secret: process.env.JWT_SECRET ?? 'secret',
    exp: process.env.JWT_EXPIRATION ?? '10m',
  },
  persistence: {
    dir: process.env.PERSISTENCE_DIR ?? path.resolve(__dirname, '../persistence'),
  },
}
