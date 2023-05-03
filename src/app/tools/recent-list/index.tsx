import { MouseEvent } from "react";

interface IRecentListItem {
  id: string;
  title: string;
  description: string;
}

interface IRecentListProps {
  list: IRecentListItem[];
  sketelonCount: number;
  onClick: (id: string, e: MouseEvent) => void;
}

const RecentList = (props: IRecentListProps) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <h5 className="text-xl">Ранее загруженные файлы</h5>
      <div className="flex flex-col">
        {props.list.length === 0
          ? Array.from({ length: props.sketelonCount }, () => (
              <div className="flex flex-col gap-1 rounded-lg py-2 px-5 hover:bg-slate-100 transition-colors cursor-pointer">
                <div className="h-[20px] animate-pulse bg-gray-200 rounded dark:bg-gray-200"></div>
                <div className="h-[20px] animate-pulse bg-gray-200 rounded dark:bg-gray-200"></div>
              </div>
            ))
          : props.list.map((item) => (
              <div
                onClick={(e) => props.onClick(item.id, e)}
                className="flex flex-col gap-1 rounded-lg py-2 px-5 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                <p className="text-sm uppercase">{item.title}</p>
                <p className="text-sm text-slate-500">{item.description}</p>
              </div>
            ))}
        {}
      </div>
    </div>
  );
};

export { RecentList };
