import * as React from 'react';
import { Outlet as RROutlet } from 'react-router-dom';

type OutletProps<Data> = { data?: Data };

let context = React.createContext<unknown>(null);

/**
 * Wrapper of the React Router Outlet component. This Outlet receives an
 * optional `data` prop and wraps the RR Outlet in a React Context passing this
 * data as value.
 *
 * ```tsx
 * let data = useRouteData(); // get data from the current route
 * return <Outlet data={data} /> // pass data to the Outlet
 * ```
 */
export function Outlet<Data = unknown>({ data }: OutletProps<Data>) {
  return (
    <context.Provider value={data}>
      <RROutlet />
    </context.Provider>
  );
}

/**
 * Get the data from the parent data. This needs to be rendered in a route with
 * a parent router rendering the Outlet component of Remix Utils.
 * ```tsx
 * let routeData = useRouteData(); // get data from the route loader
 * let parentData = useParentData(); // get data from the parent route
 * ```
 */
export function useParentData<ParentData>() {
  let parentData = React.useContext(context) as ParentData | null;
  if (!parentData) throw new Error('Missing parent data.');
  return parentData;
}