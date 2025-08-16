type CacheEntry<T> = { value: T; expiresAt: number };

/**
 * Cache em memória simples com expiração por TTL.
 * Permite armazenar pares chave-valor temporariamente.
 *
 * @example
 * const cache = new InMemoryCache();
 * cache.set('user', { id: 1 }, 5000);
 * const user = cache.get<{ id: number }>('user');
 */
export class InMemoryCache {
  private store = new Map<string, CacheEntry<unknown>>();

  /**
   * Cria uma instância de cache em memória.
   * @param {number} [defaultTtlMs=600000] - Tempo padrão de expiração em milissegundos (default: 10 minutos).
   */
  constructor(private defaultTtlMs: number = 10 * 60 * 1000) {}

  /**
   * Recupera um valor do cache pela chave informada.
   * @param {string} key - Chave de busca.
   * @returns {T|null} Valor armazenado ou null se não existir ou estiver expirado.
   * @template T
   * @example
   * const valor = cache.get<string>('minha-chave');
   */
  get<T>(key: string): T | null {
    const entry = this.store.get(key);
    if (!entry) return null;
    if (Date.now() > entry.expiresAt) {
      this.store.delete(key);
      return null;
    }
    return entry.value as T;
  }

  /**
   * Armazena um valor no cache com tempo de expiração.
   * @param {string} key - Chave para armazenar o valor.
   * @param {T} value - Valor a ser armazenado.
   * @param {number} [ttlMs] - Tempo de expiração em milissegundos (default: valor padrão do cache).
   * @template T
   * @returns {void}
   * @example
   * cache.set('token', 'abc123', 30000);
   */
  set<T>(key: string, value: T, ttlMs: number = this.defaultTtlMs): void {
    this.store.set(key, { value, expiresAt: Date.now() + ttlMs });
  }
}

export const cache = new InMemoryCache();
