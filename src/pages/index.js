import { getAllPublished, getPostsByTag } from '@/lib/notion'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostListIndex from '@/components/PostListIndex'
import styles from '@/styles/Home.module.css'
import Head from 'next/head'

export const getStaticProps = async () => {
	const data = await getAllPublished()
	await getPostsByTag('recommended')

	return {
		props: {
			posts: data,
		},
		revalidate: 60,
	}
}

export default function Home({ posts }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>snax</title>
			</Head>
			<Header />
			<PostListIndex posts={posts} />
			<Footer />
		</div>
	)
}
