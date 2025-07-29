import * as assert from 'assert';
import { Cache } from '../../cache';

suite('Cache Test Suite', () => {
    test('Test set and get', () => {
        const cache = new Cache();
        cache.set('key', 'value');
        assert.strictEqual(cache.get('key'), 'value');
    });

    test('Test TTL', (done) => {
        const cache = new Cache(100); // 100ms TTL
        cache.set('key', 'value');
        setTimeout(() => {
            assert.strictEqual(cache.get('key'), undefined);
            done();
        }, 200);
    });
});
