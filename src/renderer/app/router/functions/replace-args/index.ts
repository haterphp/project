const createKey = (key: string) => `:${key}`

const replaceArgs = (path: string, args: Record<string, any>): string => {
    return Object.keys(args).reduce((path, key) => {
        return path.replaceAll(createKey(key), args[key])
    }, path)
}

export { replaceArgs, createKey }