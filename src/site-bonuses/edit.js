import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import './editor.scss';

export default function Edit() {
	const [bonusTypes, setBonusTypes] = useState([]);
	const [selectedBonusType, setSelectedBonusType] = useState('');
	const [bonuses, setBonuses] = useState([]);

	useEffect(() => {
		const fetchBonusTypes = async () => {
			const response = await fetch('/wp-json/wp/v2/bonus_type');
			const data = await response.json();
			setBonusTypes(data);
		};

		fetchBonusTypes();
	}, []);

	useEffect(() => {
		if (selectedBonusType) {
			const fetchBonuses = async () => {
				const response = await fetch(`/wp-json/wp/v2/bonus?bonus_type=${selectedBonusType}`);
				const data = await response.json();
				if (data) {
					setBonuses(data);
				}
			};

			fetchBonuses();
		}
	}, [selectedBonusType]);


	return (
		<aside {...useBlockProps()}>
			<select
				value={selectedBonusType}
				onChange={(e) => setSelectedBonusType(e.target.value)}
			>
				<option value="">Select Bonus Type</option>
				{bonusTypes.map((type) => (
					<option key={type.id} value={type.id}>
						{type.name}
					</option>
				))}
			</select>

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
