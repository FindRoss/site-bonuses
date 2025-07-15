import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { ComboboxControl, SearchControl } from '@wordpress/components';
// import BonusCard from './BonusCard';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { bonusSite } = attributes; // Get the bonusType from attributes
	
  const [searchTerm, setSearchTerm] = useState('');
	const [options, setOptions] = useState([]);
	const [selected, setSelected] = useState();


  useEffect(() => {

    if (!searchTerm) {
      setOptions([]);  // clear options if no input
      return;
    }

    console.log('Fetching reviews for:', searchTerm);

		const fetchReviews = async () => {
			const res = await fetch(`/wp-json/wp/v2/review?search=${searchTerm}&_fields=id,title&per_page=10`);
			const data = await res.json();
			const formatted = data.map((post) => ({
				label: post.title.rendered,
				value: post.id,
			}));
			setOptions(formatted);
		};

		const timer = setTimeout(fetchReviews, 300); // debounce

		return () => clearTimeout(timer);
	}, [searchTerm]);


	// useEffect(() => {
	// 	const fetchBonuses = async () => {
	// 		try {
	// 		const siteId = 88521; // replace with dynamic value if needed
	// 		const response = await fetch(`/wp-json/site-bonuses/v1/bonuses?site_id=${siteId}`);
			
	// 		if (!response.ok) {
	// 			throw new Error('Network response was not ok');
	// 		}

	// 		const data = await response.json();
	// 		console.log('Bonuses from site-bonuses endpoint:', data);
	// 		} catch (error) {
	// 		console.error('Error fetching bonuses:', error);
	// 		}
	// 	};

	// 	fetchBonuses();
	// }, []);




	return (
		<aside {...useBlockProps()}>
      hello world from site bonuses edit.js

      <SearchControl
        value={searchTerm}
        onChange={setSearchTerm}
        placeholder="Search for a site or review"
        label="Search for a site or review"
      />

      <ComboboxControl
        label="And then select the site from the dropdown"
        value={selected}
        options={options}
        onChange={setSelected}
      />

			{/* {bonuses.length > 0 && (
				<ul>
					{bonuses.map((bonus) => (
						<li key={bonus.id}><BonusCard bonus={bonus} /></li>
					))}
				</ul>
			)} */}
		</aside>
	);
}