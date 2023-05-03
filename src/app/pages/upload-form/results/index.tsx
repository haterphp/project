import { RouterPath } from "@app/router/path";
import { LayoutHeader } from "@app/tools";
import { Navigate, useParams } from "react-router-dom";
import { useGetOneSessionRequest } from "./request";
import { useEffect } from "react";
import { LabelWithPopover } from "@app/tools/label-with-popover";

interface IUFResultPageProps {
  id: number;
}

const UFResultPageInner = ({ id }: IUFResultPageProps) => {
  const { data, isLoading } = useGetOneSessionRequest(id);

  useEffect(() => {
    console.log(data?.getCompareFileContent());
  }, [data, isLoading]);

  return (
    <>
      <LayoutHeader
        title="Результаты вычеслений"
        subtitle="Результат"
        description={
          <div className="flex flex-col gap-3">
            <div className="flex gap-2 items-center">
              <p className="w-[160px]">Файл со словорем:</p>
              {isLoading ? (
                <div className="h-5 animate-pulse bg-gray-200 rounded dark:bg-gray-200 w-[50px]"></div>
              ) : (
                <LabelWithPopover
                  title={data?.files.dictionary.name ?? ""}
                  content={{
                    header: `Содержание файла ${data?.files.dictionary.name}`,
                    body: (
                      <>
                        {data?.files.dictionary.content.split(",").join(", ")}
                      </>
                    ),
                  }}
                />
              )}
            </div>
            <div className="flex gap-2 items-center">
              <p className="w-[160px]">Файл с приставками:</p>
              {isLoading ? (
                <div className="h-5 animate-pulse bg-gray-200 rounded dark:bg-gray-200 w-[50px]"></div>
              ) : (
                <LabelWithPopover
                  title={data?.files.prefix.name ?? ""}
                  content={{
                    header: `Содержание файла ${data?.files.prefix.name}`,
                    body: (
                      <>{data?.files.prefix.content.split(",").join(", ")}</>
                    ),
                  }}
                />
              )}
            </div>
          </div>
        }
      />
      <table className="border-collapse table-fixed max-w-3xl">
        <thead>
          <tr>
            <th className="border px-7 py-3 text-left">Изначальный вариант</th>
            <th className="border px-7 py-3 text-left">После преобразования</th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 3 }, () => (
                <tr>
                  <td className="border px-7 py-3 text-left">
                    <div className="h-5 animate-pulse bg-gray-200 rounded dark:bg-gray-200 w-full"></div>
                  </td>
                  <td className="border px-7 py-3 text-left">
                    <div className="h-5 animate-pulse bg-gray-200 rounded dark:bg-gray-200 w-full"></div>
                  </td>
                </tr>
              ))
            : data?.getCompareFileContent().map(item => (
              <tr>
                  <td className="border px-7 py-3 text-left">
                    {item.before}
                  </td>
                  <td className="border px-7 py-3 text-left">
                    {item.after}
                  </td>
                </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

const UFResultPage = () => {
  const { id } = useParams();
  if (id === undefined) return <Navigate to={RouterPath.UF_GREETING} />;
  return <UFResultPageInner id={+id} />;
};

export { UFResultPage };
