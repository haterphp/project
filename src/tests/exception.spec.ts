import { ExceptionService } from '../renderer/domain/common/service';
import {describe, expect, test} from '@jest/globals';

describe('Класс отвечающий за выброс исключений', () => {
    test('Выброс ошибки с payload', () => {
        const exception = ExceptionService.new({ 
            status: { code: 100, message: 'SomeError' },
            data: { logical: 'Logical Error' }
        })

        expect(exception).toHaveProperty('code', 100)
        expect(exception).toHaveProperty('message', 'SomeError')
        expect(exception).toHaveProperty('data', { logical: 'Logical Error' })
    })

    test('Выброс ошибки без payload', () => {
        const exception = ExceptionService.new({ 
            status: { code: 100, message: 'SomeError' },
        })

        expect(exception).toHaveProperty('code', 100)
        expect(exception).toHaveProperty('message', 'SomeError')
    })
})