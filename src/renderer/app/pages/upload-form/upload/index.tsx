import { LayoutHeader } from "@app/tools/layout"
import { FilesForm, IFileFormValues } from "./form"
import { SessionRepository } from "@data/sessions"
import { CreateSessionUseCase, ICreateSessionError } from "@domain/session/use-cases/create-use-case"
import { FileEntity } from "@domain/file"
import { ExceptionService } from "@domain/common/service"
import { useNavigate } from "react-router-dom"
import { RouterPath } from "@app/router/path"
import { replaceArgs } from "@app/router/functions"

const UFUploadPage = () => {

    const navigate = useNavigate()

    const repository = new SessionRepository()
    const useCase = new CreateSessionUseCase(repository)

    const uploadFileCallback = async (data: IFileFormValues): Promise<void> => {
        try {
            const errors: Partial<Record<ICreateSessionError, string>> = {}
            if (data.dictionary === null) errors.file_dictionary = 'Пожалуйста, загрузите словари'
            if (data.prefix === null) errors.file_prefix = 'Пожалуйста, загрузите приставки'

            if (Object.keys(errors).length) {
                throw ExceptionService.new<ICreateSessionError>({
                    status: {
                        code: 100,
                        message: "Validation Errors"
                    },
                    data: errors
                })
            }

            const entity = await useCase.execute({
                files: {
                    dictionary: await FileEntity.createFromFile(data.dictionary as File),
                    prefix: await FileEntity.createFromFile(data!.prefix as File),
                },
                created_at: new Date()
            })
            
            navigate(
                replaceArgs(RouterPath.UF_RESULTS, { id: entity.id })
            )
        } catch (e: unknown) {
            throw e
        }
    }

    return (
        <>
            <LayoutHeader
                title="Все просто!"
                subtitle="Загрузка файлов"
                description="Для начала обработки нужно загрузить два файла:"
            />
            <FilesForm onUpload={uploadFileCallback} />
        </>
    )
}

export { UFUploadPage }