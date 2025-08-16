// API client for Hostinger MySQL database
const API_BASE_URL = '/api'; // This will work on Hostinger with the PHP backend

class ApiClient {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Request failed' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Students API
  async getStudents(search?: string, limit = 10, offset = 0) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    
    return this.request<{ students: any[]; total: number }>(`/students?${params}`);
  }

  async getStudent(id: number) {
    return this.request<any>(`/students/${id}`);
  }

  async createStudent(data: any) {
    return this.request<any>('/students', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateStudent(id: number, data: any) {
    return this.request<any>(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteStudent(id: number) {
    return this.request<{ message: string }>(`/students/${id}`, {
      method: 'DELETE',
    });
  }

  // Children API
  async getChildren(search?: string, ageRange?: string, limit = 10, offset = 0) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (ageRange) params.append('ageRange', ageRange);
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    
    return this.request<{ children: any[]; total: number }>(`/children?${params}`);
  }

  async getChild(id: number) {
    return this.request<any>(`/children/${id}`);
  }

  async getChildrenByStudentId(studentId: number) {
    return this.request<any[]>(`/children/student/${studentId}`);
  }

  async createChild(data: any) {
    return this.request<any>('/children', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateChild(id: number, data: any) {
    return this.request<any>(`/children/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteChild(id: number) {
    return this.request<{ message: string }>(`/children/${id}`, {
      method: 'DELETE',
    });
  }

  // Auth API
  async login(username: string, password: string) {
    return this.request<{ user: any; message: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async logout() {
    return this.request<{ message: string }>('/auth/logout', {
      method: 'POST',
    });
  }

  async getCurrentUser() {
    return this.request<any>('/auth/me');
  }

  // Admins API
  async getAdmins(search?: string, limit = 10, offset = 0) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    params.append('limit', limit.toString());
    params.append('offset', offset.toString());
    
    return this.request<{ admins: any[]; total: number }>(`/admins?${params}`);
  }

  async getAdmin(id: number) {
    return this.request<any>(`/admins/${id}`);
  }

  async createAdmin(data: any) {
    return this.request<any>('/admins', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateAdmin(id: number, data: any) {
    return this.request<any>(`/admins/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteAdmin(id: number) {
    return this.request<{ message: string }>(`/admins/${id}`, {
      method: 'DELETE',
    });
  }

  // Stats API
  async getStats() {
    return this.request<{
      totalStudents: number;
      totalChildren: number;
      totalAdmins: number;
      activeStudents: number;
    }>('/stats');
  }
}

export const apiClient = new ApiClient();
