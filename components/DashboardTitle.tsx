interface Props {
  title: string;
  buttons?: React.ReactNode;
}

export const DashboardTitle: React.FC<React.PropsWithChildren<Props>> = ({
  title,
  buttons,
}) => {
  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:leading-9 sm:truncate">
              {title}
            </h2>
          </div>
          {buttons && <div className="flex mt-0 ml-4">{buttons}</div>}
        </div>
      </div>
    </>
  );
};
