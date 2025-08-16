// Global type declarations for modules without built-in TypeScript support

declare module '@tanstack/react-query' {
  import { ReactNode } from 'react';
  
  export interface QueryClient {
    invalidateQueries(options?: any): Promise<void>;
  }
  
  export interface UseQueryResult<TData = unknown, TError = unknown> {
    data: TData | undefined;
    error: TError | null;
    isLoading: boolean;
    isError: boolean;
    refetch: () => Promise<any>;
  }
  
  export interface UseMutationResult<TData = unknown, TError = unknown, TVariables = void> {
    mutate: (variables: TVariables) => void;
    mutateAsync: (variables: TVariables) => Promise<TData>;
    isLoading: boolean;
    isError: boolean;
    error: TError | null;
  }
  
  export function useQuery<TData = unknown, TError = unknown>(
    options: {
      queryKey: any[];
      queryFn: () => Promise<TData>;
      enabled?: boolean;
    }
  ): UseQueryResult<TData, TError>;
  
  export function useMutation<TData = unknown, TError = unknown, TVariables = void>(
    options: {
      mutationFn: (variables: TVariables) => Promise<TData>;
      onSuccess?: (data: TData) => void;
      onError?: (error: TError) => void;
    }
  ): UseMutationResult<TData, TError, TVariables>;
  
  export function useQueryClient(): QueryClient;
  
  export function QueryClientProvider(props: {
    client: QueryClient;
    children: ReactNode;
  }): JSX.Element;
}

declare module 'lucide-react' {
  import { ComponentType, SVGProps } from 'react';
  
  interface LucideProps extends Partial<SVGProps<SVGSVGElement>> {
    size?: string | number;
    absoluteStrokeWidth?: boolean;
  }
  
  export type LucideIcon = ComponentType<LucideProps>;
  
  export const Plus: LucideIcon;
  export const Search: LucideIcon;
  export const Filter: LucideIcon;
  export const Eye: LucideIcon;
  export const Edit: LucideIcon;
  export const Trash2: LucideIcon;
  export const Download: LucideIcon;
  export const User: LucideIcon;
  export const Users: LucideIcon;
  export const FileText: LucideIcon;
  export const ArrowLeft: LucideIcon;
}

declare module 'react-router-dom' {
  export interface RouteProps {
    path?: string;
    element?: React.ReactNode;
    children?: React.ReactNode;
  }
  
  export function useParams<T = Record<string, string>>(): T;
  export function useNavigate(): (path: string) => void;
  export function Route(props: RouteProps): JSX.Element;
  export function Routes(props: { children: React.ReactNode }): JSX.Element;
  export function BrowserRouter(props: { children: React.ReactNode }): JSX.Element;
}

declare module 'wouter' {
  export interface RouteProps {
    path?: string;
    component?: React.ComponentType<any>;
    children?: React.ReactNode;
  }
  
  export function Route(props: RouteProps): JSX.Element;
  export function Switch(props: { children: React.ReactNode }): JSX.Element;
  export function useLocation(): [string, (path: string) => void];
  export function useRoute(pattern: string): [boolean, Record<string, string>];
}
