import {describe, expect, test} from '@jest/globals';
import { FileEntity } from "../renderer/domain/file";

describe('FileEntity', () => {
    test('Чтение даннхы с файла', () => {
        const file = new File(['test'], 'test.txt', { type: 'text/plain' })
        FileEntity.createFromFile(file).then((entity) => {
            expect(entity).toHaveProperty('name', 'test.txt')
            expect(entity).toHaveProperty('content', 'test')
        })
    })
})