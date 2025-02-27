import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import BonusCard from './BonusCard';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { bonusType } = attributes; // Get the bonusType from attributes

	const [bonusTypes, setBonusTypes] = useState([]);
	const [bonuses, setBonuses] = useState([]);

	// Fetch bonus types (e.g., cashback, free spins, etc.)
	useEffect(() => {
		const fetchBonusTypes = async () => {
			const response = await fetch('/wp-json/wp/v2/bonus_type');
			const data = await response.json();
			console.log('Data from fetchBonusTypes: ', data);
			setBonusTypes(data);
		};

		fetchBonusTypes();
	}, []);

	// Fetch bonuses based on the selected bonus type
	useEffect(() => {
		if (bonusType) {
			const fetchEndpoint = async () => {
				const url = `/wp-json/site-bonuses/v1/bonuses?bonus_type=${bonusType}`;
				const response = await fetch(url);
				const data = await response.json();
				if (data) {
					setBonuses(data);
					console.log('Data from fetchEndpoint: ', data);
				}
			}
			fetchEndpoint();
		}
	}, [bonusType])

	return (
		<aside {...useBlockProps()}>

			<SelectControl
				label="Select Bonus Type"
				value={bonusType} // Controlled input (from attributes)
				options={bonusTypes.map(type => ({ value: type.slug, label: type.name }))}
				onChange={(newValue) => setAttributes({ bonusType: newValue })}
			/>

			{bonuses.length > 0 && (
				<ul>
					{bonuses.map((bonus) => (
						<li key={bonus.id}><BonusCard bonus={bonus} /></li>
					))}
				</ul>
			)}
		</aside>
	);
}
