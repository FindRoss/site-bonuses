import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit() {
	const [post, setPost] = useState(null);
	const [postName, setPostName] = useState(''); // State for the post name input

	useEffect(() => {
		if (postName) {
			const fetchPost = async () => {
				const response = await fetch(`/wp-json/wp/v2/review?slug=${postName}`);
				const data = await response.json();
				if (data.length > 0) {
					setPost(data[0]);
				} else {
					setPost(null);
				}
			};

			fetchPost();
		}
	}, [postName]);

	return (
		<aside {...useBlockProps()}>
			<input
				type="text"
				value={postName}
				onChange={(e) => setPostName(e.target.value)}
				placeholder="Enter post name"
			/>
			{post ? (
				<div>
					<h2>{post.title.rendered}</h2>
					<div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
				</div>
			) : (
				<p>{postName ? 'Loading...' : 'Enter a post name to fetch the content'}</p>
			)}
		</aside>
	);
}
