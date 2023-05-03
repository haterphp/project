import { IFileEntity } from "../interfaces";

class FileEntity implements IFileEntity {
    public name: string

    public content: string

    constructor (payload: IFileEntity) {
        this.name = payload.name
        this.content = payload.content
    } 

    public static async createFromFile (file: File): Promise<IFileEntity> {

        const content = await new Promise<string>((res) => {
            const reader = new FileReader()

            reader.readAsText(file)
    
            reader.onload = () => {
                res(reader.result as string)
            }
        }) 
        const name = file.name
        
        return new FileEntity({
            name,
            content
        })
    }
}

export { FileEntity }