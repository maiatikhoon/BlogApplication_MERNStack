
import { createSlice } from "@reduxjs/toolkit"; 


const BlogSlice = createSlice( { 
      name : "blog" , 
      initialState : { 
           blog : [] , 
           id: null , 
           data : {} ,
      },

      reducers : { 

           addBlog : (state , action)=> { 

                state.blog.push({ id: action.payload.id , title: action.payload.title , description: action.payload.description , author: action.payload.author}) ; 
           } , 

           setBlog : (state, action)=> { 

               state.blog = action.payload; 
           } ,

           setId : (state, action) => { 

               state.id = action.payload ; 
            
           } , 

           setData : (state , action) => { 
               state.data = action.payload ; 
           }

           
      }
})


export const { addBlog ,setBlog  , setId ,setData } = BlogSlice.actions ; 

export default BlogSlice.reducer; 

