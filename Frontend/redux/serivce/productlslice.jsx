import { api } from '../api/baseApi'

export const emplyeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmplyee: builder.query({
      query: ({token,page,limit}) => `employees?page=${page}&limit=${limit}`,
      providesTags : ["employees"]
    }),
    
   
    getDepartment: builder.query({
      query: (token) => `department`,
      providesTags : ["department"]
    }),

    getAcivment: builder.query({
      query: (token) => `achievement`,
      providesTags : ["achievement"]
    }),

 

    deleteEmplyee: builder.mutation({
      query: id => ({
        url: `employees/${id}`,
        method: 'DELETE',  
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }),
      invalidatesTags: ['employees']
    }),
    
    createEmplyee: builder.mutation({
      query: data => ({
        url: 'employees',
        method: 'POST',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
      }),
      invalidatesTags: ['employees']
    }),

    updateEmplyee: builder.mutation({
      query: data => ({
      
        url: `employees/${data.id}`,
        method: 'PUT',
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
      }),
      invalidatesTags: ['employees']
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEmplyeeQuery, useCreateEmplyeeMutation , useGetAcivmentQuery, useGetDepartmentQuery, useDeleteEmplyeeMutation, useUpdateEmplyeeMutation
} = emplyeSlice