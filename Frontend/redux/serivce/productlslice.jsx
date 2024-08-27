import { api } from '../api/baseApi'

export const emplyeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmplyee: builder.query({
      query: (token) => `employees`,
      providesTags : ["employees"]
    }),
   
    getDepartment: builder.query({
      query: (token) => `employees`,
      providesTags : ["employees"]
    }),

    getAcivment: builder.query({
      query: (token) => `employees`,
      providesTags : ["employees"]
    }),

    // getSingleBlog: builder.query({
    //   query: (id) => `single/blog/${id}`,
    //   providesTags : ["single/blog"]
    // }),

    
    createEmplyee: builder.mutation({
      query: data => ({
        url: 'employees',
        method: 'POST',
        body: data
      }),
      invalidatesTags: ['employees']
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEmplyeeQuery, useCreateEmplyeeMutation , useGetAcivmentQuery, useGetDepartmentQuery
} = emplyeSlice