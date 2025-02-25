import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { bonusType } = attributes; // Get the bonusType from attributes
	console.log('bonusType from attribute: ', bonusType);

	const [bonusTypes, setBonusTypes] = useState([]);
	const [bonuses, setBonuses] = useState([]);

	// Fetch bonus types (e.g., cashback, free spins, etc.)
	useEffect(() => {
		const fetchBonusTypes = async () => {
			const response = await fetch('/wp-json/wp/v2/bonus_type');
			const data = await response.json();
			console.log('bonusTypes: ', data);
			setBonusTypes(data);
		};

		fetchBonusTypes();
	}, []); // Empty dependency means it only runs once on mount

	// Fetch bonuses based on the selected bonus type
	useEffect(() => {
		console.log('bonusType: ', bonusType); // Debugging: track selected bonusType
		if (bonusType) {
			const fetchBonuses = async () => {
				const response = await fetch(`/wp-json/wp/v2/bonus?bonus_type=${bonusType}`);
				const data = await response.json();
				if (data) {
					console.log('data: ', data)
					setBonuses(data);
				}
			};
			fetchBonuses();
		}
	}, [bonusType]); // Runs whenever bonusType changes


	useEffect(() => {
		if (bonusType) {
			const fetchFromMyEndpoint = async () => {
				const response = await fetch(`/wp-json/site-bonuses/v1/bonuses`);
				const data = await response.json();
				if (data) {
					console.log('data from fetchFromMyEndpoint: ', data);
				}
			}
			fetchFromMyEndpoint();
		}
	}, [bonusType])

	return (
		<aside {...useBlockProps()}>

			<SelectControl
				label="Select Bonus Type"
				value={bonusType} // Controlled input (from attributes)
				options={bonusTypes.map(type => ({ value: type.id, label: type.name }))}
				onChange={(newValue) => setAttributes({ bonusType: newValue })}
			/>

			{bonuses.length > 0 ? (
				<ul>
					{bonuses.map((bonus) => (
						<li key={bonus.id}>{bonus.title.rendered}</li>
					))}
				</ul>
			) : (
				<p>No bonuses available.</p>
			)}
		</aside>
	);
}
