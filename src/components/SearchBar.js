import { useState } from 'react'
import { useRouter } from 'next/router'
import styles from '../styles/SearchBar.module.css'

const SearchBar = ({ centered = false }) => {
	const [searchQuery, setSearchQuery] = useState('')
	const router = useRouter()

	const handleSubmit = (e) => {
		e.preventDefault()
		// skip empty searches
		if (searchQuery.trim() !== '') {
			router.push(`/search?query=${encodeURIComponent(searchQuery)}`)
		}
	}

	return (
		<form
			className={`${styles.searchContainer} ${centered ? styles.centered : ''}`}
			onSubmit={handleSubmit}
			role='search'
		>
			<label htmlFor='snack-search' className={styles.srOnly}>
				Search snacks
			</label>
			<input
				id='snack-search'
				className={styles.searchInput}
				type='search'
				value={searchQuery}
				onChange={(e) => setSearchQuery(e.target.value)}
				placeholder='what are you craving?'
			/>
			<button className={styles.searchButton} type='submit'>
				search
			</button>
		</form>
	)
}

export default SearchBar
