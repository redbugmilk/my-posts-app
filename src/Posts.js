import { useEffect, useState, useCallback } from 'react'
import {View, Text} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Posts = () => {
    const [pageNumber, _] = useState(1);
    const [data, setData] = useState();
    const [comments, setComments] = useState();
    const [chosenPost, setChosenPost] = useState();
    const [loading, setLoading] = useState(false);

    const fetchPosts = useCallback(async (pageNumber) => {
        setLoading(true);
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNumber}`
        );
        setLoading(false);
        return response.json();
      },[pageNumber]);

    const fetchComments = useCallback(async (postId) => {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      setLoading(false);
      return response.json();
    },[]);

    useEffect(async ()=>{
        const response = await fetchPosts();
        setData(response);
    },[fetchPosts]);

    useEffect(async()=>{
      const response = await fetchComments(chosenPost);
      setComments(response);
    },[chosenPost, fetchComments])

    return (
        <View>
          {!data && loading && <Text>Loading Posts</Text> }
          { data && <RNPickerSelect
              onValueChange={(value) => setChosenPost(value)}
              items={data.map(item => ({ label: data.title, value: data.id }))}
          />}
          {!chosenPost && <Text>No Post Selected</Text>}
          {chosenPost && loading && <Text>Loading comments</Text>}
          {comments && comments.map(item =><Text>{item.body}</Text>)}
        </View>
    )
}

export default Posts