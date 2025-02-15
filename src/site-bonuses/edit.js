import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';

export default function Edit() {
	return (
		<aside {...useBlockProps()}>
			Hello world from the editor content!
		</aside>
	);
}
