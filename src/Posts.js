import { useEffect, useState, useCallback } from 'react'

const Posts = () => {
    const [pageNumber, setPageNumber] = useState(1);
    const [data, setData] = useState();
    const fetchPosts = useCallback(async (pageNumber) => {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
        );
        return response.json();
      },[pageNumber]);

    useEffect(async ()=>{
        const data = await fetchPosts();
        setData(data);
    },[fetchPosts]);
    console.log(data)
    return (
        <div>Posts</div>
    )
}

export default Posts