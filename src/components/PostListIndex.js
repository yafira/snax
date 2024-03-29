import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import styles from '../styles/Home.module.css'
import PostItem from './PostItem'

export default function PostListTags({ posts }) {
	if (!posts) return <h1>No snacks available.</h1>

	return (
		<main className={styles.main}>
			<ResponsiveMasonry
				columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3, 1000: 4, 1200: 5 }}
			>
				<Masonry gutter={16}>
					{posts?.map((post, index) => (
						<PostItem
							key={index}
							imgURL={post.image}
							title={post.title}
							rating={post.rating}
							description={post.description}
							tags={post.tags}
						/>
					))}
				</Masonry>
			</ResponsiveMasonry>
		</main>
	)
}
