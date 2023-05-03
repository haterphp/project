import { RouterPath } from "@app/router/path";
import { LayoutHeader } from "@app/tools";
import { RecentList } from "@app/tools/recent-list";
import { Button } from "@app/ui";
import { useNavigate } from "react-router-dom";
import { useGetAllSessionRequest } from "./request";
import { MouseEvent, useMemo } from "react";
import { replaceArgs } from "@app/router/functions";

const UFGreetingPage = () => {
  const navigate = useNavigate();
  const { data, count } = useGetAllSessionRequest();

  const formatterSessions = useMemo(() => {
    return data === null
      ? []
      : data.map((item) => ({
          id: item.id as string,
          title: `${item.files.dictionary.name} - ${item.files.prefix.name}`,
          description: new Intl.DateTimeFormat("ru-RU", {
            dateStyle: "long",
            timeStyle: "short",
          }).format(item.created_at),
        }));
  }, [data]);

  const handleOnClick = () => {
    navigate(RouterPath.UF_UPLOAD);
  };

  const handleOpenRecentSession = (id: string, _e: MouseEvent) => {
    navigate(replaceArgs(RouterPath.UF_RESULTS, { id }));
  };

  return (
    <>
      <LayoutHeader
        title="Добро пожаловать!"
        subtitle="Начало работы"
        description="Приложение - Анализатор текста, предназначенно для преобразования исходного текста с использование приставок."
        actions={
          <Button color="primary" onClick={handleOnClick}>
            Начать работу
          </Button>
        }
      />
      <div className="flex flex-col gap-4 items-start max-w-md">
        <RecentList
          list={formatterSessions}
          onClick={handleOpenRecentSession}
          sketelonCount={count}
        />
      </div>
    </>
  );
};

export { UFGreetingPage };
