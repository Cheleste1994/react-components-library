import { useSearchParams } from 'react-router-dom';

export const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentSearch = searchParams.get('search') || '';
  const currentStatus = searchParams.get('status')?.split(',') || [];
  const currentRoute = searchParams.get('route')?.split(',') || [];

  const handleSearch = (search: string) =>
    setSearchParams((prev) => ({
      page: '1',
      status: prev.get('status') || '',
      search,
      route: prev.get('route') || '',
    }));

  const handleStatuses = (code: string) => {
    setSearchParams((prev) => {
      const prevStatus = prev.get('status')?.split(',') || [];

      const index = prevStatus.findIndex((r) => r === code);
      index >= 0 ? prevStatus.splice(index, 1) : prevStatus.push(`${code}`);

      return {
        ...prev,
        page: '1',
        status: prevStatus.join(','),
        search: currentSearch,
        route: currentRoute.join(','),
      };
    });
  };

  const handleDirection = (routeId: string) => {
    setSearchParams((prev) => {
      const prevRoute = prev.get('route')?.split(',') || [];

      const index = prevRoute.findIndex((r) => r === routeId);
      index >= 0 ? prevRoute.splice(index, 1) : prevRoute.push(routeId);

      return {
        page: '1',
        status: currentStatus.join(','),
        search: currentSearch,
        route: prevRoute.join(','),
      };
    });
  };

  const handleResetFilter = () => {
    setSearchParams({ search: currentSearch });
  };

  const handlePagination = (value: number) =>
    setSearchParams({
      page: `${value}`,
      status: currentStatus?.join(',') || [],
      search: currentSearch,
      route: currentRoute?.join(',') || [],
    });

  return [
    {
      currentPage,
      currentSearch,
      currentStatus,
      currentRoute,
    },
    {
      handleSearch,
      handleStatuses,
      handleDirection,
      handleResetFilter,
      handlePagination,
    },
  ] as const;
};
