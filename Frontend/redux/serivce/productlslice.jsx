import { api } from '../api/baseApi'

export const emplyeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getEmplyee: builder.query({
      query: (token) => `employees`,
      providesTags : ["employees"]
    }),
   

    // getSingleBlog: builder.query({
    //   query: (id) => `single/blog/${id}`,
    //   providesTags : ["single/blog"]
    // }),

    

    // createContact: builder.mutation({
    //   query: data => ({
    //     url: 'contact',
    //     method: 'POST',
    //     body: data
    //   }),
    //   invalidatesTags: ['about']
    // })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEmplyeeQuery, 
} = emplyeSlice