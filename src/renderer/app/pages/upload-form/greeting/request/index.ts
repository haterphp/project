import { SessionRepository } from "@data/sessions";
import { GetAllSessionsUseCase, ISessionEntity } from "@domain/session";
import { useEffect, useState } from "react";

interface IUseGetAllSessionRequestResult {
  data: ISessionEntity[] | null;
  count: number
  isLoading: boolean;
}

const useGetAllSessionRequest = (): IUseGetAllSessionRequestResult => {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<ISessionEntity[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const repository = new SessionRepository();
  const useCase = new GetAllSessionsUseCase(repository);

  useEffect(() => {
    void useCase
      .execute()
      .then((data) => {
        setCount(data.length)
        setTimeout(() => {
          setData(data);
          setIsLoading(false);
        }, 2000);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  return {
    data,
    isLoading,
    count
  };
};

export { useGetAllSessionRequest };
