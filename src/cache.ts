export class Cache {
    private cache = new Map<string, { content: string, timestamp: number }>();
    private ttl: number;

    constructor(ttl: number = 60 * 60 * 1000) { // Default TTL of 1 hour
        this.ttl = ttl;
    }

    get(key: string): string | undefined {
        const item = this.cache.get(key);
        if (item && (Date.now() - item.timestamp) < this.ttl) {
            return item.content;
        }
        return undefined;
    }

    set(key: string, content: string) {
        this.cache.set(key, { content, timestamp: Date.now() });
    }
}
