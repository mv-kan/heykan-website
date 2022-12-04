import fs from 'fs'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import { postFilePaths, POSTS_PATH } from '../utils/mdxUtils'
import Layout from '../components/layout';
import Link from 'next/link';

export default function Home({ source, frontMatter, postsMeta }) {
  return (
    <Layout home> 
      <main>
        <MDXRemote {...source} />
        <div>
          <h2>Blog</h2>
          {
            postsMeta.map(meta => 
              <div className='bg-white rounded p-6 mb-8 drop-shadow-md hover:drop-shadow-2xl hover:bg-neutral-50'>
                <Link href={meta.slug} className='hover:no-underline font-sans'>
                  <div className='text-3xl text-black mb-2'>{meta.title}</div>
                  <div className='text-neutral-600'>{meta.description}</div>
                  <div className='text-neutral-600 text-sm'>{meta.date}</div>
                </Link>
              </div>
              )
          }
        </div>
      </main>
    </Layout>
  )
}

const getPostMeta = async () => {
  const allPostMeta = []
  for (const postFile of postFilePaths) {
    const postFilePath = path.join(POSTS_PATH, postFile)

    if (postFilePath === path.join(POSTS_PATH, `index.mdx`)) {
      continue;
    }
    const source = fs.readFileSync(postFilePath)
  
    const { content, data } = matter(source)
    // link to blog post
    const slug = postFile.replace(/\.mdx?$/, '')
    data['slug'] = path.join('blog', slug)
    allPostMeta.push(data)
  }
  allPostMeta.sort((a,b)=> b.date.localeCompare(a.date))
  return allPostMeta;
}

export const getStaticProps = async ({ params }) => {
  const postFilePath = path.join(POSTS_PATH, `index.mdx`)
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

  const postsMetadata = await getPostMeta()
  return {
    props: {
      source: mdxSource,
      frontMatter: data,
      postsMeta: postsMetadata,
    },
  }
}