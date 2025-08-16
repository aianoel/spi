// Static query client that works without backend
import { mockApi } from './mockData';

export class StaticQueryClient {
  private cache = new Map();
  private listeners = new Map();

  invalidateQueries(options?: any): Promise<void> {
    // Clear cache and notify listeners
    this.cache.clear();
    this.listeners.forEach((callbacks) => {
      callbacks.forEach((callback: Function) => callback());
    });
    return Promise.resolve();
  }
}

export const staticQueryClient = new StaticQueryClient();

// Mock useQuery hook for static deployment
export function useQuery<TData = unknown, TError = unknown>(options: {
  queryKey: any[];
  queryFn: () => Promise<TData>;
  enabled?: boolean;
}) {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<TError | null>(null);

  useEffect(() => {
    if (options.enabled === false) return;

    setIsLoading(true);
    options.queryFn()
      .then((result) => {
        setData(result);
        setError(null);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [JSON.stringify(options.queryKey)]);

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    refetch: options.queryFn
  };
}

// Mock useMutation hook for static deployment
export function useMutation<TData = unknown, TError = unknown, TVariables = void>(options: {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<TError | null>(null);

  const mutate = (variables: TVariables) => {
    setIsLoading(true);
    setError(null);
    
    options.mutationFn(variables)
      .then((data) => {
        options.onSuccess?.(data);
      })
      .catch((err) => {
        setError(err);
        options.onError?.(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const mutateAsync = (variables: TVariables) => {
    setIsLoading(true);
    setError(null);
    
    return options.mutationFn(variables)
      .then((data) => {
        options.onSuccess?.(data);
        return data;
      })
      .catch((err) => {
        setError(err);
        options.onError?.(err);
        throw err;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return {
    mutate,
    mutateAsync,
    isLoading,
    isError: !!error,
    error
  };
}

export function useQueryClient() {
  return staticQueryClient;
}

// Import React hooks
import { useState, useEffect } from 'react';

// Static API functions that replace server calls
export const staticApi = {
  // Students API
  getStudents: (search?: string, limit?: number, offset?: number) => 
    mockApi.getStudents(search, limit, offset),
  
  getStudent: (id: number) => mockApi.getStudent(id),
  
  createStudent: (data: any) => {
    // In static mode, just return the data with a mock ID
    return Promise.resolve({ ...data, id: Date.now() });
  },
  
  updateStudent: (id: number, data: any) => {
    return Promise.resolve({ ...data, id });
  },
  
  deleteStudent: (id: number) => {
    return Promise.resolve(true);
  },

  // Children API
  getChildren: (search?: string, ageRange?: string, limit?: number, offset?: number) =>
    mockApi.getChildren(search, ageRange, limit, offset),
  
  getChildrenByStudentId: (studentId: number) => 
    mockApi.getChildrenByStudentId(studentId),
  
  createChild: (data: any) => {
    return Promise.resolve({ ...data, id: Date.now() });
  },
  
  updateChild: (id: number, data: any) => {
    return Promise.resolve({ ...data, id });
  },
  
  deleteChild: (id: number) => {
    return Promise.resolve(true);
  },

  // Stats API
  getStats: () => mockApi.getStats(),

  // Auth API
  login: (username: string, password: string) => 
    mockApi.login(username, password),
  
  logout: () => mockApi.logout(),
  
  getCurrentUser: () => mockApi.getCurrentUser(),

  // Admins API (mock)
  getAdmins: () => Promise.resolve([{
    id: 1,
    username: 'admin',
    full_name: 'System Administrator',
    role: 'admin',
    created_at: new Date().toISOString()
  }]),
  
  createAdmin: (data: any) => {
    return Promise.resolve({ ...data, id: Date.now(), created_at: new Date().toISOString() });
  },
  
  updateAdmin: (id: number, data: any) => {
    return Promise.resolve({ ...data, id, created_at: new Date().toISOString() });
  },
  
  deleteAdmin: (id: number) => {
    return Promise.resolve(true);
  }
};
