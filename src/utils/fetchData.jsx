// src/utils/fetchData.js
export const createPost = async (supabase, user, postData) => {
    const { data, error } = await supabase
      .from('posts')
      .insert([{ ...postData, user_id: user.id }]);
  
    if (error) throw error;
    return data;
  };
  