interface IUseCase<TPort, TResult> {
  execute(port?: TPort): Promise<TResult>;
}

interface IExceptionServicePaylaod<TKeys extends string> {
  status: {
    code: number;
    message: string;
  };
  data: Partial<Record<TKeys, string>>;
}

export type { IUseCase, IExceptionServicePaylaod };
