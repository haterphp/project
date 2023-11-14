import { replaceArgs } from '../renderer/app/router/functions';
import {describe, expect, test} from '@jest/globals';


describe('Функция для операции "replace" в url страницах', () => {
    test('Чтение даннхы с файла', () => {
        expect(replaceArgs('some-route-path/:id', {id: '123'})).toBe('some-route-path/123')
        expect(replaceArgs('some-route-path/:id', {id: ''})).toBe('some-route-path/')
        expect(
            replaceArgs('some-route-path/:id', {id: replaceArgs('some-other-path/:id', {id: '123'})})
            ).toBe('some-route-path/some-other-path/123')
    })
})