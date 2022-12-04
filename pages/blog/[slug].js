import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import Layout from '../../components/layout'
import { postFilePaths, POSTS_PATH } from '../../utils/mdxUtils'

export default function PostPage({ source, frontMatter }) {
  return (
    <Layout>
      <header className="mb-16">
        <h1 className='text-4xl mb-2'>{frontMatter.title}</h1>
        {frontMatter.description && (
          <p className="text-neutral-600 font-sans">{frontMatter.description}</p>
        )}
        {frontMatter.date && (
          <p className="text-neutral-600 font-sans">{frontMatter.date}</p>
        )}
      </header>
      <main>
        <MDXRemote {...source} />
      </main>
    </Layout>
  )
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`)
  const source = fs.readFileSync(postFilePath)

  const { content, data } = matter(source)

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [],
    },
    scope: data,
  })

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  }
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ''))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }))

  return {
    paths,
    fallback: false,
  }
}