import { SessionRepository } from "@data/sessions";
import { GetOneSessionUseCase, ISessionEntity } from "@domain/session";
import { useEffect, useState } from "react";

interface IUseGetOneSessionRequestResult {
  data: ISessionEntity | null;
  isLoading: boolean;
}

const useGetOneSessionRequest = (
  id: ISessionEntity["id"]
): IUseGetOneSessionRequestResult => {
  const [data, setData] = useState<ISessionEntity | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const repository = new SessionRepository();
  const useCase = new GetOneSessionUseCase(repository);

  useEffect(() => {
    void useCase
      .execute({
        id,
      })
      .then((data) => {
        setTimeout(() => {
            setData(data);
            setIsLoading(false);
        }, 2000)
      })
      .catch(() => {
        setIsLoading(false)
      });
  }, []);

  return {
    data,
    isLoading,
  };
};

export { useGetOneSessionRequest };
