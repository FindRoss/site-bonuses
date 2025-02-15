import { useBlockProps } from '@wordpress/block-editor';

export default function save() {
	return (
		<aside {...useBlockProps.save()}>
			Hello world from the saved content!
		</aside>
	);
}
